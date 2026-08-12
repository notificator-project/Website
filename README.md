# Notificator Website

The public website for [Notificator](https://notificator-project.com), a free and open-source notification ecosystem that turns meaningful WordPress and Strapi events into local activity, mobile push notifications, optional email alerts, MQTT messages, and notifications on compatible physical devices.

The site presents the complete Notificator ecosystem, publishes project updates, provides support and privacy information, and documents the open-source tools and creative work used to build it.

## Website sections

- [How it works](https://notificator-project.com/how-it-works/) explains the platform-neutral path from a website event to local or connected delivery.
- [Integrations](https://notificator-project.com/integrations/) compares the available event sources and their shared delivery model.
- [WordPress Plugin](https://notificator-project.com/wordpress/) introduces the stable hook-discovery, template, local-alert, export, and delivery workflow.
- [Strapi Extension](https://notificator-project.com/strapi/) introduces the Strapi 5 lifecycle-rule preview, local activity, admin toasts, and optional connected delivery.
- [Mobile app](https://notificator-project.com/mobile-app/) explains accounts, connected sites, push and optional email delivery, searchable weather locations, secure MQTT connection testing, model-aware device controls, and firmware status.
- [Devices](https://notificator-project.com/devices/) covers Notificator Base, the Touch 3.49 preview, MQTT, open-source firmware, community builds, and enclosure attribution.
- [Get a device](https://notificator-project.com/get-a-device/) compares supported ready-made hardware, free community batches, and the complete maker route without implying that the project sells devices.
- [Build a device](https://notificator-project.com/build-a-device/) explains the ESP32-C3 electronics, OLED and touch hardware, wiring, the Bambu Lab A1 mini and AMS lite printing setup, beginner-friendly 3D printing, assembly, firmware, materials, licensing, the planned MakerWorld collection, and the project’s WordCamp Athens 2025 presentation.
- [Firmware installer](https://notificator-project.com/firmware-installer/) loads the official multi-model catalog and installs the matching Base or Touch factory image over USB using ESP Web Tools.
- [Changelog](https://notificator-project.com/changelog/) brings meaningful releases from the WordPress Plugin, Strapi Extension, mobile app, firmware, API, website, and documentation into one filterable timeline.
- [Blog](https://notificator-project.com/blog/) contains release notes, development updates, and project stories.
- [Support](https://notificator-project.com/support/) provides troubleshooting for integrations, apps, accounts, and devices.
- [Privacy](https://notificator-project.com/privacy/) describes how data is handled across the project.
- [Credits](https://notificator-project.com/credits/) acknowledges the libraries, fonts, services, tools, and creative work used by the site.

## Technology

The website is a statically generated [Astro](https://astro.build/) project. Its direct dependencies include:

- Astro, Astro MDX, and Astro Sitemap
- AstroLib SEO
- ESP Web Tools for browser-based firmware installation
- Sharp for build-time image processing
- OpenDyslexic through Fontsource
- Netlify CLI for local Netlify workflows
- Prettier and the Astro Prettier plugin

The complete dependency versions are maintained in [`package.json`](package.json) and `package-lock.json`. Direct project credits and licenses are also presented on the public [Credits page](https://notificator-project.com/credits/).

## Local development

Use a current Node.js LTS release and npm.

```bash
npm ci
npm run dev
```

The development server prints its local and network URLs in the terminal. The network URL is useful for checking the responsive layout on a physical phone or tablet.

If the lockfile is intentionally being updated, use `npm install` and commit the resulting `package-lock.json` changes together with `package.json`.

## Available commands

| Command           | Purpose                                          |
| ----------------- | ------------------------------------------------ |
| `npm run dev`     | Start the development server with network access |
| `npm start`       | Start the standard Astro development server      |
| `npm run build`   | Generate the production site in `dist/`          |
| `npm run preview` | Preview the generated production site            |

Run `npm run build` before opening a pull request. The build validates every static route and generates optimized images and the XML sitemap.

## Project structure

```text
public/                 Static icons, favicons, robots.txt, and llms.txt
src/assets/images/      Images processed and optimized by Astro
src/components/         Landing, blog, form, and shared UI components
src/content/posts/en/   English blog posts written in MDX
src/data/               Structured changelog and other reusable site data
src/layouts/            Shared page and article layouts
src/pages/              File-based website routes
src/styles/             Global styles and design tokens
```

## Publishing a blog post

Add an `.mdx` file to `src/content/posts/en/`. Each post must include the fields defined in `src/content/config.ts`:

- Publication date
- Author
- Title and description
- Featured image and alternative text
- Tags

Posts are ordered by publication date. The newest post becomes the featured story on the blog page.

The same collection generates the versioned public JSON feed at
[`/api/v1/journal.json`](https://notificator-project.com/api/v1/journal.json).
The Notificator mobile app consumes this feed for its News screen and home-page
project updates, so publishing the website also updates the app's content source.

Blog comments are provided by [giscus](https://giscus.app/) and stored in GitHub Discussions. The integration is configured in `src/components/blog/Comments.astro`.

## Forms and Netlify

The contact and newsletter forms use [Netlify Forms](https://docs.netlify.com/manage/forms/setup/). Their client-side enhancement submits without reloading the page and displays an accessible success or error message.

The production site is generated in `dist/` and deployed through Netlify. Local Astro development can render and validate the forms, but Netlify processes actual submissions after deployment.

## Accessibility

Accessibility is treated as part of the site rather than an optional extra. Current considerations include:

- Semantic landmarks and heading structure
- A keyboard-accessible skip link and visible focus states
- Responsive layouts for phones, tablets, and desktop screens
- Reduced-motion support
- Descriptive image alternative text
- Status regions for form responses
- An optional OpenDyslexic font control that stores its preference on the visitor's device

Accessibility improvements and reports are welcome through the project issue tracker.

## Search and machine-readable information

The production build includes:

- Per-page canonical, Open Graph, and social metadata
- An automatically generated XML sitemap
- `robots.txt`
- `llms.txt` with important project pages and resources
- A versioned JSON Journal feed for the mobile app

## Independence

Notificator is an independent open-source project. It is not affiliated with, endorsed by, or sponsored by WordPress.org, the WordPress Foundation, Automattic, Strapi Solutions SAS, Waveshare, or HiveMQ. Product and service references describe compatibility, community participation, supported hardware, or user-owned infrastructure; their names, trademarks, services, and terms remain their own.

## Contributing

Bug reports and focused improvements are welcome through [GitHub Issues](https://github.com/notificator-project/website/issues).

Please keep changes focused, preserve the existing visual and accessibility patterns, and confirm that `npm run build` succeeds before submitting a pull request.

## License

This repository is released under [The Unlicense](LICENSE).

Third-party software, fonts, services, trademarks, and creative assets retain their original licenses and ownership. See the [Credits page](https://notificator-project.com/credits/) for acknowledgements and attribution.
