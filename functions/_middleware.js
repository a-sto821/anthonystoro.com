import notFoundHtml from '../404.html';

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const project = url.searchParams.get('project');

  if (url.pathname === '/' && project) {
    return Response.redirect(new URL(`/work/${encodeURIComponent(project)}/`, url.origin), 302);
  }

  const path = url.pathname;
  const isKnownRoute =
    path === '/' ||
    path === '/404' ||
    path === '/404.html' ||
    path.startsWith('/work/') ||
    path.startsWith('/api/') ||
    path.startsWith('/assets/') ||
    path.startsWith('/css/') ||
    path.startsWith('/js/') ||
    /\.[a-z0-9]+$/i.test(path);

  if (!isKnownRoute) {
    return new Response(notFoundHtml, {
      status: 404,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-cache'
      }
    });
  }

  return context.next();
}
