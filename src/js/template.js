/* Template CV, penyusun isi, dan pemecah halaman A4 (794 × 1122 px). */
import { judulUntuk, formatLahir } from './teks.js';

export const W = 794, H = 1122;

const FALLBACK_SANS = 'system-ui, -apple-system, "Segoe UI", Roboto, "Noto Sans", "Noto Sans Thai", "Noto Sans Devanagari", "PingFang SC", "Hiragino Sans", "Microsoft YaHei", "Malgun Gothic", sans-serif';
const FALLBACK_SERIF = 'Georgia, "Times New Roman", "Noto Serif", "Songti SC", "SimSun", serif';
export const FONT = {
  sistem: ['Bawaan sistem', FALLBACK_SANS],
  inter: ['Inter', `"Inter", ${FALLBACK_SANS}`],
  roboto: ['Roboto', `"Roboto", ${FALLBACK_SANS}`],
  opensans: ['Open Sans', `"Open Sans", ${FALLBACK_SANS}`],
  lato: ['Lato', `"Lato", ${FALLBACK_SANS}`],
  poppins: ['Poppins', `"Poppins", ${FALLBACK_SANS}`],
  montserrat: ['Montserrat', `"Montserrat", ${FALLBACK_SANS}`],
  nunito: ['Nunito', `"Nunito", ${FALLBACK_SANS}`],
  raleway: ['Raleway', `"Raleway", ${FALLBACK_SANS}`],
  rubik: ['Rubik', `"Rubik", ${FALLBACK_SANS}`],
  firasans: ['Fira Sans', `"Fira Sans", ${FALLBACK_SANS}`],
  quicksand: ['Quicksand', `"Quicksand", ${FALLBACK_SANS}`],
  outfit: ['Outfit', `"Outfit", ${FALLBACK_SANS}`],
  dmsans: ['DM Sans', `"DM Sans", ${FALLBACK_SANS}`],
  jakarta: ['Plus Jakarta Sans', `"Plus Jakarta Sans", ${FALLBACK_SANS}`],
  playfair: ['Playfair Display', `"Playfair Display", ${FALLBACK_SERIF}`],
  lora: ['Lora', `"Lora", ${FALLBACK_SERIF}`],
  merriweather: ['Merriweather', `"Merriweather", ${FALLBACK_SERIF}`],
  sourceserif: ['Source Serif 4', `"Source Serif 4", ${FALLBACK_SERIF}`],
  jetbrains: ['JetBrains Mono', `"JetBrains Mono", ui-monospace, Menlo, Consolas, monospace`],
  caveat: ['Caveat', `"Caveat", ${FALLBACK_SANS}`],
};

