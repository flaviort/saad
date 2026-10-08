# Saad website: pending items and adjustments

Last updated: 2026-10-08

Everything below is still open. Items are grouped by who needs to act and ordered roughly by urgency. Work that is already done is summarized at the end for reference.

---

## 1. Urgent: the WordPress host is gone

The site pulls every project from WordPress over GraphQL. The production endpoint was `https://senzdsn.com/sites/saad/graphql`, and **senzdsn.com no longer exists**: DNS returns NXDOMAIN on Google and Cloudflare resolvers, and whois has no record of the domain (most likely an expired registration).

What that means today:

- **Production (lucas-saad.vercel.app) still shows projects** only because its pages were prerendered in February 2026, while WordPress was still reachable.
- **Any new production build will publish an empty portfolio.** That includes merging `stage` into `main` or redeploying the current production.
- **The `stage` preview already builds with zero projects** for the same reason.
- **The local Local (Flywheel) install at `saad.local` may be the only working copy of the content.**

To do:

- [ ] Do not merge `stage` into `main` or redeploy production until content is reachable again.
- [ ] Back up the local install: the database plus `wp-content/uploads`. A database dump already exists at `/Users/flavioczuk/Documents/senz/_wordpress/saad/backup-before-content-fixes-2026-10-08.sql`, but the uploads folder is not backed up anywhere yet.
- [ ] Find out whether senzdsn.com expired by accident or was let go on purpose.
- [ ] Decide where the content lives next:
  - **Option A:** renew senzdsn.com (if still possible) or pick new hosting, then migrate the local WordPress there.
  - **Option B:** replace WordPress with Payload CMS + Neon Postgres + Vercel Blob, running inside this Next.js app (see section 7). The import would come straight from `saad.local`.
- [ ] Whatever the option, set `WP_GRAPHQL_URL` in Vercel for **both Production and Preview**. Without it, [utils/graphql.ts](../utils/graphql.ts) falls back to `http://saad.local/graphql`, which only works on this machine.

---

## 2. Vercel setup (needs someone with dashboard access)

The Vercel connector available to Claude has read-only access to the account, and the local Vercel CLI is signed in to a different account (Renan Lopes), so these steps have to be done in the dashboard.

- [ ] **Stage URL:** in the `saad` project, go to Settings > Domains, add `lucas-saad-stage.vercel.app` and set its Git branch to `stage`. Every push to `stage` will then update that URL. (It will show no projects until section 1 is solved.)
- [ ] **Environment variable:** add `WP_GRAPHQL_URL` for Production and Preview (see section 1).
- [ ] **Plan:** the project is on the Hobby plan. Vercel's Hobby terms are for non-commercial use, so a client site should move to Pro before launch.
- [ ] Optional: Vercel CLI on this machine is outdated (62.2.0, latest 62.7.0).

---

## 3. Launch on saad.cx

saad.cx currently serves the client's old site (nginx, title "Saad Brand Consultancy | Consultoria de Branding e Inovação"). The new site is built to take over that domain.

- [ ] Attach `saad.cx` (and `www.saad.cx`) to the Vercel project as the production domain. Canonical URLs, hreflang tags, the sitemap and the JSON-LD all derive from Vercel's production domain, so they switch over automatically. To force it, set `NEXT_PUBLIC_SITE_URL=https://saad.cx`.
- [ ] **Redirects from the old site.** Map every URL of the current saad.cx to its new equivalent (301), so existing Google rankings carry over. Pull the list from the old site's sitemap before switching DNS.
- [ ] Verify the domain in Google Search Console and submit `https://saad.cx/sitemap.xml`. Keep `public/google84a06f79f42dbaa2.html`, it is an existing Search Console ownership check.
- [ ] Run Google's Rich Results Test on the home page and one project page to confirm the structured data.
- [ ] Run PageSpeed Insights on the live URL (see section 6 for expected scores).

---

## 4. Content questions for the client

These are in WordPress (the local install) and need an answer from Saad before they can be fixed.

- [ ] **Review the two new English translations.** The English versions of **Soteria** and **Privia** had their case study text in Portuguese. They were translated on 2026-10-08, keeping all figures (10%, 56%, 40%, 22.5%, 70%) and taglines as in the originals. Someone at Saad should proofread them.
- [ ] **Ipiranga Seeds awards:** "IDEA Brasil 2013 - Finalist in the Design Strategy category. **United States**" (same in Portuguese). IDEA Brasil is a Brazilian award, and the entry above it is the same award as a silver medal. Probably the wrong country, or a mislabeled US IDEA award.
- [ ] **RE testimonial from The Dieline:** the person's name field holds "The world's leading reference in packaging design" and the position is empty. Fine if intentional (the quote is from the publication, not a person); otherwise move it to the position field.
- [ ] **Portuguese service lists** keep some English terms ("Key messages", "Business model innovation", "Brand communication") while translating others. It is consistent across all Portuguese projects, so it looks like deliberate jargon. Confirm.
- [ ] **Portuguese subtitles in English** ("Anytime, anywhere", "Smart sustainability", "Tech comfort") look like the brands' own taglines. Confirm they should stay in English.
- [ ] **Soteria** has no awards and no testimonials. Confirm that is expected.

---

## 5. Design and copy decisions

