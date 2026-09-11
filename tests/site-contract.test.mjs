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
  assert.ok(js.includes("document.querySelectorAll('video')"));
  assert.ok(js.includes("video.addEventListener('play'"));
  assert.ok(js.includes('otherVideo.pause()'));
});

test('secondary sections keep an intentional visual rhythm', () => {
  const sectionLabels = html.match(/class="section-index"/g) || [];
  assert.equal(sectionLabels.length, 2);
  assert.ok((html.match(/page-section--compact/g) || []).length >= 3);
  assert.ok(css.includes('.page-section--compact'));
});