/* [id, nama, kategori, kolom (satu|kiri|kanan), kepala (atas|utama|sisi), foto (bulat|kotak|lengkung|''), huruf, huruf judul, warna, gaya] */
const DEF = [
  ['modern', 'Modern', 'formal warna', 'kiri', 'sisi', 'bulat', 'inter', '', '#2c5282', 'sd-gelap jd-garis rk-kotak rj0'],
  ['klasik', 'Klasik', 'formal', 'satu', 'atas', 'kotak', 'sourceserif', '', '#1f2937', 'kp-tengah kp-bawah jd-tengah cp-teks'],
  ['minimal', 'Minimal', 'formal', 'satu', 'atas', 'bulat', 'dmsans', '', '#0f766e', 'jd-polos en-tglkiri cp-kotak'],
  ['korporat', 'Korporat', 'formal warna', 'satu', 'atas', 'bulat', 'roboto', '', '#1e40af', 'kp-band jd-ekor'],
  ['samudra', 'Samudra', 'warna', 'kiri', 'utama', 'bulat', 'opensans', '', '#0e7490', 'sd-aksen jd-garis'],
  ['eksekutif', 'Eksekutif', 'formal', 'satu', 'atas', 'kotak', 'lato', 'playfair', '#a16207', 'kp-gelap jd-bar'],
  ['tajam', 'Tajam', 'formal', 'satu', 'atas', 'kotak', 'montserrat', '', '#111827', 'kp-bawah kp-besar jd-pil cp-kotak'],
  ['anggun', 'Anggun', 'kreatif', 'satu', 'atas', 'bulat', 'lora', '', '#9f1239', 'dk-bingkai jd-kk'],
  ['malam', 'Malam', 'gelap', 'kiri', 'utama', 'bulat', 'inter', '', '#38bdf8', 'lt-gelap sd-hitam jd-garis'],
  ['linimasa', 'Linimasa', 'kreatif warna', 'satu', 'atas', 'bulat', 'poppins', '', '#7c3aed', 'kp-garis en-linimasa jd-polos'],
  ['ringkas', 'Ringkas', 'formal', 'kanan', 'atas', 'kotak', 'firasans', '', '#334155', 'kp-muda kp-split sd-abu jd-garis'],
  ['daun', 'Daun', 'warna kreatif', 'kiri', 'sisi', 'bulat', 'nunito', '', '#4d7c0f', 'lt-krem sd-muda jd-ekor'],
  ['tebal', 'Tebal', 'kreatif warna', 'satu', 'atas', 'kotak', 'outfit', '', '#dc2626', 'kp-band kp-besar jd-pil'],
  ['nordik', 'Nordik', 'formal', 'satu', 'atas', 'bulat', 'quicksand', '', '#475569', 'lt-krem jd-ekor cp-kotak'],
  ['terbelah', 'Terbelah', 'warna', 'kanan', 'atas', 'bulat', 'rubik', '', '#0369a1', 'kp-gelap kp-split sd-muda jd-garis'],
  ['cetakbiru', 'Cetak Biru', 'gelap kreatif', 'satu', 'atas', 'kotak', 'jetbrains', '', '#7dd3fc', 'lt-biru jd-kode cp-kotak'],
  ['neon', 'Neon', 'gelap kreatif', 'kiri', 'utama', 'bulat', 'outfit', '', '#e879f9', 'lt-gelap sd-hitam jd-pil'],
  ['kertas', 'Kertas', 'kreatif', 'satu', 'atas', 'lengkung', 'nunito', 'caveat', '#b45309', 'lt-krem en-kartu jd-muda'],
  ['brutal', 'Brutal', 'kreatif', 'satu', 'atas', 'kotak', 'jetbrains', '', '#facc15', 'dk-brutal kp-bawah jd-pil cp-kotak'],
  ['akademik', 'Akademik', 'formal', 'satu', 'atas', 'kotak', 'merriweather', '', '#1e3a8a', 'kp-tengah jd-tebal en-tglkiri cp-teks'],
  ['startup', 'Startup', 'warna kreatif', 'kiri', 'sisi', 'bulat', 'jakarta', '', '#6d28d9', 'sd-gradasi jd-ekor rk-kotak rj0'],
  ['kartu', 'Kartu', 'warna', 'satu', 'atas', 'lengkung', 'dmsans', '', '#0f766e', 'kp-muda en-kartu jd-bar rk-kotak'],
  ['pastel', 'Pastel', 'warna kreatif', 'kiri', 'utama', 'bulat', 'nunito', '', '#db2777', 'sd-muda jd-muda'],
  ['monokrom', 'Monokrom', 'formal', 'satu', 'atas', 'kotak', 'inter', '', '#111111', 'kp-bawah jd-tebal cp-kotak'],
  ['kode', 'Kode', 'kreatif', 'satu', 'atas', 'kotak', 'inter', 'jetbrains', '#059669', 'dk-atas jd-kode'],
  ['hangat', 'Hangat', 'warna', 'kiri', 'sisi', 'bulat', 'raleway', '', '#c2410c', 'lt-krem sd-aksen jd-garis'],
  ['emas', 'Emas Malam', 'gelap', 'satu', 'atas', 'bulat', 'lora', 'playfair', '#d4a373', 'lt-gelap kp-tengah jd-tengah'],
  ['profesional', 'Profesional', 'formal warna', 'kanan', 'atas', 'bulat', 'opensans', '', '#1e3a8a', 'kp-band kp-split sd-abu jd-garis'],
  ['polos', 'ATS Polos', 'formal', 'satu', 'atas', '', 'roboto', '', '#000000', 'jd-garis cp-teks'],
  ['sudut', 'Sudut', 'kreatif', 'satu', 'atas', 'bulat', 'poppins', '', '#ea580c', 'dk-sudut jd-pil'],
  ['lembut', 'Lembut', 'kreatif', 'satu', 'atas', 'bulat', 'raleway', '', '#0891b2', 'kp-tengah jd-tengah rk-miring'],
  ['kontras', 'Kontras', 'gelap warna', 'kiri', 'sisi', 'kotak', 'montserrat', '', '#22c55e', 'sd-hitam jd-pil'],
  ['garisatas', 'Garis Atas', 'formal warna', 'satu', 'atas', 'bulat', 'inter', '', '#2563eb', 'dk-atas jd-ekor'],
  ['majalah', 'Majalah', 'kreatif', 'satu', 'atas', 'kotak', 'sourceserif', 'playfair', '#111827', 'kp-besar kp-bawah jd-tebal rk-miring'],
  ['hutan', 'Hutan', 'warna', 'kiri', 'utama', 'bulat', 'lato', '', '#166534', 'lt-krem sd-gelap jd-ekor'],
  ['langit', 'Langit', 'warna', 'satu', 'atas', 'bulat', 'rubik', '', '#0284c7', 'kp-gradasi jd-bar'],
  ['bata', 'Bata', 'warna', 'kanan', 'utama', 'kotak', 'firasans', '', '#9a3412', 'sd-aksen jd-tebal'],
  ['lavender', 'Lavender', 'warna kreatif', 'satu', 'atas', 'bulat', 'jakarta', '', '#7c3aed', 'kp-muda kp-tengah jd-muda'],
  ['baja', 'Baja', 'formal', 'kiri', 'utama', 'kotak', 'firasans', '', '#475569', 'sd-abu jd-tebal en-tglkiri'],
  ['senja', 'Senja', 'gelap kreatif', 'kiri', 'sisi', 'bulat', 'poppins', '', '#fb923c', 'lt-gelap sd-hitam jd-ekor'],
];
export const TEMPLATE = DEF.map(([id, nama, kat, kolom, kepala, foto, font, fj, warna, gaya], i) => {
  const m = gaya.split(' ');
  const gelap = m.some(x => x === 'lt-gelap' || x === 'lt-biru');
  return { id, no: i + 1, nama, kat: kat.split(' '), kolom, kepala, foto, font, fj, warna, m, gelap, ats: kolom === 'satu' && !gelap };
});
export const cariTemplate = id => TEMPLATE.find(t => t.id === id) || TEMPLATE[0];

