# Cloudflare Pages deployment

## Phase 1

This branch contains the responsive portfolio build approved in Figma. Case study lightboxes are intentionally deferred to Phase 2.

## Cloudflare Pages

Connect this repository to Cloudflare Pages and use the repository root as the site output. No build command is required for the static HTML, CSS, and JavaScript.

Pages Functions are located in `functions/api/`.

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

The form uses Cloudflare Turnstile, a hidden honeypot, server-side field validation, and Cloudflare Email Service.

## Before DNS cutover

1. Replace the temporary About image treatment with the approved portrait asset.
2. Localize the Brand + Print images that still load from the current WordPress site.
3. Test desktop and mobile layouts on the Cloudflare preview URL.
4. Test all category tabs, YouTube links, navigation, Turnstile, and email delivery.
5. Run final accessibility, performance, and SEO checks.
6. Only after approval, point `anthonystoro.com` to the new Cloudflare deployment.
