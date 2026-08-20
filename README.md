# anthonystoro.com

Production portfolio website for Anthony Storo.

## Status

**Live / production.** The 2026 redesign, responsive implementation, case-study buildout, GitHub migration, and Cloudflare Pages launch are complete.

- Production: https://anthonystoro.com
- Figma source of truth: https://www.figma.com/design/FhpTHQ7jbsikAAxM3ETnvF/ANTHONY-STORO
- Production branch: `main`
- Hosting: Cloudflare Pages

## Start here

For project history, architecture, approved design decisions, Figma node references, case-study rules, Cloudflare routing, contact-form security, favicon/404 behavior, maintenance workflow, and future-session recovery instructions, read:

**[`docs/WEBSITE-REDESIGN-CLOSEOUT.md`](docs/WEBSITE-REDESIGN-CLOSEOUT.md)**

For deployment/environment details, also see [`DEPLOYMENT.md`](DEPLOYMENT.md).

## Repository structure

```text
assets/                  Production images, logos, and case-study assets
css/                     Homepage and case-study styles
js/                      Homepage, motion, case-study, gallery, and contact scripts
functions/                Cloudflare Pages Functions
  api/contact.js          Secure contact-form endpoint
  work/[[path]].js        Clean case-study routing
  _middleware.js          Legacy redirect + real 404 handling
  [[path]].js             Favicon request handling
index.html                Homepage
case-study.html           Shared case-study document
404.html                  Designed 404 page
docs/                     Project closeout and maintenance documentation
```

## Normal release workflow

1. Confirm the visual decision in Figma when applicable.
2. Branch from `main`.
3. Make the smallest controlled change.
4. Open a pull request.
5. Verify the Cloudflare Pages preview deployment.
6. Merge to `main`.
7. Cloudflare automatically deploys production.

Do not remove the Pages Functions or replace the `/work/*` routing architecture without reviewing the closeout documentation first.
