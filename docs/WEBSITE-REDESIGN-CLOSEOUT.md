# AnthonyStoro.com Website Redesign — Project Closeout & Handoff

**Project status:** Production / closed out  
**Closeout date:** August 20, 2026  
**Production URL:** https://anthonystoro.com  
**GitHub repository:** `a-sto821/anthonystoro.com`  
**Production branch:** `main`  
**Design source of truth:** https://www.figma.com/design/FhpTHQ7jbsikAAxM3ETnvF/ANTHONY-STORO

---

## 1. Purpose of this document

This file is the canonical project memory for the 2026 AnthonyStoro.com redesign, rebuild, GitHub migration, and Cloudflare launch.

Use it when:

- returning to the site after a long break;
- starting a new ChatGPT/Codex conversation after clearing old chat history;
- updating a case study or homepage section;
- troubleshooting Cloudflare Pages routing, the contact form, favicon, or 404 behavior;
- handing the site to another developer;
- reviewing the design decisions that were intentionally approved during the redesign.

### Recommended prompt for a future ChatGPT session

> Read `docs/WEBSITE-REDESIGN-CLOSEOUT.md` in `a-sto821/anthonystoro.com` first. Treat the linked Figma file as the visual source of truth and the current `main` branch as the production implementation. Then help me with the requested website update without undoing the documented design and routing decisions.

---

## 2. Project outcome

The previous portfolio approach was replaced with a custom responsive portfolio designed in Figma and deployed as a lightweight Cloudflare Pages site.

The final site is intended to position Anthony Storo around **creative strategy, digital experience, UX/UI, complex product communication, multimedia, and brand/print work**, rather than functioning as a generic asset gallery.

Primary positioning:

> **I create digital experiences that simplify complexity.**

Supporting message:

> I help organizations transform complex products into intuitive digital experiences that improve customer understanding, empower sales teams, and drive business growth.

Core design principle throughout the project: **clean, minimal, intentional, and easy for a hiring manager to scan quickly.**

---

## 3. Source-of-truth hierarchy

When implementation, old assets, or screenshots disagree, use this priority order:

1. **Current approved Figma design** — visual layout, spacing, imagery, crop, responsive composition.
2. **Current `main` branch** — production behavior, routing, contact/security code, motion implementation.
3. This closeout document — approved decisions, context, history, and maintenance rules.
4. Legacy files or old screenshots — reference only.

Do not recreate case-study image crops from memory when Figma contains the approved composition.

---

## 4. Figma references

### Main design file

https://www.figma.com/design/FhpTHQ7jbsikAAxM3ETnvF/ANTHONY-STORO

### Important nodes / boards

- Desktop case-study navigation reference: `253:61`
- Mobile homepage hero artwork/composition: `179:14`
- Favicon design board: `379:2`
- Editable favicon master: `379:6`
- Browser-tab favicon preview: `379:16`

### Mobile case-study boards

- Carlingtech: `254:1003`
- Fuse Holder Selector: `284:2`
- V-Series Selector: `284:60`
- S. P. Campbell: `284:118`
- Little Stuess: `292:2`
- Transportation Products Catalog: `307:2`
- ConExpo: `307:60`
- Cole Hersee video: `338:2`
- Carling History Booklet: `338:65`
- Arbor Meadows: `338:124`
- Carling China video: `343:2`
- Fuse Holder Product Overview video: `343:65`
- Window Switch Product Overview video: `343:128`
- Selected Logo + Brand Identity Work: `346:2`

If a future board ID changes because the design is reorganized, update this document.

---

## 5. Production architecture

The site is intentionally simple: static HTML/CSS/JavaScript plus Cloudflare Pages Functions where server behavior is required.

### Major files

- `index.html` — homepage shell and main portfolio content.
- `case-study.html` — shared case-study HTML document used by clean `/work/<slug>/` routes.
- `case-study-shell.txt` — maintained shell/reference used during routing work; do not assume it is the production route without checking Functions.
- `404.html` — designed not-found page.
- `css/` — responsive layout and iterative polish layers.
- `js/` — homepage interaction, motion, case-study rendering, gallery sync, contact behavior.
- `functions/api/contact.js` — server-side contact form handling.
- `functions/work/[[path]].js` — serves approved case studies at clean URLs.
- `functions/_middleware.js` — legacy query redirect plus real 404 handling for unknown clean URLs.
- `functions/[[path]].js` — favicon response handling, including the `/favicon.ico` browser fallback.
- `_headers` — static security/cache headers where applicable.

### Deployment

Cloudflare Pages deploys from the repository's `main` branch.

Normal release workflow:

