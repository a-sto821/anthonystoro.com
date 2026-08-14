export async function onRequestGet(context) {
  return Response.json({ turnstileSiteKey: context.env.TURNSTILE_SITE_KEY || '' }, {
    headers: { 'Cache-Control': 'no-store' }
  });
}