/* ---------- warna turunan (dihitung di sini, bukan color-mix, supaya html2canvas aman) ---------- */
const rgb = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
const campur = (a, b, t) => { const x = rgb(a), y = rgb(b); return `rgb(${x.map((v, i) => Math.round(v * t + y[i] * (1 - t))).join(',')})`; };
const terang = h => { const [r, g, b] = rgb(h); return (r * 299 + g * 587 + b * 114) / 1000 > 150; };

/* ---------- util ---------- */
export const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export const baris = s => String(s || '').split('\n').map(x => x.replace(/^\s*[-•*·–]\s*/, '').trim()).filter(Boolean);
export const urlAman = s => {
  s = String(s || '').trim();
  if (!s) return '';
  if (!/^https?:\/\//i.test(s)) s = 'https://' + s;
  try { const x = new URL(s); return /^https?:$/.test(x.protocol) && x.hostname.includes('.') ? x.href : ''; } catch { return ''; }
};
const tampilUrl = h => h.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
const bersih = (s, re) => String(s || '').trim().replace(re, '').replace(/^@/, '').replace(/\/+$/, '');

const IKON = {
  email: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  telepon: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>',
  lokasi: '<path d="M20 10c0 5-5.5 10.2-7.4 11.8a1 1 0 0 1-1.2 0C9.5 20.2 4 15 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
  lahir: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
  github: '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.1-1.3-.3-2.5-1-3.5.3-1.2.3-2.4 0-3.5 0 0-1 0-3 1.5-2.6-.5-5.4-.5-8 0C6 2 5 2 5 2c-.3 1.1-.3 2.3 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.4.5-.7 1-.8 1.6-.2.6-.3 1.3-.2 1.9v4"/><path d="M9 18c-4.5 2-5-2-7-2"/>',
  situs: '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20"/>',
  instagram: '<rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.4A4 4 0 1 1 12.6 8 4 4 0 0 1 16 11.4z"/><path d="M17.5 6.5h.01"/>',
  x: '<path d="M4 4l16 16M20 4 4 20"/>',
};
const ik = n => `<svg class="ci" viewBox="0 0 24 24" aria-hidden="true">${IKON[n]}</svg>`;

/* foto contoh (siluet netral), hanya untuk pratinjau data contoh */
export const FOTO_CONTOH = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><rect width="120" height="120" fill="#cbd5e1"/><circle cx="60" cy="46" r="22" fill="#94a3b8"/><path d="M18 120a42 42 0 0 1 84 0z" fill="#94a3b8"/></svg>');

/* ---------- isi CV ---------- */
function kontakList(d, J, lang) {
  const L = [];
  if (d.email) L.push({ n: 'email', t: d.email, h: 'mailto:' + d.email.trim() });
  if (d.telepon) L.push({ n: 'telepon', t: d.telepon, h: 'tel:' + d.telepon.replace(/[^\d+]/g, '') });
  if (d.lokasi) L.push({ n: 'lokasi', t: d.lokasi });
  const lh = formatLahir(d.lahir, lang);
  if (lh) L.push({ n: 'lahir', t: lh });
  const li = bersih(d.linkedin, /^(https?:\/\/)?([a-z]{2,3}\.)?linkedin\.com\/in\//i);
  if (li) L.push({ n: 'linkedin', t: 'linkedin.com/in/' + li, h: 'https://www.linkedin.com/in/' + encodeURIComponent(li) });
  const gh = bersih(d.github, /^(https?:\/\/)?(www\.)?github\.com\//i);
  if (gh) L.push({ n: 'github', t: 'github.com/' + gh, h: 'https://github.com/' + encodeURIComponent(gh) });
  const s = urlAman(d.situs);
  if (s) L.push({ n: 'situs', t: tampilUrl(s), h: s });
  const ig = bersih(d.instagram, /^(https?:\/\/)?(www\.)?instagram\.com\//i);
  if (ig) L.push({ n: 'instagram', t: '@' + ig, h: 'https://www.instagram.com/' + encodeURIComponent(ig) });
  const xx = bersih(d.x, /^(https?:\/\/)?(www\.)?(x|twitter)\.com\//i);
  if (xx) L.push({ n: 'x', t: '@' + xx, h: 'https://x.com/' + encodeURIComponent(xx) });
  return L;
}
const kontakHtml = (L, kelas) => !L.length ? '' : `<ul class="kontak ${kelas}">${L.map(k => `<li>${ik(k.n)}${k.h ? `<a href="${esc(k.h)}">${esc(k.t)}</a>` : `<span>${esc(k.t)}</span>`}</li>`).join('')}</ul>`;
const poin = s => { const b = baris(s); return !b.length ? '' : b.length === 1 ? `<p class="dsk">${esc(b[0])}</p>` : `<ul class="poin">${b.map(x => `<li>${esc(x)}</li>`).join('')}</ul>`; };
const tanggal = (x, J) => { const a = x.mulai.trim(), b = x.kini ? J.kini : x.selesai.trim(); return a && b ? `${esc(a)} – ${esc(b)}` : esc(a || b); };
const judul = t => `<h2 class="jd"><span>${esc(t)}</span></h2>`;
const chip = arr => `<ul class="chip">${arr.map(x => `<li>${esc(x)}</li>`).join('')}</ul>`;
const daftar = arr => `<ul class="daftar-s">${arr.map(x => `<li>${esc(x)}</li>`).join('')}</ul>`;

function entri(x, J, jenis) {
  const tgl = jenis === 'proyek' ? '' : tanggal(x, J);
  const href = jenis === 'proyek' ? urlAman(x.tautan) : '';
  const sub = jenis === 'proyek' ? (href ? `<a href="${esc(href)}">${esc(tampilUrl(href))}</a>` : '') : esc(x.tempat);
  return `<div class="en"><div class="en-a"><b>${esc(x.posisi)}</b>${tgl ? `<span class="tgl">${tgl}</span>` : ''}</div>${sub ? `<div class="en-b">${sub}</div>` : ''}${poin(x.deskripsi)}</div>`;
}

/* hasil: { kepala: html|'' (di atas halaman 1), utama: [html], sisi: [html] } */
export function susun(d, T, opsi = {}) {
  const lang = d.gaya.judul, J = judulUntuk(lang), dua = T.kolom !== 'satu', m = T.m;
  const L = kontakList(d, J, lang);
  const src = d.foto || (opsi.contoh ? FOTO_CONTOH : '');
  const foto = T.foto && src ? `<img class="foto ${T.foto}" src="${esc(src)}" alt="">` : '';
  const nama = `<h1 class="nm">${esc(d.nama || ' ')}</h1>${d.jabatan ? `<p class="jb">${esc(d.jabatan)}</p>` : ''}`;
  const utama = [], sisi = [];
  let kepala = '';

  if (T.kepala === 'atas') {
    const split = m.includes('kp-split');
    kepala = `<header class="kepala">${foto}<div class="kp-t">${nama}${split ? '' : kontakHtml(L, 'baris')}</div>${split ? kontakHtml(L, 'tumpuk') : ''}</header>`;
  } else if (T.kepala === 'utama') {
    utama.push(`<header class="kepala kepala-utama"><div class="kp-t">${nama}</div></header>`);
    if (foto) sisi.push(`<div class="sisi-foto">${foto}</div>`);
  } else {
    sisi.push(`<header class="kepala kepala-sisi">${foto}${nama}</header>`);
  }

  const bagian = (arr, jd, isi) => {
    if (!isi.length) return;
    arr.push(`<section class="bg">${jd ? judul(jd) : ''}${isi[0]}</section>`);
    isi.slice(1).forEach(h => arr.push(`<section class="bg lanjut">${h}</section>`));
  };
  const ada = x => x.posisi || x.tempat || x.deskripsi;

  if (d.ringkasan.trim()) bagian(utama, m.includes('rj0') ? '' : J.profil, [`<p class="ringkas">${esc(d.ringkasan.trim()).replace(/\n+/g, '<br>')}</p>`]);
  bagian(utama, J.pengalaman, d.pengalaman.filter(ada).map(x => entri(x, J, 'pengalaman')));
  bagian(utama, J.pendidikan, d.pendidikan.filter(ada).map(x => entri(x, J, 'pendidikan')));
  bagian(utama, J.proyek, d.proyek.filter(x => x.posisi || x.deskripsi).map(x => entri(x, J, 'proyek')));

  const keah = baris(d.keahlian), bhs = baris(d.bahasa), ser = baris(d.sertifikat);
  if (dua) {
    if (T.kepala !== 'atas' && L.length) bagian(sisi, J.kontak, [kontakHtml(L, 'tumpuk')]);
    if (keah.length) bagian(sisi, J.keahlian, [chip(keah)]);
    if (bhs.length) bagian(sisi, J.bahasa, [daftar(bhs)]);
    if (ser.length) bagian(sisi, J.sertifikat, [daftar(ser)]);
  } else {
    if (keah.length) bagian(utama, J.keahlian, [chip(keah)]);
    if (bhs.length) bagian(utama, J.bahasa, [chip(bhs)]);
    if (ser.length) bagian(utama, J.sertifikat, [`<ul class="poin">${ser.map(x => `<li>${esc(x)}</li>`).join('')}</ul>`]);
  }
  for (const s of d.lainnya) {
    const isi = baris(s.isi);
    if (!s.judul.trim() && !isi.length) continue;
    bagian(utama, s.judul.trim() || ' ', [isi.length > 1 ? `<ul class="poin">${isi.map(x => `<li>${esc(x)}</li>`).join('')}</ul>` : `<p class="dsk">${esc(isi[0] || '')}</p>`]);
  }
  return { kepala, utama, sisi };
}

/* ---------- halaman ---------- */
export function gayaHalaman(el, d, T) {
  const a = d.gaya.warna || T.warna;
  el.className = ['lembar', 't-' + T.id, 'k-' + T.kolom, 'kp-di-' + T.kepala, 'u-' + d.gaya.ukuran, ...T.m].join(' ');
  const v = {
    '--aksen': a, '--a10': campur(a, '#ffffff', 0.1), '--a20': campur(a, '#ffffff', 0.2), '--a35': campur(a, '#ffffff', 0.35),
    '--a-terang': campur(a, '#ffffff', 0.55), '--a-tua': campur(a, '#0b0f19', 0.62), '--a-gelap': campur(a, '#0f172a', 0.32),
    '--a-teks': terang(a) ? '#111827' : '#ffffff',
    '--font': FONT[d.gaya.font || T.font]?.[1] || FONT.sistem[1],
    '--font-j': FONT[d.gaya.font ? '' : T.fj]?.[1] || 'var(--font)',
  };
  for (const [k, x] of Object.entries(v)) el.style.setProperty(k, x);
  el.lang = d.gaya.judul;
}
function halamanBaru(d, T, isi, no) {
  const p = document.createElement('div');
  gayaHalaman(p, d, T);
  if (no > 0) p.classList.add('lanjutan');
  const sisi = T.kolom === 'satu' ? '' : '<aside class="sisi"></aside>';
  p.innerHTML = `${no === 0 && isi.kepala ? isi.kepala : ''}<div class="badan">${T.kolom === 'kiri' ? sisi : ''}<div class="utama"></div>${T.kolom === 'kanan' ? sisi : ''}</div>`;
  return p;
}
const meluap = el => el.scrollHeight > el.clientHeight + 1;
const jadiEl = html => { const t = document.createElement('template'); t.innerHTML = html; return t.content.firstElementChild; };

/* pecah satu blok yang lebih tinggi dari satu halaman: poin-poin terakhir dipindah ke blok lanjutan */
function pecah(el, wadah) {
  const ul = [...el.querySelectorAll('ul.poin, ul.chip, ul.daftar-s')].pop();
  if (!ul || ul.children.length < 2) return null;
  const sisa = ul.cloneNode(false);
  while (meluap(wadah) && ul.children.length > 1) sisa.prepend(ul.lastElementChild);
  if (!sisa.children.length) return null;
  const lanjut = document.createElement('section');
  lanjut.className = 'bg lanjut sambung';
  lanjut.append(sisa);
  return lanjut;
}

/* susun ke wadah; kembalikan jumlah halaman. opsi.maks membatasi halaman (miniatur) */
export function tata(wadah, d, opsi = {}) {
  const T = cariTemplate(d.gaya.template), isi = susun(d, T, opsi), maks = opsi.maks || 20;
  wadah.textContent = '';
  const hal = [];
  const ambil = (i, bagian) => {
    while (hal.length <= i) { const p = halamanBaru(d, T, isi, hal.length); wadah.append(p); hal.push(p); }
    return hal[i].querySelector(bagian === 'sisi' ? '.sisi' : '.utama');
  };
  const alir = (daftarHtml, bagian) => {
    const antre = daftarHtml.map(jadiEl);
    let i = 0, c = ambil(0, bagian);
    while (antre.length) {
      const el = antre.shift();
      c.append(el);
      if (!meluap(c)) continue;
      if (c.children.length > 1) {
        el.remove();
        if (i + 1 >= maks) return;
        c = ambil(++i, bagian);
        if (el.classList.contains('lanjut')) el.classList.add('sambung');
        c.append(el);
      }
      if (meluap(c)) {
        const lanjut = pecah(el, c);
        if (lanjut) {
          if (i + 1 >= maks) return;
          antre.unshift(lanjut);
          c = ambil(++i, bagian);
        }
      }
    }
  };
  ambil(0, 'utama');
  alir(isi.utama, 'utama');
  if (T.kolom !== 'satu') alir(isi.sisi, 'sisi');
  return hal.length;
}
