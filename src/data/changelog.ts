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
		id: "mobile-1-2-2",
		date: "2026-08-01",
		system: "mobile",
		version: "1.2.2",
		title: "Firmware status that follows the device",
		summary: "The app can now reconcile its device record with the retained status reported by Notificator Base firmware.",
		changes: [
			"Refreshes firmware state through the user's own HiveMQ Cloud connection.",
			"Completes OTA progress only after the newly installed firmware reports back.",
			"Keeps broker credentials on the device and out of Notificator storage.",
		],
		link: {
			label: "View the mobile source",
			href: "https://github.com/notificator-project/mobile-app/commit/a543b9567951fd0ad86c976645f31a3cfe841b1e",
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
		link: {
			label: "Inspect the API update",
			href: "https://github.com/notificator-project/wpnotif-api/commit/e11d68834c0b3a72f33c5450cbe74a84f4fcabe2",
		},
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
		link: { label: "Explore the API repository", href: "https://github.com/notificator-project/wpnotif-api" },
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
];
