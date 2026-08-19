export async function onRequest(context) {
  const url = new URL(context.request.url);
  const project = url.searchParams.get('project');

  if (url.pathname === '/' && project) {
    return Response.redirect(new URL(`/work/${encodeURIComponent(project)}/`, url.origin), 302);
  }

  return context.next();
}