1. Create a branch from `main`.
2. Make the smallest controlled change possible.
3. Open a pull request.
4. Allow the Cloudflare Pages preview deployment to complete.
5. Verify preview when the change affects visible behavior.
6. Merge to `main`.
7. Cloudflare automatically deploys production.

Do not disable Cloudflare's GitHub-based automatic production deployments.

---

## 6. Homepage design decisions

### Desktop

Desktop uses the large two-column hero: messaging on the left and the dark technical/digital illustration on the right.

The homepage sections are intentionally compact so work appears quickly below the hero.

### Mobile

The mobile homepage was separately composed in Figma rather than treated as a simple scaled desktop version.

Approved mobile behavior:

- the hero illustration uses the exact mobile Figma composition from node `179:14`;
- the illustration is intentionally subtle behind the supporting paragraph;
- the first portfolio card should be visible as early as practical rather than waiting until a deep scroll position;
- the hero artwork moves upward as the user scrolls;
- final approved mobile artwork travel is approximately **100px upward**;
- desktop motion should not be changed when tuning the mobile movement.

The hero graphic exists to support the text, not compete with it. Readability takes priority over illustration contrast.

---

## 7. Work categories

Homepage work is organized into three primary categories:

1. **Digital Experiences**
2. **Multimedia**
3. **Brand + Print**

The site is intentionally solutions/case-study oriented rather than an exhaustive archive.

---

## 8. Case-study system

### Definitive project order

The previous/next sequence is:

1. Selected Logo + Brand Identity Work
2. Carlingtech.com
3. Fuse Holder Selector Tool
4. V-Series Selector Tool
5. Littelfuse Transportation Products Catalog
6. ConExpo Trade Show Experience
7. S. P. Campbell
8. Carling China Capabilities
9. Fuse Holder Product Overview
10. Window Switch Product Overview
11. Cole Hersee 100 Year Celebration
12. Carling 100 Year History Booklet
13. Arbor Meadows New Development Brochure
14. Little Stuess Children’s Book Layout
15. Cycle back to Selected Logo + Brand Identity Work

Project content/data lives primarily in `js/case-study.js`.

### Clean URLs

Production case studies use URLs such as:

`https://anthonystoro.com/work/carlingtech/`

Do **not** return to visible `?project=carlingtech` URLs.

Legacy `/?project=<slug>` requests are redirected by middleware to `/work/<slug>/`.

### Cloudflare routing detail

`functions/work/[[path]].js` validates the requested slug and returns the imported `case-study.html` document directly.

This architecture was chosen after Cloudflare Pages repeatedly treated nested case-study HTML paths as homepage/static-asset fallbacks. Do not casually replace this Function with generic asset rewrites unless the new approach is tested on the production Pages architecture.

### Mobile metadata

On mobile, case-study summary cards intentionally show only:

- **Role**
- **Scope**

Context / Launch / Platform and Outcome were removed from mobile because they added visual density without enough scanning value. Desktop can show the fuller metadata set.

### Mobile type scale

Approved mobile case-study scale is approximately:

- project title: 24px
- section headings: 17px
- body: 13px
- metadata labels: 9px
- metadata values: 12px
- process summary / View process: 11px
- CTA: 13px
- Previous/Next label: 10px
- Previous/Next project name: 15px
- ALL WORK: 14px

Do not reduce this back to the earlier smaller mobile typography.

### Project navigation

Figma uses typographic arrows, not drawn chevrons:

- `← Previous Project Name`
- `Next Project Name →`

The exact desktop visual reference is Figma node `253:61`.

### Mobile lower-page spacing

For projects without a CTA, maintain approximately **22px** between the Process card and Project Navigation.

The divider above `PREVIOUS PROJECT` should have enough breathing room that it does not visually cut into the label.

### ALL WORK

Mobile uses a full-width dark `ALL WORK` button between Previous and Next project blocks.

---

## 9. Case-study imagery

This became an important implementation rule during final QA.

### Figma renders are the source of truth

The website originally used generic image containers with `object-fit: cover`. That caused stale imagery and crops that did not match Figma.

The final system uses **finished Figma gallery compositions** for case studies.

Each case study has an approved desktop and mobile gallery composition. Use the Figma gallery itself rather than attempting to reverse-engineer its crop in CSS.

### Mobile resolution

Do not export mobile case-study gallery imagery at only 342×160 physical pixels. That looked blurry on Retina iPhones.

Final rule:

- visible mobile gallery size: approximately **342×160 CSS pixels**;
- export source: **3× / approximately 1026×480** for Retina sharpness.

This is especially important for screenshots containing UI, text, logos, and print layouts.

### Video projects

Video case studies retain clickable video behavior while visually using the approved Figma still/composition.

