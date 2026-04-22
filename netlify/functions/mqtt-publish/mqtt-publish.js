// Classic Netlify Function (CommonJS). Node 18+.
// Publishes to HiveMQ Cloud over secure WebSockets (wss:8884).
// Requires env vars: HIVEMQ_HOST, HIVEMQ_PORT=8884, HIVEMQ_WSS_PATH=/mqtt,
// HIVEMQ_USERNAME, HIVEMQ_PASSWORD, WPN_HMAC_SECRET

const crypto = require("crypto");
const mqtt = require("mqtt");

function json(statusCode, obj) {
  return {
    statusCode,
    headers: { "content-type": "application/json" },
    body: JSON.stringify(obj),
  };
}

function verifyHmac(bodyRaw, headerSig, headerTs, secret) {
  if (!headerSig || !headerTs) return false;
  const now = Math.floor(Date.now() / 1000);
  const tsNum = parseInt(headerTs, 10);
  if (!tsNum || Math.abs(now - tsNum) > 300) return false; // 5 min window

  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(`${headerTs}.${bodyRaw}`);
  const digest = `sha256=${hmac.digest("hex")}`;

  // constant-time compare
  const a = Buffer.from(digest, "utf8");
  const b = Buffer.from(headerSig, "utf8");
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return json(405, { ok: false, error: "Method not allowed" });
    }

    const secret = process.env.WPN_HMAC_SECRET || "";
    if (!secret)
      return json(500, { ok: false, error: "Server missing HMAC secret" });

    const sig =
      event.headers["x-wpn-signature"] || event.headers["X-Wpn-Signature"];
    const ts =
      event.headers["x-wpn-timestamp"] || event.headers["X-Wpn-Timestamp"];
    const bodyRaw = event.body || "";

    if (!verifyHmac(bodyRaw, sig, ts, secret)) {
      return json(401, { ok: false, error: "Invalid signature" });
    }

    let data;
    try {
      data = JSON.parse(bodyRaw);
    } catch (e) {
      return json(400, { ok: false, error: "Invalid JSON" });
    }

    let topic = (data.topic || "").trim();
    let payload =
      typeof data.payload === "string"
        ? data.payload
        : JSON.stringify(data.payload || {});
    const qos = Number.isInteger(data.qos)
      ? Math.max(0, Math.min(2, data.qos))
      : 0;
    const retain = !!data.retain;

    if (!topic || topic.includes("#") || topic.includes("+")) {
      return json(400, { ok: false, error: "Invalid topic" });
    }

    const host = process.env.HIVEMQ_HOST;
    const port = parseInt(process.env.HIVEMQ_PORT || "8884", 10);
    const path = process.env.HIVEMQ_WSS_PATH || "/mqtt";
    const username = process.env.HIVEMQ_USERNAME;
    const password = process.env.HIVEMQ_PASSWORD;

    if (!host || !username || !password) {
      return json(500, { ok: false, error: "Missing HiveMQ env vars" });
    }

    // Connect over secure WebSockets
    const url = `wss://${host}:${port}${path}`;
    const client = mqtt.connect(url, {
      username,
      password,
      protocol: "wss",
      protocolVersion: 4, // MQTT 3.1.1
      clean: true,
      connectTimeout: 8000,
      reconnectPeriod: 0,
      rejectUnauthorized: true,
    });

    // Await connect
    await new Promise((resolve, reject) => {
      const onErr = (err) => {
        client.removeListener("connect", onConn);
        reject(err);
      };
      const onConn = () => {
        client.removeListener("error", onErr);
        resolve();
      };
      client.once("error", onErr);
      client.once("connect", onConn);
    });

    // Publish
    await new Promise((resolve, reject) => {
      client.publish(topic, payload, { qos, retain }, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });

    // Close
    await new Promise((resolve) => client.end(true, {}, resolve));

    return json(200, { ok: true, topic, qos, retain });
  } catch (err) {
    // Log the error for Netlify function logs
    console.error("Publish error:", err);
    return json(502, {
      ok: false,
      error: String(err && err.message ? err.message : err),
    });
  }
};
