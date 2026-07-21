# Notificator Website

The official website for [Notificator](https://notificator-project.com), an open-source notification ecosystem connecting WordPress events with dashboard alerts, mobile push notifications, MQTT, and compatible Notificator devices.

The site is built with [Astro](https://astro.build/) and includes the main project pages, blog, contact form, and newsletter signup.

## Local development

You will need a current Node.js LTS release and npm.

```bash
npm install
npm run dev
```

The development server is available on the local URL printed in the terminal. It listens on the local network as well, which is useful for testing the responsive layout on another device.

## Available commands

| Command           | Purpose                                          |
| ----------------- | ------------------------------------------------ |
| `npm run dev`     | Start the development server with network access |
| `npm start`       | Start the standard Astro development server      |
| `npm run build`   | Create the production site in `dist/`            |
| `npm run preview` | Preview the production build locally             |

Run `npm run build` before opening a pull request to confirm that every page and optimized image can be generated successfully.

## Project structure

```text
public/                 Static icons, favicons, and metadata assets
src/assets/images/      Images processed by Astro
src/components/         Landing, blog, form, and global UI components
src/content/posts/en/   Blog posts written in MDX
src/layouts/            Shared page and article layouts
src/pages/              Astro routes
src/styles/             Global styles and design tokens
```

## Publishing a blog post

Add an `.mdx` file to `src/content/posts/en/`. Each post must include the fields defined in `src/content/config.ts`: publication date, author, title, description, image, alt text, and tags.

Posts are ordered by publication date, with the newest article displayed first and used as the featured story on the blog page.

## Forms and deployment

The contact and newsletter forms use Netlify Forms. The project builds as a static Astro site, with the deployable output generated in `dist/`.

## Contributing

Bug reports and focused improvements are welcome through [GitHub Issues](https://github.com/notificator-project/website/issues).

## License

This repository is released under [The Unlicense](LICENSE).
