import { getCollection } from "astro:content";

export const prerender = true;

const SITE_ORIGIN = "https://notificator-project.com";

/**
 * Publish a small, stable representation of the English Journal collection for
 * first-party clients. The schema version allows fields to evolve without
 * silently breaking older mobile app builds.
 */
export async function GET() {
	const entries = await getCollection("posts");
	const posts = entries
		.filter((entry) => entry.slug.startsWith("en/"))
		.sort((left, right) => right.data.pubDate.getTime() - left.data.pubDate.getTime())
		.map((entry) => {
			const slug = entry.slug.replace(/^en\//, "");

			return {
				id: slug,
				title: entry.data.title,
				excerpt: entry.data.description,
				link_url: `${SITE_ORIGIN}/blog/${slug}/`,
				published_at: entry.data.pubDate.toISOString(),
			};
		});

	return new Response(
		JSON.stringify(
			{
				schema_version: 1,
				generated_at: new Date().toISOString(),
				posts,
			},
			null,
			2,
		),
		{
			headers: {
				"Content-Type": "application/json; charset=utf-8",
			},
		},
	);
}
