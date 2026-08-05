export type ChangelogSystem = "project" | "wordpress" | "mobile" | "firmware" | "api" | "website" | "docs";

export type ChangelogEntry = {
	id: string;
	date: string;
	system: ChangelogSystem;
	version: string;
	title: string;
	summary: string;
	changes: string[];
	link?: {
		label: string;
		href: string;
	};
};

export const changelogSystems: Array<{
	id: ChangelogSystem;
	label: string;
	shortLabel: string;
	marker: string;
}> = [
	{ id: "project", label: "Project milestone", shortLabel: "Milestones", marker: "N" },
	{ id: "wordpress", label: "WordPress plugin", shortLabel: "Plugin", marker: "WP" },
	{ id: "mobile", label: "Mobile app", shortLabel: "Mobile", marker: "APP" },
	{ id: "firmware", label: "Device firmware", shortLabel: "Firmware", marker: "FW" },
	{ id: "api", label: "Notificator API", shortLabel: "API", marker: "API" },
	{ id: "website", label: "Project website", shortLabel: "Website", marker: "WEB" },
	{ id: "docs", label: "Documentation", shortLabel: "Docs", marker: "DOC" },
];

export const changelogEntries: ChangelogEntry[] = [
	{
		id: "firmware-base-1-2-2",
		date: "2026-08-06",
		system: "firmware",
		version: "Base 1.2.2",
		title: "Presence that follows the real device connection",
		summary: "Notificator Base now reports unexpected power and network loss more quickly while keeping its online status fresh.",
		changes: [
			"Registers a retained MQTT Last Will so HiveMQ can report an unplanned disconnect as offline.",
			"Publishes a retained presence heartbeat every 60 seconds with a shorter MQTT keepalive.",
			"Keeps failed publishes from making the last successful heartbeat look newer than it is.",
			"Ships matching signed OTA, factory installer, and stable-channel metadata.",
		],
		link: {
			label: "Open the Base 1.2.2 release",
			href: "https://github.com/notificator-project/IoT-Firmware/releases/tag/base-v1.2.2",
		},
	},
	{
		id: "firmware-touch-0-9-3",
		date: "2026-08-06",
		system: "firmware",
		version: "Touch 0.9.3 Preview",
		title: "Reliable presence and app-wide read state",
		summary: "The Touch preview gains faster offline detection and responds to the app's mark-all-read action.",
		changes: [
			"Handles the authenticated mark-all-read command across the Touch alert history.",
			"Registers a retained offline Last Will and uses tighter MQTT keepalive handling.",
			"Keeps heartbeat timing tied to successful publishes.",
			"Ships through the independently signed Touch preview OTA channel.",
		],
		link: {
			label: "Open the Touch 0.9.3 preview",
			href: "https://github.com/notificator-project/IoT-Firmware/releases/tag/touch-v0.9.3",
		},
	},
	{
		id: "api-device-presence",
		date: "2026-08-06",
		system: "api",
		version: "Presence telemetry",
		title: "Device status now follows authenticated telemetry",
		summary: "The API updates saved device presence from valid online, heartbeat, OTA, and explicit offline reports.",
		changes: [
			"Refreshes the last-seen time when a device reports online or ready.",
			"Marks a device down only after an explicit offline or disconnected report.",
			"Leaves the last known state intact when a temporary broker status request fails.",
			"Supports both Base and Touch model policies without applying Base version rules to preview hardware.",
		],
	},
	{
		id: "firmware-touch-0-9-2",
		date: "2026-08-05",
		system: "firmware",
		version: "Touch 0.9.2 Preview",
		title: "Unread alerts reach the idle clock",
		summary: "The Touch clock now provides a quiet but unmistakable signal when an alert is waiting to be read.",
		changes: [
			"Changes the clock time from white to red while the local alert inbox contains unread notifications.",
			"Returns the time to white automatically after every alert has been read.",
			"Applies the same behaviour to the primary LVGL interface and its safe fallback renderer.",
		],
		link: {
			label: "Open the Touch 0.9.2 preview",
			href: "https://github.com/notificator-project/IoT-Firmware/releases/tag/touch-v0.9.2",
		},
	},
	{
		id: "project-wordpress-directory-acceptance",
		date: "2026-08-04",
		system: "project",
		version: "Public milestone",
		title: "Notificator is accepted into the WordPress plugin directory",
		summary: "The plugin completed directory review and reached its official public distribution milestone.",
		changes: [
			"Completes the naming, external-service disclosure, licensing, and packaging work requested during review.",
			"Makes installation and future updates available through the familiar WordPress plugin workflow.",
			"Keeps the plugin, mobile app, API, documentation, and device firmware part of one free and open-source project.",
		],
		link: { label: "Explore the WordPress plugin", href: "/wordpress-plugin/" },
	},
	{
		id: "mobile-1-3-0",
		date: "2026-08-05",
		system: "mobile",
		version: "1.3.0",
		title: "Model-aware device controls",
		summary: "The mobile app now treats Base and Touch as distinct devices and exposes only the controls each model supports.",
		changes: [
			"Adds Notificator Touch to device creation and editing.",
			"Adds display-brightness control for Base and Touch, plus sound-volume control for Touch.",
			"Adds Touch clock, weather, timezone, location, and preview OTA settings.",
			"Handles declined push permission without creating a mock token or blocking the rest of the app.",
			"Improves errors for rejected HiveMQ credentials and failed live device commands.",
		],
		link: { label: "Explore the mobile app", href: "/mobile-app/" },
	},
	{
		id: "firmware-touch-0-9-1",
		date: "2026-08-05",
		system: "firmware",
		version: "Touch 0.9.1 Preview",
		title: "The first Notificator Touch preview",
		summary: "The Waveshare ESP32-S3 Touch LCD 3.49 becomes a complete preview target with its own interface, setup, and signed update channel.",
		changes: [
			"Introduces an LVGL interface with Home, Alerts, Device, and Settings views.",
			"Adds a digital clock, weather modes, severity-aware alerts, recent history, orientation, audio, and battery status.",
			"Supports on-device Wi-Fi changes, a touchscreen keyboard, brightness, volume, and a phone-based recovery portal.",
			"Ships model-locked preview OTA and a complete browser-installable factory image.",
		],
		link: {
			label: "Open the Touch 0.9.1 preview",
			href: "https://github.com/notificator-project/IoT-Firmware/releases/tag/touch-v0.9.1",
		},
	},
	{
		id: "firmware-base-1-2-1",
		date: "2026-08-05",
		system: "firmware",
		version: "Base 1.2.1",
		title: "Persistent display control and smoother setup",
		summary: "Notificator Base adds remote brightness control and corrects secured-network password entry in its local setup portal.",
		changes: [
			"Stores display brightness on the device and accepts updates from the mobile app.",
			"Keeps the Wi-Fi password field editable when a secured network is selected.",
			"Uses the independent Base release tag and updated two-model installer catalog.",
		],
		link: {
			label: "Open the Base 1.2.1 release",
			href: "https://github.com/notificator-project/IoT-Firmware/releases/tag/base-v1.2.1",
		},
	},
	{
		id: "api-multi-model-device-control",
		date: "2026-08-05",
		system: "api",
		version: "Multi-model OTA",
		title: "Firmware policy now follows the device model",
		summary: "The API routes commands and updates according to each device's capabilities instead of applying Base assumptions to every model.",
		changes: [
			"Keeps firmware 1.2 as the supported baseline for Base without imposing it on new Touch devices.",
			"Selects stable Base and preview Touch firmware independently.",
			"Validates display-brightness and sound-volume commands against model capabilities.",
			"Normalizes legacy and current device IDs while reconciling retained MQTT status.",
		],
	},
	{
		id: "website-multi-model-installer",
		date: "2026-08-05",
		system: "website",
		version: "August 2026",
		title: "One installer for Base and Touch",
		summary: "The browser installer now reads a shared firmware catalog and offers the correct complete image for either supported device.",
		changes: [
			"Adds Notificator Base 1.2.1 as the stable ESP32-C3 choice.",
			"Adds Notificator Touch 0.9.1 as a clearly marked ESP32-S3 preview.",
			"Keeps model descriptions, boards, versions, and release channels visible before connecting USB.",
			"Adds a Get a device guide for compatible commercial hardware, free community batches, and complete maker builds.",
		],
		link: { label: "Open the firmware installer", href: "/firmware-installer/" },
	},
	{
		id: "docs-touch-and-multi-model",
		date: "2026-08-05",
		system: "docs",
		version: "August 2026",
		title: "Touch setup and multi-model updates documented",
		summary:
			"The documentation now covers the complete Touch preview journey alongside Base, from first flash to live controls and OTA recovery.",
		changes: [
			"Adds a dedicated Notificator Touch setup and troubleshooting guide.",
			"Documents model-specific brightness, volume, clock, weather, and OTA behavior.",
			"Explains HiveMQ authorization failures and the separate stable and preview release channels.",
		],
		link: { label: "Read the Touch setup guide", href: "https://docs.notificator-project.com/guides/notificator-touch-setup/" },
	},
	{
		id: "mobile-1-2-3",
		date: "2026-08-01",
		system: "mobile",
		version: "1.2.3",
		title: "Firmware status that follows the device",
		summary: "The app can now reconcile its device record with the retained status reported by Notificator Base firmware.",
		changes: [
			"Refreshes firmware state through the user's own HiveMQ Cloud connection.",
			"Completes OTA progress only after the newly installed firmware reports back.",
			"Reports live synchronization failures instead of silently showing stale device data.",
			"Keeps broker credentials on the device and out of Notificator storage.",
		],
		link: {
			label: "Explore the mobile app",
			href: "/mobile-app/",
		},
	},
	{
		id: "api-retained-status",
		date: "2026-08-01",
		system: "api",
		version: "August 2026",
		title: "On-demand device status reconciliation",
		summary: "The API can securely read one device's retained MQTT status when the mobile app asks for a refresh.",
		changes: [
			"Validates account ownership, topic identity, payload type, and device ID.",
			"Uses HiveMQ credentials only for the lifetime of the request.",
			"Updates the recorded firmware version and closes completed OTA states.",
		],
	},
	{
		id: "firmware-1-2-0",
		date: "2026-08-01",
		system: "firmware",
		version: "1.2.0",
		title: "Reliable OTA completion reporting",
		summary: "Notificator Base now reports the installed firmware version after reboot instead of completing an update too early.",
		changes: [
			"Publishes the authenticated device telemetry format expected by the API.",
			"Keeps OTA in progress during restart and confirms success from the new image.",
			"Establishes firmware 1.2.0 as the supported device baseline.",
		],
		link: {
			label: "Open the 1.2.0 release",
			href: "https://github.com/notificator-project/IoT-Firmware/releases/tag/v1.2.0",
		},
	},
	{
		id: "website-firmware-installer",
		date: "2026-07-31",
		system: "website",
		version: "July 2026",
		title: "Install firmware from the browser",
		summary: "A guided web installer makes first-time device setup and USB recovery much easier.",
		changes: [
			"Adds a firmware selector for compatible ESP32-C3 devices.",
			"Explains the next steps after installation instead of stopping at a success icon.",
			"Links directly to device setup and HiveMQ guidance.",
		],
		link: { label: "Open the firmware installer", href: "/firmware-installer/" },
	},
	{
		id: "api-signed-ota",
		date: "2026-07-31",
		system: "api",
		version: "Signed OTA v2",
		title: "A safer firmware release pipeline",
		summary: "Firmware binaries are now signed in a protected release workflow and verified by the device before installation.",
		changes: [
			"Publishes model-specific releases through a signed manifest.",
			"Keeps the private signing key outside repositories and deployed functions.",
			"Verifies the live manifest and binary before a release is considered complete.",
		],
	},
	{
		id: "firmware-1-1-1",
		date: "2026-07-31",
		system: "firmware",
		version: "1.1.1",
		title: "Cleaner setup portal and release assets",
		summary: "The first public Notificator Base maintenance release polished Wi-Fi setup and automated installable binaries.",
		changes: [
			"Corrects Wi-Fi signal and security icons in the setup portal.",
			"Builds separate browser-installer and OTA assets automatically.",
			"Improves installation completion guidance and accessibility.",
		],
		link: {
			label: "Open the 1.1.1 release",
			href: "https://github.com/notificator-project/IoT-Firmware/releases/tag/v1.1.1",
		},
	},
	{
		id: "wordpress-1-2",
		date: "2026-07-30",
		system: "wordpress",
		version: "1.2",
		title: "Bring your own HiveMQ connection",
		summary: "The WordPress plugin can deliver MQTT notifications through a HiveMQ Cloud account controlled by the site owner.",
		changes: [
			"Adds a dedicated connection setup experience and delivery test.",
			"Encrypts the broker password using keys derived from WordPress salts.",
			"Sends credentials transiently and never stores them in the Notificator API.",
		],
		link: { label: "Open the 1.2 release", href: "https://github.com/notificator-project/WordPress-Plugin/releases/tag/v1.2" },
	},
	{
		id: "website-accessibility",
		date: "2026-07-28",
		system: "website",
		version: "July 2026",
		title: "More accessible, more useful project pages",
		summary: "The website grew into a clearer guide to the full Notificator ecosystem while improving everyday accessibility.",
		changes: [
			"Adds dedicated How it works, Integrations, Devices, and Build a device pages.",
			"Introduces the optional OpenDyslexic reading mode and stronger contrast.",
			"Improves mobile navigation, focus states, forms, and screen-reader structure.",
		],
		link: { label: "See how Notificator works", href: "/how-it-works/" },
	},
	{
		id: "wordpress-1-1-16",
		date: "2026-07-27",
		system: "wordpress",
		version: "1.1.16",
		title: "Safer notification field resolution",
		summary: "Saved notification fields can no longer select or invoke arbitrary runtime object methods.",
		changes: [
			"Uses explicit server-side branches for supported object fields.",
			"Reads ordinary object data only from public properties.",
			"Provides a trusted PHP filter for third-party integrations.",
		],
		link: {
			label: "Open the 1.1.16 release",
			href: "https://github.com/notificator-project/WordPress-Plugin/releases/tag/v1.1.16",
		},
	},
	{
		id: "docs-device-platform",
		date: "2026-07-31",
		system: "docs",
		version: "July 2026",
		title: "Base devices, MQTT, and signed updates explained",
		summary: "The documentation now follows the complete journey from building a device to connecting it and keeping it updated.",
		changes: [
			"Documents the ESP32-C3 Base model and capacitive-touch wiring.",
			"Walks through HiveMQ Cloud configuration without a managed Notificator broker.",
			"Explains browser installation, signed OTA updates, and recovery options.",
		],
		link: { label: "Read the documentation", href: "https://docs.notificator-project.com/" },
	},
	{
		id: "wordpress-discovery",
		date: "2026-07-23",
		system: "wordpress",
		version: "1.1.5–1.1.15",
		title: "Discovery that stays in sync",
		summary:
			"Hook discovery became easier to understand and updates the interface immediately when scans or plugin activations change the results.",
		changes: [
			"Refreshes Overview and Discovery results without requiring a page reload.",
			"Prompts for a new scan when another plugin is activated.",
			"Explains why a scan is recommended and identifies newly activated plugins.",
		],
		link: { label: "Explore the plugin", href: "/wordpress-plugin/" },
	},
	{
		id: "mobile-tester-update",
		date: "2026-07-20",
		system: "mobile",
		version: "Tester update",
		title: "Better device and Android experiences",
		summary: "The tester build refined device management while preparing the application for more Notificator hardware models.",
		changes: [
			"Improves modal behavior and layout on Android devices.",
			"Adds clearer device-type handling and Matter model preparation.",
			"Expands tester release notes inside the application.",
		],
		link: { label: "Explore the mobile app", href: "/mobile-app/" },
	},
	{
		id: "project-early-access",
		date: "2026-02-17",
		system: "project",
		version: "Early Access",
		title: "The first community devices prepare to ship",
		summary: "Notificator entered Early Access with its WordPress plugin, mobile app, and open-source devices ready for real-world testing.",
		changes: [
			"Announced the first free Early Access device batch for community testers.",
			"Opened testing across mobile push, dashboard alerts, and optional MQTT devices.",
			"Used tester feedback to validate performance, integrations, and the path toward an open release.",
		],
		link: { label: "Read the Early Access announcement", href: "/blog/early-access-update/" },
	},
	{
		id: "project-wordcamp-athens-2025",
		date: "2025-12-03",
		system: "project",
		version: "Public introduction",
		title: "Notificator is introduced at WordCamp Athens 2025",
		summary:
			"The complete Notificator idea was shared publicly for the first time: WordPress events, a companion mobile app, cloud services, and physical notification devices.",
		changes: [
			"Demonstrated how WordPress activity can become immediate, glanceable alerts.",
			"Presented early hardware prototypes and the wider open-source ecosystem.",
			"Invited attendees to become early testers and help shape the project through community feedback.",
		],
		link: { label: "Read the WordCamp Athens recap", href: "/blog/wp-notificator-at-wordcamp-athens-2025/" },
	},
].sort((a, b) => b.date.localeCompare(a.date));
