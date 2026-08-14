const json = (body, status = 200) => Response.json(body, {
  status,
  headers: { 'Cache-Control': 'no-store' }
});

const clean = (value, max) => String(value || '').trim().replace(/\r\n/g, '\n').slice(0, max);
const validEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const escapeHtml = (value) => value.replace(/[&<>'"]/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
}[char]));

export async function onRequestPost(context) {
  const { request, env } = context;
  let form;
  try { form = await request.formData(); }
  catch (_) { return json({ error: 'Invalid form submission.' }, 400); }

  if (clean(form.get('website'), 200)) return json({ ok: true });

  const name = clean(form.get('name'), 100);
  const email = clean(form.get('email'), 254).toLowerCase();
  const message = clean(form.get('message'), 5000);
  const token = clean(form.get('cf-turnstile-response'), 2048);

  if (name.length < 2) return json({ error: 'Please enter your full name.' }, 400);
  if (!validEmail(email)) return json({ error: 'Please enter a valid email address.' }, 400);
  if (message.length < 10) return json({ error: 'Please enter a little more detail in your message.' }, 400);
  if (!token || !env.TURNSTILE_SECRET_KEY) return json({ error: 'Spam protection could not be verified. Please try again.' }, 400);

  const verifyBody = new URLSearchParams({ secret: env.TURNSTILE_SECRET_KEY, response: token });
  const ip = request.headers.get('CF-Connecting-IP');
  if (ip) verifyBody.set('remoteip', ip);

  let verification;
  try {
    const verifyResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: verifyBody
    });
    verification = await verifyResponse.json();
  } catch (_) {
    return json({ error: 'Spam protection is temporarily unavailable. Please try again.' }, 503);
  }

  if (!verification.success || (verification.action && verification.action !== 'contact')) {
    return json({ error: 'Spam protection could not be verified. Please refresh and try again.' }, 400);
  }

  const required = ['CLOUDFLARE_ACCOUNT_ID', 'EMAIL_API_TOKEN', 'CONTACT_TO_EMAIL', 'CONTACT_FROM_EMAIL'];
  if (required.some((key) => !env[key])) {
    console.error('Contact email environment is incomplete.');
    return json({ error: 'Email delivery is not configured yet.' }, 503);
  }

  const subject = `Portfolio contact from ${name}`;
  const text = `Name: ${name}\nEmail: ${email}\n\n${message}`;
  const html = `<p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><hr><p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>`;

  try {
    const emailResponse = await fetch(`https://api.cloudflare.com/client/v4/accounts/${env.CLOUDFLARE_ACCOUNT_ID}/email/sending/send`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${env.EMAIL_API_TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: env.CONTACT_TO_EMAIL,
        from: env.CONTACT_FROM_EMAIL,
        subject,
        text,
        html,
        headers: { 'Reply-To': email }
      })
    });
    const delivery = await emailResponse.json().catch(() => ({}));
    if (!emailResponse.ok || delivery.success === false) {
      console.error('Cloudflare Email Service error', delivery);
      return json({ error: 'Your message could not be delivered. Please try again.' }, 502);
    }
  } catch (error) {
    console.error('Email delivery exception', error);
    return json({ error: 'Your message could not be delivered. Please try again.' }, 502);
  }

  return json({ ok: true });
}

export function onRequest(context) {
  if (context.request.method !== 'POST') return json({ error: 'Method not allowed.' }, 405);
  return onRequestPost(context);
}
