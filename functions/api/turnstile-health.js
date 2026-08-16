const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

const json = (body, status = 200) => Response.json(body, {
  status,
  headers: {
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff'
  }
});

export async function onRequestGet({ env }) {
  const secretConfigured = Boolean(env.TURNSTILE_SECRET_KEY);
  if (!secretConfigured) {
    return json({
      secretConfigured: false,
      siteverifyReachable: false,
      siteverifyStatus: null,
      errorCodes: []
    });
  }

  const body = new FormData();
  body.append('secret', env.TURNSTILE_SECRET_KEY);
  body.append('response', 'turnstile-health-check');

  try {
    const response = await fetch(VERIFY_URL, {
      method: 'POST',
      body
    });

    const result = await response.json().catch(() => null);
    return json({
      secretConfigured: true,
      siteverifyReachable: Boolean(result),
      siteverifyStatus: response.status,
      success: result?.success === true,
      errorCodes: Array.isArray(result?.['error-codes']) ? result['error-codes'] : []
    });
  } catch (error) {
    return json({
      secretConfigured: true,
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
