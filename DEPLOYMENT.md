# Cloudflare Pages deployment

## Phase 1

This branch contains the responsive portfolio build approved for launch. Case study lightboxes are intentionally deferred to Phase 2.

## Cloudflare Pages

The site is deployed from the repository root as static HTML, CSS, and JavaScript. Pages Functions are located in `functions/api/`.

## Production assets

All launch-critical Figma and legacy WordPress imagery has been copied into the repository so the production website does not depend on temporary Figma asset URLs or the previous WordPress host.

## Environment variables

Configure these variables in the Cloudflare Pages project before testing the contact form:

- `TURNSTILE_SITE_KEY`
- `TURNSTILE_SECRET_KEY`
- `CLOUDFLARE_ACCOUNT_ID`
- `EMAIL_API_TOKEN`
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL`

The Turnstile secret, Email API token, and account ID must be stored as secrets and must never be committed to GitHub.

## Contact form

The form uses Cloudflare Turnstile, a hidden honeypot, server-side field validation, and email delivery. Email delivery and Turnstile still require production environment configuration and an end-to-end test.

## Launch checklist

1. Confirm the final Cloudflare Pages deployment succeeds.
2. Confirm desktop, mobile, and tablet layouts on the Pages URL.
3. Merge the approved build into `main`.
4. Attach `anthonystoro.com` and `www.anthonystoro.com` to the Cloudflare Pages project and verify HTTPS.
5. Configure and test the contact form environment variables.
6. Run final accessibility, performance, and SEO checks after the custom domain is live.
