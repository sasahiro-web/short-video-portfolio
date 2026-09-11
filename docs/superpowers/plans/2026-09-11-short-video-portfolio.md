# Short Video Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (- [ ]) syntax for tracking.

**Goal:** Build a responsive, one-page, static short-video portfolio that accurately presents the supplied public videos and is ready for GitHub Pages.

**Architecture:** index.html owns semantic content, metadata, player markup, and external links. assets/css/style.css owns the responsive editorial presentation. assets/js/main.js is a progressive enhancement that stops simultaneous video playback. Node's built-in test runner asserts the static contract without runtime dependencies.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript, HTML5 video, Node.js node:test.

**Spec:** docs/superpowers/specs/2026-09-11-short-video-portfolio-design.md

## Global Constraints

- Use supplied video files as-is through native video players.
- Do not invent responsibilities, client names, performance figures, or production descriptions.
- Do not publish a contact address and do not add a contact form.
- Every player preserves natural ratio, uses controls and playsinline, and has neither autoplay nor muted.
- Use relative paths only. Do not add a framework, build step, analytics, canonical URL, or og:url.
- Keep the presentation near-white with deep navy/charcoal text and restrained borders. Do not use gradients or device mockups.
- Support a 390px viewport, visible keyboard focus, and reduced-motion preferences.

---

## File Structure

- package.json — development-only Node test command.
- tests/site-contract.test.mjs — regression contract for content, video attributes, source paths, responsive styling, and exclusive playback.
- index.html — the semantic one-page portfolio with unchanged video references.
- assets/css/style.css — visual tokens, responsive layout, focus states, and reduced-motion rules.
- assets/js/main.js — native-player enhancement only.

### Task 1: Establish the static-site contract

**Files:**

- Create: package.json
- Create: tests/site-contract.test.mjs

**Interfaces:**

- Consumes: index.html, assets/css/style.css, and assets/js/main.js.
- Produces: npm test, an executable static-site contract.

- [ ] **Step 1: Add a zero-dependency test command**

Create package.json:

~~~json
{
  "name": "short-video-portfolio",
  "private": true,
  "scripts": {
    "test": "node --test tests/site-contract.test.mjs"
  }
}
~~~

- [ ] **Step 2: Write a failing page contract**

Create tests/site-contract.test.mjs:

~~~js
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const css = readFileSync(new URL('../assets/css/style.css', import.meta.url), 'utf8');
const js = readFileSync(new URL('../assets/js/main.js', import.meta.url), 'utf8');

const sources = [
  'materials/〜Joeyとおうちカフェ🏡☕🍪🥤〜混ぜるだけの簡単ココナッツスコーンをJoeyと一緒に！？焼きました🍪焼き立てに『BROWN SUGAR 1ST（@bs1st）』のオーガニックココナッ.mp4',
  'materials/〜「うちのコ♡プレート」シリーズにNewアイテム登場✨️〜『For Two Café』の「うちのコ♡」グッズに新しい仲間が加わりました15cmのアカシア木製の丸皿竹製 楕円プレート.mp4',
  'materials/キャロット＆チーズケーキタルト（グルテンフリー）🥕 にんじんの自然な甘さとチーズのコクがとけあう、やさしいおやつ アーモンド＆米粉のクラストで、香ばし.mp4',
  'materials/調味料選手権PR動画3.mp4',
  'materials/🧅✨タマネギぐるりこレシピ✨🧅今回は、「オリジナル フレークタイプ」と「香味しょうゆ フレークタイプ」のおすすめ活用方法をご紹介します🔸オリジナル ①か.mp4',
  'materials/videoplayback.mp4'
];

test('metadata and required page sections exist', () => {
  assert.ok(html.includes('<title>Short Video Portfolio | HIROKO SASAKI</title>'));
  assert.ok(html.includes('name="description" content="SNS・TikTok・Instagram Reelsを中心としたショート動画制作ポートフォリオ。企画・構成・撮影・編集・SNSコンテンツ制作。"'));
  assert.equal(html.includes('rel="canonical"'), false);
  assert.equal(html.includes('property="og:url"'), false);
  for (const id of ['works', 'pet-content', 'client-work', 'capabilities', 'tools', 'contact']) {
    assert.ok(html.includes('id="' + id + '"'));
  }
});

test('all approved videos use safe native player attributes', () => {
  for (const source of sources) {
    assert.equal(existsSync(new URL('../' + source, import.meta.url)), true);
    assert.ok(html.includes('src="' + source + '"'));
  }
  const players = html.match(/<video\b[^>]*>/g) || [];
  assert.equal(players.length, 6);
  for (const player of players) {
    assert.match(player, /\bcontrols\b/);
    assert.match(player, /\bplaysinline\b/);
    assert.doesNotMatch(player, /\bautoplay\b|\bmuted\b/);
  }
});

