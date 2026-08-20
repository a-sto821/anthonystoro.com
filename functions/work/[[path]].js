const VALID_PROJECTS = new Set([
  'logo-brand-identity',
  'carlingtech',
  'fuse-holder-selector',
  'v-series-selector',
  'transportation-products-catalog',
  'conexpo-trade-show',
  'sp-campbell',
  'carling-china-capabilities',
  'fuse-holder-product-overview',
  'window-switch-product-overview',
  'cole-hersee-100-year',
  'carling-100-year-history-booklet',
  'arbor-meadows',
  'little-stuess-book'
]);

export async function onRequest({ request, env }) {
  const url = new URL(request.url);
  const rest = url.pathname.replace(/^\/work\/?/, '');
  const slug = rest.split('/').filter(Boolean)[0] || '';

  if (!VALID_PROJECTS.has(slug)) {
    return Response.redirect(new URL('/#work', url.origin), 302);
  }

  // Fetch a non-HTML static asset so Pages cannot apply its HTML routing/
  // pretty-URL fallback. Return those exact bytes as the case-study document
  // while keeping the clean /work/<slug>/ address in the browser.
  const asset = await env.ASSETS.fetch(new URL('/case-study-shell.txt', url.origin));
  if (!asset.ok) return new Response('Case study unavailable', { status: 503 });

  const headers = new Headers(asset.headers);
  headers.set('Content-Type', 'text/html; charset=utf-8');
  headers.set('Cache-Control', 'no-cache');
  return new Response(asset.body, {
    status: 200,
    statusText: 'OK',
    headers
  });
}
