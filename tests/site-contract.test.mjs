import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const css = readFileSync(new URL('../assets/css/style.css', import.meta.url), 'utf8');
const js = readFileSync(new URL('../assets/js/main.js', import.meta.url), 'utf8');

const sources = [
  'materials/〜Joeyとおうちカフェ🏡☕🍪🥤〜混ぜるだけの簡単ココナッツスコーンをJoeyと一緒に！？焼きました🍪焼き立てに『BROWN SUGAR 1ST（@bs1st）』のオーガニックココナッ.mp4',
  'materials/〜「うちのコ♡プレート」シリーズにNewアイテム登場✨️〜『For Two Café』の「うちのコ♡」グッズに新しい仲間が加わりました15cmのアカシア木製の丸皿竹製 楕円プレート.mp4',
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

  for (const id of ['works', 'pet-content', 'client-work', 'capabilities', 'tools']) {
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
  for (const phrase of ['HIROKO SASAKI', '企画から、撮影・編集・投稿まで。', 'PET CONTENT', 'CLIENT WORK', 'WHAT I CAN DO', 'TOOLS']) {
    assert.ok(html.includes(phrase));
  }

  assert.doesNotMatch(html, /<form[\s>]|mailto:|tel:/);
});

test('work descriptions reflect the supplied recording and contain no placeholders', () => {
  for (const phrase of [
    '企画・素材準備・撮影・編集',
    'SONY α7、Premiere Pro',
    'DJI Osmo、Premiere Pro',
    'ココナッツバターの活かし方が分かるレシピ',
    '家庭の暮らしになじむ様子をVlog風に撮影',
    'ワンコと一緒に食べられるおやつの工程',
    'たまねぎぐるりこの魅力と使いやすさ',
    'レシピパートの企画・撮影、その他素材の編集',
    '調味料選手権に向け、商品の魅力と会社の思い',
    '乾燥野菜を家庭で使いやすく、食べやすいレシピに'
  ]) {
    assert.ok(html.includes(phrase));
  }
  assert.equal(html.includes('説明要確認'), false);
});

test('work copy uses the requested portfolio terminology', () => {
  for (const phrase of [
    '愛犬とおうちカフェ｜ココナッツスコーン',
    '愛犬と作って食べる楽しさを表現。',
    'SONY α7、Premiere Pro',
    'たまねぎぐるりこレシピ',
    'たまねぎぐるりこの魅力と使いやすさ'
  ]) {
    assert.ok(html.includes(phrase));
  }
  assert.equal(html.includes('Joeyとおうちカフェ｜'), false);
  assert.equal(html.includes('SONYカメラ'), false);
});

test('removes unrequested contact, Instagram, ChatGPT, and pet-work link surfaces', () => {
  for (const phrase of ['id="contact"', 'INSTAGRAM', 'instagram.com/', 'ChatGPT', 'Joeyとおうちカフェの作品を見る']) {
    assert.equal(html.includes(phrase), false);
  }
});

test('client work communicates approved corporate production scope without naming clients', () => {
  for (const phrase of [
    '上場企業・大手企業を含むクライアントのSNS／ショート動画制作案件に携わっています。',
    '短い時間の中で何を伝え、どのような行動につなげるか',
    '要件整理、制作指示、進行管理、フィードバック対応などのディレクション業務にも携わっています。',
    'PLANNING', 'SCRIPT', 'DIRECTION', 'EDITING', 'QUALITY CONTROL', 'OPERATION', 'ANALYSIS',
    '企業名および実際の制作物は掲載していません。'
  ]) {
    assert.ok(html.includes(phrase));
  }
  assert.ok(css.includes('.client-roles'));
  assert.ok(css.includes('.confidentiality-note'));
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
  assert.equal(sectionLabels.length, 1);
  assert.ok((html.match(/page-section--compact/g) || []).length >= 1);
  assert.ok(css.includes('.page-section--compact'));
});

test('works group portrait and landscape videos without an additional-work section', () => {
  assert.equal((html.match(/class="work-card work-card--portrait"/g) || []).length, 4);
  assert.equal((html.match(/class="work-card work-card--landscape"/g) || []).length, 2);
  assert.match(html, /class="portrait-grid"[\s\S]*class="landscape-grid"/);
  assert.doesNotMatch(html, /OTHER WORK|Additional work/);
  assert.ok(css.includes('.portrait-grid'));
  assert.ok(css.includes('.landscape-grid'));
});
