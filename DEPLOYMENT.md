# Cloudflare Pages deployment

## Phase 1

This branch contains the responsive portfolio build approved for launch. Case study lightboxes are intentionally deferred to Phase 2.

## Cloudflare Pages

The site is deployed from the repository root as static HTML, CSS, and JavaScript. Pages Functions are located in `functions/api/`.

Production branch: `main`.

## Production assets

All launch-critical Figma and legacy WordPress imagery has been copied into the repository so the production website does not depend on temporary Figma asset URLs or the previous WordPress host.

## Contact form environment

The contact form intentionally avoids client-side CAPTCHA. It uses a honeypot, same-origin enforcement, payload limits, and server-side field validation.

Because this site remains on Cloudflare Pages, email delivery uses Cloudflare Email Service through its REST API. Configure only these two production secrets in the Pages project:

- `CLOUDFLARE_ACCOUNT_ID`
- `EMAIL_API_TOKEN`

The destination is `anthonystoro@icloud.com` and the sender identity is `website@anthonystoro.com`.

Before testing delivery:

1. Verify `anthonystoro@icloud.com` as a Cloudflare Email Service destination address.
2. Onboard `anthonystoro.com` for Email Sending.
3. Create an API token with Email Sending permission and save it as `EMAIL_API_TOKEN`.
4. Redeploy the Pages project after adding the production secrets.
5. Submit a real contact-form message and verify delivery and Reply-To behavior.

## Launch checklist

1. Confirm the production Pages deployment succeeds.
2. Confirm desktop, mobile, and tablet layouts on the custom domain.
3. Confirm `www.anthonystoro.com` permanently redirects to `anthonystoro.com`.
4. Configure and test the contact form.
5. Run final accessibility, performance, and SEO checks.
