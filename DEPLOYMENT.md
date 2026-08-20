# Cloudflare Pages deployment

## Production status

AnthonyStoro.com is live on Cloudflare Pages.

- Production URL: https://anthonystoro.com
- Production branch: `main`
- Repository: `a-sto821/anthonystoro.com`
- Full project closeout: [`docs/WEBSITE-REDESIGN-CLOSEOUT.md`](docs/WEBSITE-REDESIGN-CLOSEOUT.md)

Cloudflare automatically deploys production after merges to `main`.

## Application structure

The site is static HTML/CSS/JavaScript with Cloudflare Pages Functions for server-side behavior and routing.

Important Functions:

- `functions/api/contact.js` — secure contact-form endpoint and Cloudflare Email Service delivery.
- `functions/work/[[path]].js` — validates case-study slugs and serves the shared case-study document at clean `/work/<slug>/` URLs.
- `functions/_middleware.js` — redirects legacy `/?project=<slug>` URLs and returns the designed 404 document for unknown clean routes.
- `functions/[[path]].js` — explicitly handles favicon requests, including `/favicon.ico`.

Do not convert the site back to a purely static nested-HTML routing model without testing Cloudflare Pages behavior. The Function-based case-study routing was added because nested case-study routes previously fell back to the homepage.

## Production assets

Launch-critical imagery is committed to GitHub. Production must not depend on temporary Figma asset URLs or the previous WordPress host.

Case-study gallery compositions are exported from the approved Figma design. Mobile case-study galleries should use Retina-resolution source files (approximately 3× the displayed dimensions).

## Contact form environment

The contact form uses Cloudflare Turnstile plus a honeypot, same-origin enforcement, request-size limits, submission timing, server-side field validation, and escaped email rendering. Turnstile is validated server-side before email is sent.

Email delivery uses Cloudflare Email Service through its REST API.

Required Cloudflare secrets/environment values:

- `CLOUDFLARE_ACCOUNT_ID`
- `EMAIL_API_TOKEN`
- `TURNSTILE_SECRET_KEY`

These values must remain in Cloudflare and must never be committed to GitHub.

Current delivery configuration in `functions/api/contact.js`:

- Destination: `anthonystoro@icloud.com`
- Sender: `website@anthonystoro.com`
- Reply-To: visitor's submitted email

A Cloudflare dashboard rate-limit rule for `/api/contact` was configured during launch. That rule is external to the repository and should be checked in Cloudflare if contact-form throttling changes.

## 404 behavior

Unknown clean URLs are intercepted by `functions/_middleware.js` and return `404.html` with a real HTTP 404 response.

Test example:

`https://anthonystoro.com/this-page-does-not-exist`

If this URL shows the homepage instead of the 404 page, inspect the Pages Functions/middleware routing before modifying the 404 design.

## Favicon behavior

The production favicon is deliberately handled through `functions/[[path]].js` for both the explicit favicon URL and `/favicon.ico` fallback.

This was done after browser and static-asset favicon caching repeatedly surfaced old icons.

The final icon uses transparent pixels outside the rounded dark tile. Avoid reintroducing competing favicon declarations or relying on old root favicon files without first reviewing the closeout document.

## Normal deployment workflow

1. Branch from current `main`.
2. Make the requested change.
3. Open a pull request.
4. Wait for the Cloudflare Pages preview deployment.
5. Validate the preview for visible or routing changes.
6. Merge to `main`.
7. Confirm production deployment.

For visual changes, compare desktop and mobile against the approved Figma file before merging.

## Production verification checklist

After meaningful releases, verify:

1. Homepage loads on desktop and mobile.
2. `/work/carlingtech/` and representative case studies load at clean URLs.
3. Case-study previous/next navigation works.
4. Mobile gallery images are sharp.
5. Favicon appears correctly in a new tab.
6. Unknown URLs return the designed 404 page.
7. Contact form submits successfully and Turnstile works.
8. `www.anthonystoro.com` resolves/redirects correctly to the primary domain.
9. No environment secrets are present in repository code.
10. Production Cloudflare deployment completes successfully.
