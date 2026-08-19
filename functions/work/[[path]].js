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

export async function onRequest({ request }) {
  const url = new URL(request.url);
  const rest = url.pathname.replace(/^\/work\/?/, '');
  const slug = rest.split('/').filter(Boolean)[0] || '';

  if (!VALID_PROJECTS.has(slug)) {
    return Response.redirect(new URL('/#work', url.origin), 302);
  }

  const destination = new URL('/', url.origin);
  destination.searchParams.set('project', slug);
  return Response.redirect(destination, 302);
}
