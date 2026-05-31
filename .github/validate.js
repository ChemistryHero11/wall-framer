// Lightweight pre-deploy check for the single-file app — no dependencies.
// Confirms structure, that the inline <script> parses (catches a broken edit),
// and that the social/app images are present. Exits non-zero on any failure.
const fs = require('fs');
const vm = require('vm');

const html = fs.readFileSync('index.html', 'utf8');
let ok = true;
const check = (cond, msg) => { console.log((cond ? '✓' : '✗') + ' ' + msg); if (!cond) ok = false; };

check(/^<!DOCTYPE html>/i.test(html.trim()), 'has <!DOCTYPE html>');
check(/<title>[^<]+<\/title>/.test(html), 'has a non-empty <title>');
check((html.match(/<script/g) || []).length === (html.match(/<\/script>/g) || []).length, '<script> tags balanced');
check((html.match(/<style/g) || []).length === (html.match(/<\/style>/g) || []).length, '<style> tags balanced');

const m = html.match(/<script>([\s\S]*?)<\/script>/);
if (m) {
  try { new vm.Script(m[1]); check(true, 'inline JS parses (syntax OK)'); }
  catch (e) { check(false, 'inline JS parses: ' + e.message); }
} else {
  check(false, 'found an inline <script> block');
}

check(fs.existsSync('og.png'), 'social-preview image og.png present');
check(fs.existsSync('icon-180.png'), 'app icon icon-180.png present');
check(!/\sinnerHTML\s*=/.test(html), 'no innerHTML assignment (XSS hygiene)');

console.log(ok ? '\nAll checks passed.' : '\nValidation FAILED.');
process.exit(ok ? 0 : 1);
