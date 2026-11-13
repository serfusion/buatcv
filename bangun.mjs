// Bangun Curriculum Vitae: src/ -> dist/ (file statis siap disalin ke server mana pun).
//   npm ci && npm run build
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import crypto from 'node:crypto';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { build, transform } from 'esbuild';

const require = createRequire(import.meta.url);
const HERE = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(HERE, 'src'), DIST = path.join(HERE, 'dist');

// 1. aset PDF: font tanpa glyph + peta CID->GID (semua CID ke glyph 1), dikompres
const ttf = fs.readFileSync(path.join(SRC, 'aset', 'glyphless.ttf'));
const c2g = Buffer.alloc(65536 * 2); for (let i = 0; i < 65536; i++) c2g.writeUInt16BE(1, i * 2);
fs.writeFileSync(path.join(SRC, 'js', 'pdf-aset.js'),
  '// Dibuat otomatis oleh bangun.mjs (jangan diubah).\n'
  + `export const GLYPHLESS_TTF = '${ttf.toString('base64')}';\n`
  + `export const C2G_FLATE = '${zlib.deflateSync(c2g, { level: 9 }).toString('base64')}';\n`);

fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(path.join(DIST, 'vendor'), { recursive: true });
fs.mkdirSync(path.join(DIST, 'fonts'), { recursive: true });

// 2. huruf (Fontsource, lisensi SIL OFL): hanya woff2 subset latin, latin-ext, vietnamese
const HURUF = ['inter', 'roboto', 'open-sans', 'lato', 'poppins', 'montserrat', 'nunito', 'raleway', 'rubik', 'fira-sans', 'quicksand', 'outfit',
  'dm-sans', 'plus-jakarta-sans', 'playfair-display', 'lora', 'merriweather', 'source-serif-4', 'jetbrains-mono', 'caveat'];
const SUBSET = /-(latin|latin-ext|vietnamese)-\d+-normal\.woff2$/;
let fontsCss = '/* Huruf dari Fontsource (SIL Open Font License 1.1) */\n';
for (const h of HURUF) {
  const dir = path.dirname(require.resolve(`@fontsource/${h}/package.json`));
  for (const w of [400, 600, 700]) {
    const css = path.join(dir, `${w}.css`);
    if (!fs.existsSync(css)) continue;
    for (const blok of fs.readFileSync(css, 'utf8').match(/@font-face\s*{[^}]+}/g) || []) {
      const file = (blok.match(/url\(\.\/files\/([^)]+\.woff2)\)/) || [])[1];
      if (!file || !SUBSET.test(file)) continue;
      fs.copyFileSync(path.join(dir, 'files', file), path.join(DIST, 'fonts', file));
      fontsCss += blok.replace(/src:[^;]+;/, `src:url(fonts/${file}) format('woff2');`).replace(/\s+/g, ' ') + '\n';
    }
  }
  const lis = ['LICENSE', 'LICENSE.md', 'OFL.txt'].map(f => path.join(dir, f)).find(f => fs.existsSync(f));
  if (lis) fs.copyFileSync(lis, path.join(DIST, 'fonts', `${h}.LICENSE.txt`));
}
fs.writeFileSync(path.join(DIST, 'fonts.css'), fontsCss);

// 3. JS (dibundel) dan CSS
await build({ entryPoints: [path.join(SRC, 'js', 'main.js')], bundle: true, minify: true, format: 'iife', target: 'es2020', outfile: path.join(DIST, 'app.js'), legalComments: 'none' });
for (const f of ['style.css', 'cv.css']) {
  const css = await transform(fs.readFileSync(path.join(SRC, f), 'utf8'), { loader: 'css', minify: true });
  fs.writeFileSync(path.join(DIST, f), css.code);
}

// 4. html2canvas (MIT)
const h2c = require.resolve('html2canvas/dist/html2canvas.min.js');
fs.copyFileSync(h2c, path.join(DIST, 'vendor', 'html2canvas.min.js'));
fs.copyFileSync(path.join(path.dirname(h2c), '..', 'LICENSE'), path.join(DIST, 'vendor', 'html2canvas.LICENSE.txt'));

// 5. HTML: spasi antar-tag dirapikan, dan setiap CSS/JS diberi ?v=<sidik isi> (cache-busting).
//    Server mengirim CSS/JS dengan cache 4 jam; tanpa ini browser bisa memakai CSS/JS lama dengan HTML baru.
const sidik = f => crypto.createHash('sha256').update(fs.readFileSync(path.join(DIST, f))).digest('hex').slice(0, 10);
let html = fs.readFileSync(path.join(SRC, 'index.html'), 'utf8').replace(/\n\s+</g, '\n<');
html = html.replace(/(href|src)="((?:vendor\/)?[\w.-]+\.(?:css|js))"/g, (m, attr, f) => {
  if (!fs.existsSync(path.join(DIST, f))) throw new Error('aset tidak ada: ' + f);
  return `${attr}="${f}?v=${sidik(f)}"`;
});
fs.writeFileSync(path.join(DIST, 'index.html'), html);

let total = 0, n = 0;
for (const f of fs.readdirSync(DIST, { recursive: true })) { const s = fs.statSync(path.join(DIST, f)); if (s.isFile()) { total += s.size; n++; } }
console.log(`dist/: ${n} file, ${(total / 1024).toFixed(0)} KB`);