If a Figma gallery contains the visible play treatment, keep an interactive hit target aligned to it rather than replacing the artwork.

### Known video mapping

The project has had historical video-link mismatches. Before changing links, verify the actual YouTube title rather than rotating mappings based on memory.

The current renderer/data in `js/case-study.js` and any later overrides in `js/case-study-polish.js` should be checked together before editing.

---

## 10. Favicon system

Favicon troubleshooting consumed multiple iterations because browsers, Pages static assets, and legacy root files could each provide different icons.

### Design source

Figma favicon board: `379:2`  
Editable master: `379:6`

Final visual intent:

- square icon;
- dark `#151515` rounded tile;
- centered AS mark;
- no stretched horizontal lockup;
- transparent pixels outside the rounded corners;
- no tiny `Anthony Storo` text at favicon scale unless deliberately redesigned later.

### Production delivery

The current favicon is served by `functions/[[path]].js` for both:

- `/favicon-as-final-v2.png`
- `/favicon.ico`

The Function returns the favicon with `Cache-Control: no-store, max-age=0` so browser/Cloudflare asset caching is less likely to surface an obsolete icon.

Do not reintroduce multiple competing `<link rel="icon">` declarations without a reason.

### Historical pitfall

Old root favicon files may remain in the repository for history. They should not be treated as the production source simply because a browser knows the conventional `/favicon.ico` path. The Function is authoritative.

---

## 11. 404 behavior

Cloudflare Pages initially returned the homepage for unknown URLs because the deployment behaved like an SPA fallback.

That was corrected in `functions/_middleware.js`.

Unknown clean routes now return the designed `404.html` document with an actual HTTP **404** status.

Example test URL:

`https://anthonystoro.com/this-page-does-not-exist`

If that ever returns the homepage again, inspect Pages routing/middleware before changing `404.html` itself.

---

## 12. Contact form and security

The contact form is server-backed through `functions/api/contact.js`.

### Delivery

- Destination: `anthonystoro@icloud.com`
- Sender identity: `website@anthonystoro.com`
- Delivery service: Cloudflare Email Service API
- Reply-To: submitted visitor email

### Cloudflare secrets required

These values belong in Cloudflare environment/secrets, **not committed to GitHub**:

- `CLOUDFLARE_ACCOUNT_ID`
- `EMAIL_API_TOKEN`
- `TURNSTILE_SECRET_KEY`

### Existing protections

Server-side code currently includes:

- Cloudflare Turnstile verification;
- hostname validation;
- expected Turnstile action validation (`contact`);
- same-origin checks;
- request size limit;
- honeypot field;
- minimum form completion time;
- name/email/message validation and length limits;
- HTML escaping before email rendering;
- no-store API responses;
- security response headers.

There is also a Cloudflare dashboard rate-limit rule for `/api/contact` that was configured during launch. That rule is **external configuration and is not represented by this Git repository**, so check the Cloudflare dashboard if rate-limiting behavior changes.

Do not expose the Turnstile secret or email API token client-side.

---

## 13. Cloudflare / domain configuration

Current production hosting is Cloudflare Pages.

Important operational assumptions established during launch:

- `main` is the production branch;
- GitHub merges automatically trigger Cloudflare Pages production deployments;
- `www` should resolve/redirect to the primary `anthonystoro.com` domain;
- contact-form secrets live in Cloudflare;
- Pages Functions are part of the production architecture and should not be removed during a static-site cleanup;
- the repo and production assets should not depend on temporary Figma download URLs.

GitHub Actions notification emails were disabled at the account level while keeping Actions visible inside GitHub. This affects notifications only and does not disable workflows or Cloudflare deployment.

---

## 14. CSS / JavaScript layering

The site accumulated multiple small polish files during the final fidelity sprint. This is intentional production history, but future cleanup should be done carefully.

Important files include:

### CSS

- `css/styles.css`
- `css/hero-build.css`
- `css/figma-sync.css`
- `css/final-tweaks.css`
- `css/case-study.css`
- `css/case-study-polish.css`
- mobile/home polish files if present on current `main`

### JavaScript

- `js/main.js`
- `js/hero-build.js`
- `js/motion.js`
- `js/case-study.js`
- `js/case-study-polish.js`
- `js/case-study-gallery-sync.js`
- `js/contact-security.js`

Before consolidating styles/scripts, visually compare desktop and mobile against Figma. Several “small” override rules were added to solve Safari/iPhone-specific behavior and should not be removed just because they look redundant.

---

## 15. Known implementation lessons / pitfalls

These are worth preserving because they caused real regressions during the build.

### Cloudflare nested HTML routing

Direct nested static case-study pages repeatedly fell back to the homepage. The current Function-based `/work/*` architecture solved this.

