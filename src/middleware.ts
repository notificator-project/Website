// src/middleware.ts
import type { MiddlewareHandler } from 'astro';

export const onRequest: MiddlewareHandler = ({ request, redirect, url }, next) => {
	const path = url.pathname;
	const excludedPaths = ['/work', '/projects', '/portfolio', '/el', '/author', '/terms'];
	if (excludedPaths.some((excludedPath) => path.startsWith(excludedPath))) {
		// Choose one of these behaviors:
		// return new Response('Gone for now', { status: 410 });
		return redirect('/', 302);
	}
	return next();
};