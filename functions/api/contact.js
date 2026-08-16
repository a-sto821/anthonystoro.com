const CONTACT_TO = 'anthonystoro@icloud.com';
const CONTACT_FROM = 'website@anthonystoro.com';

const json = (body, status = 200) => Response.json(body, {
  status,
  headers: {
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'strict-origin-when-cross-origin'
  }
});

const clean = (value, max) => String(value || '')
  .trim()
  .replace(/\r\n/g, '\n')
  .slice(0, max);

const validEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (char) => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  "'": '&#39;',
  '"': '&quot;'
}[char]));

const isSameOrigin = (request) => {
  const origin = request.headers.get('Origin');
  if (!origin) return true;
  try {
    return origin === new URL(request.url).origin;
  } catch (_) {
    return false;
  }
};

export async function onRequestPost(context) {
  const { request, env } = context;

  if (!isSameOrigin(request)) {
    return json({ error: 'Invalid request origin.' }, 403);
  }

  const contentLength = Number(request.headers.get('Content-Length') || 0);
  if (contentLength > 20_000) {
    return json({ error: 'Request too large.' }, 413);
  }

  let form;
  try {
    form = await request.formData();
  } catch (_) {
    return json({ error: 'Invalid form submission.' }, 400);
  }

  if (clean(form.get('website'), 200)) {
    return json({ ok: true });
  }

  const name = clean(form.get('name'), 100);
  const email = clean(form.get('email'), 254).toLowerCase();
  const message = clean(form.get('message'), 5000);

  if (name.length < 2) {
    return json({ error: 'Please enter your full name.' }, 400);
  }
  if (!validEmail(email)) {
    return json({ error: 'Please enter a valid email address.' }, 400);
  }
  if (message.length < 10) {
    return json({ error: 'Please enter a little more detail in your message.' }, 400);
  }

  if (!env.CLOUDFLARE_ACCOUNT_ID || !env.EMAIL_API_TOKEN) {
    console.error('Contact email credentials are not configured.');
    return json({ error: 'Email delivery is not configured yet.' }, 503);
  }

  const submittedAt = new Date().toISOString();
  const subject = `Portfolio contact from ${name}`;
  const text = [
    'New message from anthonystoro.com',
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    `Submitted: ${submittedAt}`,
    '',
    message
  ].join('\n');
  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#151515;max-width:640px">
      <h2 style="margin:0 0 20px">New portfolio website message</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}<br>
      <strong>Email:</strong> ${escapeHtml(email)}<br>
      <strong>Submitted:</strong> ${escapeHtml(submittedAt)}</p>
      <div style="margin-top:24px;padding:20px;border-radius:12px;background:#f5f6f7">${escapeHtml(message).replace(/\n/g, '<br>')}</div>
      <p style="margin-top:24px;color:#666;font-size:13px">Reply to this email to respond directly to ${escapeHtml(name)}.</p>
    </div>`;

  try {
    const emailResponse = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${env.CLOUDFLARE_ACCOUNT_ID}/email/sending/send`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${env.EMAIL_API_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          to: CONTACT_TO,
          from: CONTACT_FROM,
          subject,
          text,
          html,
          reply_to: email
        })
      }
    );

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
  if (context.request.method !== 'POST') {
    return json({ error: 'Method not allowed.' }, 405);
  }
  return onRequestPost(context);
}