### Figma image URLs are temporary

Never use temporary Figma asset download URLs as production image sources. Export and commit permanent assets.

### Mobile 1× imagery is not sufficient

342×160 source images look blurry when displayed at 342×160 on Retina devices. Use high-resolution exports.

### Safari button sizing

Video hero elements implemented as buttons can shrink-wrap unless explicitly made block-level/full width. Preserve explicit width rules.

### Favicon caching is unusually persistent

Chrome and other browsers may request `/favicon.ico` independently of HTML declarations. The current Function intercepts the fallback deliberately.

### Same filename changes may need cache busting

For CSS/JS/image fixes where the browser may retain an old asset, update the query version in the HTML or use a new filename.

### Temporary GitHub workflows

Several one-off workflows were used to transfer generated/binary assets and make cache-version edits. Temporary workflow files should be removed before merge whenever possible. Do not leave throwaway automation as permanent project infrastructure.

---

## 16. Content philosophy

Portfolio copy was intentionally made concise and hiring-manager friendly.

Preferred case-study structure:

- state what the problem/project was;
- make Anthony's ownership explicit;
- describe scope without inflating responsibility;
- emphasize strategy, UX, cross-functional leadership, production, and measurable impact where supported;
- do not invent metrics;
- use verified analytics only;
- avoid an asset-dump presentation.

The selected logo/branding case study is intentionally broader than other case studies. Its purpose is to demonstrate substantial logo and identity experience across Anthony's creative career, not to pretend it was one single project.

---

## 17. Design preferences to preserve

Unless there is a deliberate redesign:

- prioritize minimalism and clarity;
- use generous spacing;
- keep typography strong and easy to scan;
- use vector/simple icons rather than inconsistent emoji-like glyphs;
- maintain clear 44×44-ish interactive targets on mobile;
- preserve mobile-specific layouts rather than blindly scaling desktop;
- keep illustration/artwork secondary to readability;
- avoid unnecessary cards, boxes, and visual decoration;
- use Figma as the visual source of truth before implementing significant UI changes.

---

## 18. Production QA checklist for future releases

After meaningful website changes, check at minimum:

### Homepage

- desktop hero composition;
- mobile hero readability;
- mobile hero parallax/motion;
- My Work tabs;
- first work card visibility on mobile;
- header navigation / hamburger;
- footer navigation;
- favicon in a new browser tab.

### Case studies

- `/work/carlingtech/` as a representative desktop case;
- at least one multimedia/video case;
- at least one Brand + Print case;
- mobile gallery sharpness;
- Role + Scope-only mobile metadata;
- process expansion;
- CTA where applicable;
- Previous / ALL WORK / Next sequence;
- Figma-style typographic arrows;
- footer spacing.

### Infrastructure

- unknown URL returns designed 404, not homepage;
- contact form submits successfully;
- Turnstile completes;
- rate limiting remains active;
- no secrets appear in source;
- Cloudflare preview deployment succeeds before merge;
- production deploy succeeds after merge.

---

## 19. Current project status at closeout

As of August 20, 2026:

- redesigned homepage is live;
- responsive desktop/mobile implementation is live;
- all 14 case studies are live at clean URLs;
- current case-study imagery has been synchronized from Figma;
- mobile case-study galleries use Retina-resolution exports;
- case-study navigation and arrows match the approved Figma treatment;
- mobile spacing and metadata simplification are implemented;
- favicon is delivered through Cloudflare Functions with transparent rounded corners;
- custom 404 behavior is functioning;
- contact form is protected with Turnstile and server-side validation;
- GitHub → Cloudflare deployment workflow is established;
- the project is considered ready to move from redesign/launch into normal maintenance.

---

## 20. How to make a future update safely

For visual changes:

1. Update/review the design in the main Figma file.
2. Identify the exact desktop and mobile nodes involved.
3. Export permanent production assets at sufficient resolution.
4. Branch from current `main`.
5. Modify only the files needed.
6. Preserve existing Cloudflare routing unless the task is specifically infrastructure-related.
7. Use a PR and Cloudflare preview.
8. Compare against Figma on desktop and iPhone/mobile.
9. Merge only after preview validation.
10. Update this document if the architecture or a major approved design rule changes.

For case-study content only, usually update `js/case-study.js` and verify that any later polish/override script does not replace the same field.

---

## 21. Final ownership / maintenance note

This repository is now the canonical production codebase for AnthonyStoro.com. The Figma file remains the canonical design source.

The safest future workflow is therefore:

**Figma decision → GitHub branch → Cloudflare preview → production merge.**

Avoid editing production behavior directly in Cloudflare unless it is environment/security configuration that cannot live in the repository.
