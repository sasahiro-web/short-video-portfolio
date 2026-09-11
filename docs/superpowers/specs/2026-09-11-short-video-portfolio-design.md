# Short Video Portfolio — Design Specification

## Goal

Create a one-page static portfolio that lets a recruiter quickly understand HIROKO SASAKI's capability to plan, shoot, edit, and publish short-form social video. It is intended for pet-product TikTok and Instagram Reels roles, while accurately representing only the provided public materials.

## Constraints

- Use the supplied video files unchanged through native HTML5 video players.
- Do not fabricate responsibilities, clients, performance figures, or descriptions.
- Do not display a contact address or contact form.
- Preserve each video's native aspect ratio. Do not autoplay; use `controls` and `playsinline`.
- Keep the site publishable as a static GitHub Pages project.

## Content model

### Identity and positioning

- Name: `HIROKO SASAKI`
- Title: `SHORT VIDEO PORTFOLIO`
- Hero copy and capability labels follow the supplied production brief.

### Work selection

Five works are promoted in `SHORT VIDEO WORKS`, selected from the supplied and user-approved video materials:

1. Coconut scone with Joey (vertical)
2. "うちのコ♡プレート" series introduction (vertical)
3. Carrot and cheesecake tart (vertical)
4. 調味料選手権 PR video (horizontal)
5. Onion recipe video (portrait)

`videoplayback.mp4` is an additional cooking short and appears in a compact `OTHER WORK` area so that all approved material remains viewable without making the lead section too dense.

Each work shows only information safely supported by the asset itself: category, title derived from the supplied filename, and a `説明要確認` note where an assigned role, tools, or production point cannot be verified. No client name, role, or tool is inferred.

### Other sections

- `PET CONTENT`: exact text from the brief plus the Joey work as the relevant supplied material.
- `CLIENT WORK`: the brief's permitted, generic responsibility list only; no company or project is named.
- `WHAT I CAN DO`: Planning, Script, Shooting, Editing, SNS, AI Workflow.
- `TOOLS`: CapCut, Premiere Pro, Canva, Photoshop, ChatGPT, as specified in the brief.
- `CONTACT`: the supplied invitation sentence only; no form or contact details.
- Existing public Instagram links appear as plainly labelled external links.

## Visual direction

The UI uses a near-white background, deep navy/charcoal text, fine neutral borders, and generous editorial spacing. Typography is clean and restrained. Video is the visual focal point; there are no device mockups, decorative gradients, oversized shadows, or excessive rounded cards.

On desktop, the lead work grid uses two or three columns according to the video's orientation. Vertical work is given the most visual area. On narrow screens, cards collapse to one column and all players stay within the viewport. Horizontal work uses a natural widescreen frame and is never cropped.

## Architecture

- `index.html`: semantic page structure, all provided copy, native video elements, metadata, and external links.
- `assets/css/style.css`: custom responsive layout, type scale, colour tokens, and reduced-motion styles.
- `assets/js/main.js`: lightweight progressive enhancements only: section navigation state, video pausing when another player begins, and mobile-menu control if navigation requires it.

No framework, build step, server, tracking code, or contact integration is included.

## Interaction and resilience

- Videos wait for deliberate user input and render with browser controls.
- Starting one video pauses every other video, avoiding overlapping audio.
- Links to Instagram open in a new tab with safe `rel` attributes.
- Navigation works without JavaScript; JavaScript enhancement must not block page content.
- Native video fallback text is supplied for unsupported browsers.

## SEO and metadata

- Title: `Short Video Portfolio | HIROKO SASAKI`
- Description: `SNS・TikTok・Instagram Reelsを中心としたショート動画制作ポートフォリオ。企画・構成・撮影・編集・SNSコンテンツ制作。`
- Standard Open Graph title, description, type, and locale are included.
- Canonical and `og:url` are deliberately omitted until the final GitHub Pages URL is known.

## Verification

- Validate HTML structure and inspect every local video source path.
- Confirm no video has autoplay or muted playback attributes, and each has controls and `playsinline`.
- Test the pause-other-video enhancement in a browser.
- Inspect desktop and mobile layouts, including widths smaller than 390px.
- Check all external links, title/description metadata, and GitHub Pages-compatible relative paths.
