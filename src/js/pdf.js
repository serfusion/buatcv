/* Penulis PDF kecil buatan sendiri.
   Tiap halaman = gambar JPEG halaman CV + lapisan teks tak terlihat (render mode 3) di posisi yang sama,
   sehingga PDF tampak persis seperti pratinjau tetapi teksnya tetap bisa dicari, disalin, dan dibaca ATS.
   Teks memakai font "tanpa glyph" (Type0 / Identity-H) + ToUnicode, jadi semua aksara BMP (Latin, CJK, Thai, Devanagari) aman.
   Tautan (mailto:, tel:, https:) dijadikan anotasi Link. */
import { GLYPHLESS_TTF, C2G_FLATE } from './pdf-aset.js';

const PT_W = 595.28, PT_H = 841.89;
const enc = new TextEncoder();
const b64 = s => Uint8Array.from(atob(s), c => c.charCodeAt(0));
const angka = n => (Math.round(n * 100) / 100).toString();

function hexUtf16(s) {
  let h = '';
  for (const ch of s) {
    const c = ch.codePointAt(0);
    if (c > 0xffff || (c >= 0xd800 && c <= 0xdfff)) continue;   // di luar BMP (emoji) dilewati
    h += c.toString(16).padStart(4, '0');
  }
  return h;
}
const teksInfo = s => '<feff' + hexUtf16(String(s || '')) + '>';
const strPdf = s => '(' + String(s).replace(/[\\()]/g, m => '\\' + m).replace(/[^\x20-\x7e]/g, c => encodeURIComponent(c)) + ')';

/* ToUnicode: CID = kode UTF-16 (BMP), dipetakan ke dirinya sendiri, per blok 256 */
function toUnicode() {
  const r = [];
  for (let hi = 0; hi < 256; hi++) {
    if (hi >= 0xd8 && hi <= 0xdf) continue;
    const h = hi.toString(16).padStart(2, '0');
    r.push(`<${h}00> <${h}ff> <${h}00>`);
  }
  const blok = [];
  for (let i = 0; i < r.length; i += 100) blok.push(`${Math.min(100, r.length - i)} beginbfrange\n${r.slice(i, i + 100).join('\n')}\nendbfrange`);
  return `/CIDInit /ProcSet findresource begin\n12 dict begin\nbegincmap\n/CIDSystemInfo << /Registry (Adobe) /Ordering (UCS) /Supplement 0 >> def\n/CMapName /Adobe-Identity-UCS def\n/CMapType 2 def\n1 begincodespacerange\n<0000> <ffff>\nendcodespacerange\n${blok.join('\n')}\nendcmap\nCMapName currentdict /CMap defineresource pop\nend\nend`;
}

/* Kumpulkan teks yang tampak dalam satu halaman (koordinat px relatif halaman). */
export function kumpulkanTeks(halaman) {
  const box = halaman.getBoundingClientRect(), hasil = [];
  const jalan = document.createTreeWalker(halaman, NodeFilter.SHOW_TEXT);
  const r = document.createRange();
  for (let n = jalan.nextNode(); n; n = jalan.nextNode()) {
    const s = n.nodeValue;
    if (!s.trim()) continue;
    const el = n.parentElement, cs = getComputedStyle(el);
    if (cs.visibility === 'hidden' || cs.display === 'none') continue;
    const fs = parseFloat(cs.fontSize) || 12;
    const upper = cs.textTransform === 'uppercase';
    let run = null;
    for (const mt of s.matchAll(/\S+/g)) {
      r.setStart(n, mt.index); r.setEnd(n, mt.index + mt[0].length);
      const q = r.getClientRects()[0];
      if (!q || !q.width) continue;
      const kata = upper ? mt[0].toUpperCase() : mt[0];
      const x = q.left - box.left, y = q.top - box.top;
      if (run && Math.abs(run.y - y) < 2 && x >= run.x2 - 1) { run.t += ' ' + kata; run.x2 = x + q.width; run.h = Math.max(run.h, q.height); }
      else { if (run) hasil.push(run); run = { t: kata, x, y, x2: x + q.width, h: q.height, fs }; }
    }
    if (run) hasil.push(run);
  }
  return hasil;
}
export function kumpulkanTautan(halaman) {
  const box = halaman.getBoundingClientRect();
  return [...halaman.querySelectorAll('a[href]')].flatMap(a => {
    const href = a.getAttribute('href');
    if (!/^(https?:|mailto:|tel:)/i.test(href)) return [];
    return [...a.getClientRects()].map(q => ({ href, x: q.left - box.left, y: q.top - box.top, w: q.width, h: q.height }));
  });
}