- [ ] **Showreel resolution.** `public/videos/showreel.mp4` is only 640 x 640 but fills a full-screen area, so it looks soft on large screens. A 1920px-wide export would be the single biggest visual upgrade available.
- [ ] **Page headings.** Every page now has one `<h1>`, but most are long statements (About's is two sentences, Contact's is "Hello Saad!"). Search engines weigh titles and descriptions more, so this is fine, but shorter keyword-led headings would rank better. Copy decision for the client.
- [ ] **List text opacity on About and project pages** went from 50% to 55% to meet the WCAG AA contrast minimum (4.22:1 before, 4.86:1 now). Slightly brighter; confirm it still looks right.
- [ ] **Social icons removed.** The unused SVGs in `assets/svg/social/` were deleted during cleanup. If footer social links are added later, restore them from git history.

---

## 6. Performance: what is left and why

Lighthouse results on a local production build (6 pages, mobile and desktop):

| Category | Mobile | Desktop |
|---|---|---|
| Performance | 91 to 95 | 100 |
| Accessibility | 100 | 100 |
| Best Practices | 100 | 100, except project pages at 77 |
| SEO | 92 locally, expected 100 on the real domain | same |

- **Mobile performance (91 to 95)** is held back by the intro animations, not by loading. The main text on each page (or the cookie banner on home and project pages) starts hidden and is faded in by JavaScript. Lighthouse simulates a mid-range phone on slow 4G, so it counts that text as visible only once the animation script has run (about 3 seconds). The real render time was under 100 ms. Reaching a reliable 100 would mean showing the main heading before the animation runs, which changes the opening feel. **Decision for the client;** current recommendation is to keep it.
- **Best Practices 77 on project pages** comes from `__cf_bm`, a Cloudflare bot-protection cookie set by Vimeo's servers. Vimeo's do-not-track mode is already on and does not stop it. The only fix is a click-to-play thumbnail instead of the autoplaying preview.
- **SEO 92 locally** is a test artifact (canonical tags point at port 3000 while the test ran on 3123). On the real domain this should be 100.
- Re-test after launch with PageSpeed Insights, or locally:
  ```bash
  npx lighthouse https://saad.cx --view
  ```
  Preview deployments are behind Vercel Authentication, so PageSpeed Insights cannot reach the stage URL unless deployment protection is turned off for previews.

---

## 7. Future: replacing WordPress with Payload CMS

Discussed as the long-term option (see section 1, option B). Summary:

- **Stack:** Payload CMS installed inside this Next.js app (admin at `/admin`), Neon Postgres from the Vercel Marketplace, Vercel Blob for images. One Vercel project, no separate hosting.
- **Mapping:** `projects` post type becomes a collection; ACF repeaters become `array` fields; the flexible-content gallery becomes a `blocks` field with the same 4 layouts.
- **Languages:** Payload has field-level localization, so each project becomes one document with an EN/PT switcher, instead of two posts linked by a `language` field.
- **Migration:** a one-off script reads `saad.local`, re-uploads images to Blob and merges each EN/PT pair. Estimated at a few days.
- **Cost:** Vercel Blob storage is $0.023 per GB-month and the portfolio is roughly 0.5 to 1 GB, so a few cents a month, covered by the Pro plan's included credit. Neon's free tier covers the database.
- **Check first:** confirm the current Payload release supports Next.js 16.4.

---

## 8. Minor technical notes

- The locale 404 page returns the correct 404 status and `noindex`, but its content and `<title>` render client-side, so the initial HTML shows the home page title. Not an SEO issue because the page is excluded from search.
- Project pages only exist when WordPress returns both language versions at build time (`dynamicParams = false`). A project added in only one language gets a page only in that language, and its hreflang tags reflect that.

---

## Already done (for reference)

**Performance and images**
- All photos served at quality 90 through `next/image` (visually lossless); `qualities: [90]` in `next.config.ts`.
- Vimeo players load only when scrolled near (no Vimeo requests on page load).
- Home showreel has a poster frame and `preload="metadata"`.
- Missing `sizes` added, `priority` replaced with `preload`, first `/work` card fetched eagerly at high priority.
- About 12 MB of unused images, unused SVGs, an unused component and stray `.DS_Store` files deleted.

**Accessibility**
- Labels added to the back-to-top button, testimonial arrows, menu logo, video links and the contact form dropdown (EN and PT).
- Removed `role="presentation"` from form inputs.
- Contrast fix on list text (see section 5).

**SEO**
- One `<h1>` per page; the home `<h1>` now contains real text behind the SVG lettering.
- Titles put the topic first ("About | Saad"); descriptions rewritten to 115 to 147 characters.
- Project pages get real descriptions, their own share image, and hreflang only for languages that exist.
- JSON-LD on every page: Organization, WebSite, WebPage types, Person (Lucas Saad), CreativeWork for projects, breadcrumbs.
- Preview and branch deployments send `noindex` and a blocking robots.txt.
- Sitemap lists both languages per project with last-modified dates.
- Author meta set to Senz; `x-default` hreflang added.

**WordPress content (local install, 2026-10-08)**
- Soteria and Privia English texts translated; Privia services and award translated.
- Placeholder tags replaced on Soteria, Privia and Yon (both languages).
- Leftover `<div>` markup removed from 9-6 (both languages).
- Typos fixed: Singapore, Brazil, Netherlands, trailing spaces.
