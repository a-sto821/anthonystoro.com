const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const PUBLIC_SITE_KEY = '0x4AAAAAAERpH3QYkdVUXR6N';

const json = (body, status = 200) => Response.json(body, {
  status,
  headers: {
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff'
  }
});

export async function onRequestGet({ env }) {
  const rawSecret = String(env.TURNSTILE_SECRET_KEY || '');
  const secretConfigured = Boolean(rawSecret);
  const secretLength = rawSecret.length;
  const matchesPublicSiteKey = rawSecret === PUBLIC_SITE_KEY;
  const hasOuterWhitespace = rawSecret !== rawSecret.trim();
  const hasWrappingQuotes =
    (rawSecret.startsWith('"') && rawSecret.endsWith('"')) ||
    (rawSecret.startsWith("'") && rawSecret.endsWith("'"));

  if (!secretConfigured) {
    return json({
      secretConfigured: false,
      secretLength: 0,
      matchesPublicSiteKey: false,
      hasOuterWhitespace: false,
      hasWrappingQuotes: false,
      siteverifyReachable: false,
      siteverifyStatus: null,
      errorCodes: []
    });
  }

  const body = new FormData();
  body.append('secret', rawSecret);
  body.append('response', 'turnstile-health-check');

  try {
    const response = await fetch(VERIFY_URL, {
      method: 'POST',
      body
    });

    const result = await response.json().catch(() => null);
    return json({
      secretConfigured: true,
      secretLength,
      matchesPublicSiteKey,
      hasOuterWhitespace,
      hasWrappingQuotes,
      siteverifyReachable: Boolean(result),
      siteverifyStatus: response.status,
      success: result?.success === true,
      errorCodes: Array.isArray(result?.['error-codes']) ? result['error-codes'] : []
    });
  } catch (error) {
    return json({
      secretConfigured: true,
      secretLength,
      matchesPublicSiteKey,
      hasOuterWhitespace,
      hasWrappingQuotes,
      siteverifyReachable: false,
      siteverifyStatus: null,
      errorCodes: ['fetch-failed']
    });
  }
}

export function onRequest(context) {
  if (context.request.method !== 'GET') {
    return json({ error: 'Method not allowed.' }, 405);
  }
  return onRequestGet(context);
}