/* halaman: [{ jpeg: Uint8Array, iw, ih, teks: [...], tautan: [...] }], lebar/tinggi px halaman; meta: {judul, penulis, subjek, kata} */
export function buatPdf(halaman, pxW, pxH, meta = {}) {
  const k = PT_W / pxW, ky = PT_H / pxH;
  const bagian = [], ofs = [];
  let pos = 0;
  const tulis = x => { const u = typeof x === 'string' ? enc.encode(x) : x; bagian.push(u); pos += u.length; };
  const objek = [];   // isi tiap objek ditulis berurutan
  const baru = () => { objek.push(null); return objek.length; };
  const set = (id, kepala, stream) => { objek[id - 1] = { kepala, stream }; };

  const idKatalog = baru(), idPages = baru(), idFont = baru(), idCid = baru(), idDesk = baru(), idFile = baru(), idC2g = baru(), idTu = baru(), idInfo = baru();
  const ttf = b64(GLYPHLESS_TTF), c2g = b64(C2G_FLATE), tu = enc.encode(toUnicode());
  set(idFont, `<< /Type /Font /Subtype /Type0 /BaseFont /GlyphLessFont /Encoding /Identity-H /DescendantFonts [${idCid} 0 R] /ToUnicode ${idTu} 0 R >>`);
  set(idCid, `<< /Type /Font /Subtype /CIDFontType2 /BaseFont /GlyphLessFont /CIDSystemInfo << /Registry (Adobe) /Ordering (Identity) /Supplement 0 >> /FontDescriptor ${idDesk} 0 R /DW 500 /CIDToGIDMap ${idC2g} 0 R >>`);
  set(idDesk, `<< /Type /FontDescriptor /FontName /GlyphLessFont /Flags 5 /FontBBox [0 0 500 1000] /ItalicAngle 0 /Ascent 1000 /Descent 0 /CapHeight 1000 /StemV 80 /FontFile2 ${idFile} 0 R >>`);
  set(idFile, `<< /Length ${ttf.length} /Length1 ${ttf.length} >>`, ttf);
  set(idC2g, `<< /Length ${c2g.length} /Filter /FlateDecode >>`, c2g);
  set(idTu, `<< /Length ${tu.length} >>`, tu);
  set(idInfo, `<< /Title ${teksInfo(meta.judul)} /Author ${teksInfo(meta.penulis)} /Subject ${teksInfo(meta.subjek)} /Keywords ${teksInfo(meta.kata)} /Creator ${teksInfo('Curriculum Vitae · superfal-dev.com')} /Producer ${teksInfo('superfal-dev.com')} >>`);

  const kids = [];
  for (const h of halaman) {
    const idPage = baru(), idIsi = baru(), idImg = baru();
    kids.push(idPage);
    const annot = h.tautan.map(t => {
      const id = baru();
      const x1 = t.x * k, y1 = PT_H - (t.y + t.h) * ky, x2 = (t.x + t.w) * k, y2 = PT_H - t.y * ky;
      set(id, `<< /Type /Annot /Subtype /Link /Rect [${angka(x1)} ${angka(y1)} ${angka(x2)} ${angka(y2)}] /Border [0 0 0] /A << /S /URI /URI ${strPdf(t.href)} >> >>`);
      return `${id} 0 R`;
    });
    let isi = `q ${angka(PT_W)} 0 0 ${angka(PT_H)} 0 0 cm /Im1 Do Q\nBT 3 Tr\n`;
    for (const t of h.teks) {
      const hex = hexUtf16(t.t);
      if (!hex) continue;
      const n = hex.length / 4, fs = t.fs * k, lebar = (t.x2 - t.x) * k;
      const tz = Math.max(1, Math.min(1000, (lebar / (n * fs * 0.5)) * 100));
      const base = PT_H - (t.y + t.h * 0.8) * ky;
      isi += `/F1 ${angka(fs)} Tf ${angka(tz)} Tz 1 0 0 1 ${angka(t.x * k)} ${angka(base)} Tm <${hex}> Tj\n`;
    }
    isi += 'ET';
    const isiB = enc.encode(isi);
    set(idIsi, `<< /Length ${isiB.length} >>`, isiB);
    set(idImg, `<< /Type /XObject /Subtype /Image /Width ${h.iw} /Height ${h.ih} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${h.jpeg.length} >>`, h.jpeg);
    set(idPage, `<< /Type /Page /Parent ${idPages} 0 R /MediaBox [0 0 ${angka(PT_W)} ${angka(PT_H)}] /Resources << /XObject << /Im1 ${idImg} 0 R >> /Font << /F1 ${idFont} 0 R >> >> /Contents ${idIsi} 0 R${annot.length ? ` /Annots [${annot.join(' ')}]` : ''} >>`);
  }
  set(idPages, `<< /Type /Pages /Kids [${kids.map(x => `${x} 0 R`).join(' ')}] /Count ${kids.length} >>`);
  set(idKatalog, `<< /Type /Catalog /Pages ${idPages} 0 R >>`);

  tulis('%PDF-1.4\n%\xe2\xe3\xcf\xd3\n');
  objek.forEach((o, i) => {
    ofs[i] = pos;
    tulis(`${i + 1} 0 obj\n${o.kepala}\n`);
    if (o.stream) { tulis('stream\n'); tulis(o.stream); tulis('\nendstream\n'); }
    tulis('endobj\n');
  });
  const xref = pos;
  tulis(`xref\n0 ${objek.length + 1}\n0000000000 65535 f \n${ofs.map(o => String(o).padStart(10, '0') + ' 00000 n \n').join('')}`);
  tulis(`trailer\n<< /Size ${objek.length + 1} /Root ${idKatalog} 0 R /Info ${idInfo} 0 R >>\nstartxref\n${xref}\n%%EOF\n`);
  return new Blob(bagian, { type: 'application/pdf' });
}
