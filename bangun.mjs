// Bangun Buat CV Generator: src/ -> dist/ (file statis siap disalin ke server mana pun).
//   npm ci && npm run build
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { transform } from 'esbuild';

const require = createRequire(import.meta.url);
const HERE = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(HERE, 'src'), DIST = path.join(HERE, 'dist');

fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(path.join(DIST, 'vendor'), { recursive: true });

const js = await transform(fs.readFileSync(path.join(SRC, 'app.js'), 'utf8'), { loader: 'js', minify: true, target: 'es2020' });
fs.writeFileSync(path.join(DIST, 'app.js'), js.code);
const css = await transform(fs.readFileSync(path.join(SRC, 'style.css'), 'utf8'), { loader: 'css', minify: true });
fs.writeFileSync(path.join(DIST, 'style.css'), css.code);

const html = fs.readFileSync(path.join(SRC, 'index.html'), 'utf8')
  .replace(/\n\s+/g, '\n').replace(/>\n</g, '><');
fs.writeFileSync(path.join(DIST, 'index.html'), html);

const h2c = require.resolve('html2canvas/dist/html2canvas.min.js');
fs.copyFileSync(h2c, path.join(DIST, 'vendor', 'html2canvas.min.js'));
fs.copyFileSync(path.join(path.dirname(h2c), '..', 'LICENSE'), path.join(DIST, 'vendor', 'html2canvas.LICENSE.txt'));

for (const f of fs.readdirSync(DIST, { recursive: true })) {
  const p = path.join(DIST, f);
  if (fs.statSync(p).isFile()) console.log(String(fs.statSync(p).size).padStart(8), 'dist/' + f);
}
