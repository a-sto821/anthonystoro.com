import caseStudyHtml from '../../case-study.html';

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

  // Import and return the case-study document directly as a Pages text module.
  // This bypasses static-asset HTML rewriting while preserving /work/<slug>/.
  return new Response(caseStudyHtml, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-cache'
    }
  });
}