test('provided copy, supplied Instagram links, and no contact collection exist', () => {
  for (const phrase of ['HIROKO SASAKI', '企画から、撮影・編集・投稿まで。', 'PET CONTENT', 'CLIENT WORK', 'WHAT I CAN DO', 'TOOLS', 'CONTACT', '説明要確認']) {
    assert.ok(html.includes(phrase));
  }
  for (const id of ['DPTT-sBk90f', 'DXjTuExCghM', 'DMhd0-hTy1y', 'DNXiM93xoNe']) {
    assert.ok(html.includes(id));
  }
  assert.doesNotMatch(html, /<form[\s>]|mailto:|tel:/);
});

test('responsive and exclusive-playback affordances exist', () => {
  assert.ok(css.includes('@media (max-width: 640px)'));
  assert.ok(css.includes('prefers-reduced-motion'));
  assert.ok(css.includes(':focus-visible'));
  assert.ok(js.includes(\"document.querySelectorAll('video')\"));
  assert.ok(js.includes(\"video.addEventListener('play'\"));
  assert.ok(js.includes('otherVideo.pause()'));
});
~~~

- [ ] **Step 3: Verify the failure**

Run: npm test

Expected: FAIL because the three starter files are placeholders.

- [ ] **Step 4: Commit the test harness**

~~~sh
git add package.json tests/site-contract.test.mjs
git commit -m "test: add portfolio content contract"
~~~

### Task 2: Build the semantic page and unchanged video references

**Files:**

- Modify: index.html
- Test: tests/site-contract.test.mjs

**Interfaces:**

- Consumes: the six exact source paths in sources.
- Produces: sections named works, pet-content, client-work, capabilities, tools, and contact; six native video tags.

- [ ] **Step 1: Re-run only the page-content checks**

Run: npm test -- --test-name-pattern='metadata|videos|copy'

Expected: FAIL against the starter document.

- [ ] **Step 2: Replace the HTML placeholder**

Write a Japanese-language semantic page with this document head:

~~~html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Short Video Portfolio | HIROKO SASAKI</title>
<meta name="description" content="SNS・TikTok・Instagram Reelsを中心としたショート動画制作ポートフォリオ。企画・構成・撮影・編集・SNSコンテンツ制作。">
<meta property="og:type" content="website">
<meta property="og:locale" content="ja_JP">
<meta property="og:title" content="Short Video Portfolio | HIROKO SASAKI">
<meta property="og:description" content="SNS・TikTok・Instagram Reelsを中心としたショート動画制作ポートフォリオ。企画・構成・撮影・編集・SNSコンテンツ制作。">
<link rel="stylesheet" href="assets/css/style.css">
~~~

Make header navigation point to section IDs. The hero has SHORT VIDEO PORTFOLIO, HIROKO SASAKI, supplied hero copy, and supplied capability labels. Put five selected works in SHORT VIDEO WORKS and videoplayback.mp4 in OTHER WORK. Use this exact player pattern for every asset, replacing SOURCE_PATH with the exact matching path from sources:

~~~html
<video controls playsinline preload="metadata">
  <source src="SOURCE_PATH" type="video/mp4">
  お使いのブラウザは動画の再生に対応していません。
</video>
~~~

Under every player, show CATEGORY, a filename-supported title, and exactly these unverified fields: 担当範囲：説明要確認, 使用ツール：説明要確認, 制作ポイント：説明要確認. Do not state a client, brand, performance metric, or inferred role. Add the brief's PET CONTENT text verbatim and use only generic, permitted responsibilities in CLIENT WORK. Include the five brief-specified tools, the four supplied Instagram URLs, and the contact invitation sentence only. Add target="_blank" rel="noreferrer" to external Instagram links and do not add form, mailto, or tel markup.

- [ ] **Step 3: Verify the content contract passes**

Run: npm test -- --test-name-pattern='metadata|videos|copy'

Expected: PASS for the three selected tests.

- [ ] **Step 4: Check semantic structure in a browser**

Run: npx --yes serve . -l 4173

Open http://localhost:4173 and verify a skip link, one h1, meaningful section headings, no contact form, visible video controls, and working external link destinations.

- [ ] **Step 5: Commit the page**

~~~sh
git add index.html
git commit -m "feat: add portfolio content and video players"
~~~

### Task 3: Add the responsive editorial visual system

**Files:**

- Modify: assets/css/style.css
- Test: tests/site-contract.test.mjs

**Interfaces:**

- Consumes: classes site-header, hero, works-grid, work-card, video-frame, section-heading, capability-list, tool-list, and contact-panel from index.html.
- Produces: desktop three-column, tablet two-column, and mobile one-column presentation.

- [ ] **Step 1: Run the responsive-contract check**

Run: npm test -- --test-name-pattern='responsive'

Expected: FAIL because the starter CSS has no responsive or accessibility rules.

- [ ] **Step 2: Implement tokens, layout, and responsive behavior**

Add these essential rules, then style the interface classes above:

~~~css
:root {
  --paper: #f8f8f6;
  --surface: #ffffff;
  --ink: #172033;
  --muted: #5f6877;
  --line: #dfe3e8;
  --accent: #243e68;
  --content-width: 1200px;
}
* { box-sizing: border-box; }
body { margin: 0; background: var(--paper); color: var(--ink); font-family: Inter, "Hiragino Sans", "Yu Gothic", sans-serif; line-height: 1.65; }
.video-frame video { display: block; width: 100%; height: auto; background: #10151f; }
.works-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 2rem; }
:focus-visible { outline: 3px solid var(--accent); outline-offset: 4px; }
@media (max-width: 900px) { .works-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 640px) { .works-grid { grid-template-columns: 1fr; gap: 1.5rem; } }
@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; } }
~~~

Use generous space, plain borders, and clean type hierarchy. Do not crop video. Let horizontal video span a fitting number of grid columns at desktop and use a single column at 640px.

- [ ] **Step 3: Verify the responsive-contract check passes**

Run: npm test -- --test-name-pattern='responsive'

Expected: PASS.

- [ ] **Step 4: Inspect visual layouts**

At 1440px and 390px widths, confirm no horizontal overflow, natural ratios, readable labels, usable controls, visible focus, and a single-column work grid on mobile.

- [ ] **Step 5: Commit the styling**

~~~sh
git add assets/css/style.css
git commit -m "feat: style responsive video portfolio"
~~~

### Task 4: Add exclusive playback and perform final local QA

**Files:**

- Modify: assets/js/main.js
- Test: tests/site-contract.test.mjs

**Interfaces:**

- Consumes: all six native video elements.
- Produces: play-event handling that pauses each non-active player.

- [ ] **Step 1: Run the JavaScript-contract check**

Run: npm test -- --test-name-pattern='exclusive'

Expected: FAIL because the starter JavaScript has no event handler.

- [ ] **Step 2: Add the minimal enhancement**

Replace assets/js/main.js with:

~~~js
const videos = document.querySelectorAll('video');

videos.forEach((video) => {
  video.addEventListener('play', () => {
    videos.forEach((otherVideo) => {
      if (otherVideo !== video && !otherVideo.paused) {
        otherVideo.pause();
      }
    });
  });
});
~~~

- [ ] **Step 3: Run the complete contract suite**

Run: npm test

Expected: PASS with four tests.

- [ ] **Step 4: Check playback and links in the browser**

At desktop and 390px widths, play two videos in sequence and confirm the first pauses when the second starts. Verify no player starts on load, each of six files loads, each Instagram link opens the supplied destination, and no contact detail or form is present.

- [ ] **Step 5: Check final changes and commit**

Run:

~~~sh
git diff --check
git status --short
git add assets/js/main.js
git commit -m "feat: pause other videos on playback"
git status --short
~~~

Expected: no whitespace errors and a clean working tree except any deliberately untracked source assets.

### Task 5: Create and publish the GitHub repository

**Files:**

- Modify: Git remote configuration only

**Interfaces:**

- Consumes: verified main branch and supplied materials directory.
- Produces: origin at https://github.com/sasahiro-web/short-video-portfolio.git and a GitHub Pages deployment from main root.

- [ ] **Step 1: Confirm GitHub limits and final state**

Run:

~~~sh
git status --short
du -h materials/*.mp4
git log --oneline -1
~~~

Expected: each video is smaller than 100 MB and the site is verified locally.

- [ ] **Step 2: Create or connect the requested repository**

Run:

~~~sh
gh repo view sasahiro-web/short-video-portfolio >/dev/null 2>&1 || gh repo create sasahiro-web/short-video-portfolio --public --source=. --remote=origin
git remote get-url origin || git remote add origin https://github.com/sasahiro-web/short-video-portfolio.git
~~~

Expected: origin resolves to https://github.com/sasahiro-web/short-video-portfolio.git.

- [ ] **Step 3: Push main**

Run: git push -u origin main

Expected: all source files and unchanged materials are on the remote.

- [ ] **Step 4: Enable GitHub Pages**

Run:

~~~sh
gh api --method POST repos/sasahiro-web/short-video-portfolio/pages -f 'source[branch]=main' -f 'source[path]=/' || true
gh api repos/sasahiro-web/short-video-portfolio/pages --jq .html_url
~~~

Expected: the returned deployment URL is https://sasahiro-web.github.io/short-video-portfolio/.

- [ ] **Step 5: Verify deployment**

Open the returned URL and check title/description, six playable videos, mobile layout, the four Instagram links, no contact form, and absence of canonical and og:url metadata.
