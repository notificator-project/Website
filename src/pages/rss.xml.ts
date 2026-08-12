import { getCollection } from "astro:content";

export const prerender = true;

const SITE_ORIGIN = "https://notificator-project.com";
const FEED_URL = `${SITE_ORIGIN}/rss.xml`;

/**
 * Escape text before inserting it into XML element content.
 */
const escapeXml = (value: unknown) =>
	String(value ?? "")
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;")
		.replaceAll("'", "&apos;");

/**
 * Publish the English Journal as a standard RSS 2.0 feed. The mobile app keeps
 * using the smaller versioned JSON endpoint, while feed readers use this route.
 */
export async function GET() {
	const entries = (await getCollection("posts"))
		.filter((entry) => entry.slug.startsWith("en/"))
		.sort((left, right) => right.data.pubDate.getTime() - left.data.pubDate.getTime());

	const items = entries
		.map((entry) => {
			const slug = entry.slug.replace(/^en\//, "");
			const link = `${SITE_ORIGIN}/blog/${slug}/`;
			const categories = entry.data.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join("");

			return [
				"<item>",
				`<title>${escapeXml(entry.data.title)}</title>`,
				`<description>${escapeXml(entry.data.description)}</description>`,
				`<link>${escapeXml(link)}</link>`,
				`<guid isPermaLink="true">${escapeXml(link)}</guid>`,
				`<pubDate>${entry.data.pubDate.toUTCString()}</pubDate>`,
				`<author>${escapeXml(entry.data.author.name)}</author>`,
				categories,
				"</item>",
			].join("");
		})
		.join("");

	const latestDate = entries[0]?.data.pubDate || new Date();
	const xml = [
		'<?xml version="1.0" encoding="UTF-8"?>',
		'<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
		"<channel>",
		"<title>Notificator Journal</title>",
		"<description>Release notes, integration updates, and practical ideas from the open-source Notificator project.</description>",
		`<link>${SITE_ORIGIN}/blog/</link>`,
		`<atom:link href="${FEED_URL}" rel="self" type="application/rss+xml" />`,
		"<language>en</language>",
		`<lastBuildDate>${latestDate.toUTCString()}</lastBuildDate>`,
		items,
		"</channel>",
		"</rss>",
	].join("");

	return new Response(xml, {
		headers: {
			"Content-Type": "application/rss+xml; charset=utf-8",
		},
	});
}
