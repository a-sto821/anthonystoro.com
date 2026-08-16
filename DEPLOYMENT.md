# Cloudflare Pages deployment

## Phase 1

This branch contains the responsive portfolio build approved for launch. Case study lightboxes are intentionally deferred to Phase 2.

## Cloudflare Pages

The site is deployed from the repository root as static HTML, CSS, and JavaScript. Pages Functions are located in `functions/api/`.

Production branch: `main`.

## Production assets

All launch-critical Figma and legacy WordPress imagery has been copied into the repository so the production website does not depend on temporary Figma asset URLs or the previous WordPress host.

## Contact form environment

The contact form uses Cloudflare Turnstile plus a honeypot, same-origin enforcement, payload limits, submission timing, and server-side field validation. Turnstile is validated server-side before any email is sent.

Because this site remains on Cloudflare Pages, email delivery uses Cloudflare Email Service through its REST API. Configure these production secrets in the Pages project:

- `CLOUDFLARE_ACCOUNT_ID`
- `EMAIL_API_TOKEN`
- `TURNSTILE_SECRET_KEY`

The Turnstile site key is public and lives in the client-side contact protection script. The Turnstile secret must remain only in Cloudflare.

The destination is `anthonystoro@icloud.com` and the sender identity is `website@anthonystoro.com`.

Before testing delivery:

1. Verify `anthonystoro@icloud.com` as a Cloudflare Email Service destination address.
2. Onboard `anthonystoro.com` for Email Sending.
3. Create an API token with Email Sending permission and save it as `EMAIL_API_TOKEN`.
4. Save the Turnstile widget secret as `TURNSTILE_SECRET_KEY`.
5. Redeploy the Pages project after adding the production secrets.
6. Submit a real contact-form message and verify delivery and Reply-To behavior.

## Launch checklist

1. Confirm the production Pages deployment succeeds.
2. Confirm desktop, mobile, and tablet layouts on the custom domain.
3. Confirm `www.anthonystoro.com` permanently redirects to `anthonystoro.com`.
4. Configure and test the contact form.
5. Run final accessibility, performance, and SEO checks.
