/* Curriculum Vitae (superfal-dev.com/tools/buatcvgratis): semua berjalan di browser, tidak ada data yang dikirim ke server. */
import { UI, JUDUL, namaBulan } from './teks.js';
import { TEMPLATE, FONT, W, H, cariTemplate, tata, esc } from './template.js';
import { buatPdf, kumpulkanTeks, kumpulkanTautan } from './pdf.js';

const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const KUNCI = 'buatcv:v1', KUNCI_UI = 'buatcv:ui';
const LIST = ['pengalaman', 'pendidikan', 'proyek', 'lainnya'];
const WARNA = ['', '#2c5282', '#2563eb', '#0e7490', '#0f766e', '#4d7c0f', '#7c3aed', '#db2777', '#9f1239', '#c2410c', '#a16207', '#334155', '#111111'];

let ui = 'id';
const u = k => UI[ui][k] ?? UI.id[k] ?? k;

/* ---------------- data ---------------- */
const kosong = () => ({
  foto: '', nama: '', jabatan: '', email: '', telepon: '', lokasi: '', lahir: { t: '', b: '', y: '' }, ringkasan: '',
  pengalaman: [], pendidikan: [], proyek: [], lainnya: [], keahlian: '', bahasa: '', sertifikat: '',
  linkedin: '', github: '', situs: '', instagram: '', x: '',
  gaya: { template: 'modern', warna: '', font: '', judul: 'id', ukuran: 'normal' },
});
const CONTOH = {
  nama: 'Rani Pramesti', jabatan: 'Analis Data', email: 'rani.pramesti@contoh.id', telepon: '0812 3456 7890', lokasi: 'Bandung, Jawa Barat',
  lahir: { t: '12', b: '5', y: '1998' },
  ringkasan: 'Analis data dengan 4 tahun pengalaman mengolah data penjualan dan operasional menjadi dasbor serta rekomendasi yang dipakai tim manajemen.',
  pengalaman: [
    { posisi: 'Analis Data', tempat: 'PT Niaga Nusantara', mulai: 'Feb 2023', selesai: '', kini: true, deskripsi: 'Membangun dasbor penjualan harian untuk 40 cabang\nMemangkas waktu laporan bulanan dari 3 hari menjadi 4 jam' },
    { posisi: 'Staf Administrasi Data', tempat: 'Koperasi Sejahtera Bersama', mulai: 'Jul 2021', selesai: 'Jan 2023', kini: false, deskripsi: 'Merapikan 12.000 data anggota dan pinjaman' },
  ],
  pendidikan: [{ posisi: 'S1 Statistika', tempat: 'Universitas Padjadjaran', mulai: '2017', selesai: '2021', kini: false, deskripsi: 'IPK 3,62' }],
  proyek: [{ posisi: 'Dasbor Harga Pangan', tautan: 'contoh.id/pangan', deskripsi: 'Dasbor terbuka yang memantau harga 20 komoditas di Jawa Barat' }],
  lainnya: [],
  keahlian: 'SQL\nPython (pandas)\nLooker Studio\nExcel lanjutan', bahasa: 'Indonesia (penutur asli)\nInggris (profesional)',
  sertifikat: 'Google Data Analytics (2022)', linkedin: 'ranipramesti', situs: 'ranipramesti.id',
};
let data = kosong();

const teks = (v, n) => typeof v === 'string' ? v.slice(0, n) : '';
function rapikan(o) {
  const k = kosong();
  o = o && typeof o === 'object' ? o : {};
  for (const f of ['nama', 'jabatan', 'email', 'telepon', 'lokasi', 'linkedin', 'github', 'situs', 'instagram', 'x']) k[f] = teks(o[f], 200);
  for (const f of ['ringkasan', 'keahlian', 'bahasa', 'sertifikat']) k[f] = teks(o[f], 3000);
  if (typeof o.foto === 'string' && /^data:image\/(jpeg|png|webp);base64,/.test(o.foto) && o.foto.length < 3e6) k.foto = o.foto;
  const lh = o.lahir && typeof o.lahir === 'object' ? o.lahir : {};
  k.lahir = { t: /^\d{1,2}$/.test(lh.t) ? lh.t : '', b: /^\d{1,2}$/.test(lh.b) ? lh.b : '', y: /^\d{4}$/.test(lh.y) ? lh.y : '' };
  for (const f of LIST) if (Array.isArray(o[f])) k[f] = o[f].filter(x => x && typeof x === 'object').slice(0, 30).map(x => f === 'lainnya'
    ? { judul: teks(x.judul, 80), isi: teks(x.isi, 3000) }
    : { posisi: teks(x.posisi, 150), tempat: teks(x.tempat, 150), mulai: teks(x.mulai, 40), selesai: teks(x.selesai, 40), kini: !!x.kini, deskripsi: teks(x.deskripsi, 3000), tautan: teks(x.tautan, 300) });
  const g = o.gaya && typeof o.gaya === 'object' ? o.gaya : {};
  if (TEMPLATE.some(t => t.id === g.template)) k.gaya.template = g.template;
  if (/^#[0-9a-f]{6}$/i.test(g.warna || '')) k.gaya.warna = g.warna;
  if (FONT[g.font]) k.gaya.font = g.font;
  if (JUDUL[g.judul]) k.gaya.judul = g.judul;
  if (['kecil', 'normal', 'besar'].includes(g.ukuran)) k.gaya.ukuran = g.ukuran;
  return k;
}
const isiKosong = d => !(d.foto || d.nama || d.jabatan || d.email || d.telepon || d.lokasi || d.ringkasan || d.keahlian || d.bahasa || d.sertifikat
  || d.linkedin || d.github || d.situs || d.instagram || d.x || d.lahir.y || LIST.some(f => d[f].some(x => Object.values(x).some(v => typeof v === 'string' && v.trim()))));
const tampilData = () => isiKosong(data) ? { ...rapikan(CONTOH), gaya: data.gaya } : data;

const simpan = (() => {
  let t, peringatan = false;
  return () => {
    clearTimeout(t);
    t = setTimeout(() => {
      try { localStorage.setItem(KUNCI, JSON.stringify(data)); }
      catch { if (!peringatan) { peringatan = true; toast(u('simpanGagal')); } }
    }, 300);
  };
})();

/* ---------------- util ---------------- */
let toastT;
function toast(msg) { const t = $('#toast'); t.textContent = msg; t.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('on'), 3200); }
const unduh = (nama, blob) => {
  const url = URL.createObjectURL(blob), a = document.createElement('a');
  a.href = url; a.download = nama; document.body.append(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
};
const namaFile = ext => ('CV ' + (data.nama || 'saya')).trim().replace(/[\\/:*?"<>|]+/g, '').replace(/\s+/g, '-') + '.' + ext;
const tunda = ms => new Promise(r => setTimeout(r, ms));

/* ---------------- pratinjau ---------------- */
const halamanEl = $('#halaman'), skala = $('#skala'), kanvas = $('#kanvas');
let pakaiContoh = false;
function render() {
  pakaiContoh = isiKosong(data);
  const n = tata(halamanEl, tampilData(), { contoh: pakaiContoh });
  $('#banner').hidden = !pakaiContoh;
  $('#jml-hal').textContent = u('halaman')(n);
  const T = cariTemplate(data.gaya.template);
  $('#nav-nama').textContent = T.nama;
  $('#nav-no').textContent = `${T.no} / ${TEMPLATE.length}`;
  sesuaikan();
  galeriNanti();
}
function sesuaikan() {
  const cs = getComputedStyle(kanvas);
  const w = kanvas.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight), s = Math.min(1, w / W);
  skala.style.setProperty('--s', s.toFixed(4));
  skala.style.width = W * s + 'px';
  skala.style.height = halamanEl.offsetHeight * s + 'px';
}
new ResizeObserver(sesuaikan).observe(kanvas);
let renderT;
const renderNanti = () => { clearTimeout(renderT); renderT = setTimeout(render, 110); };

/* ---------------- galeri template ---------------- */
let filter = 'semua', galeriT;
function galeriNanti() { clearTimeout(galeriT); galeriT = setTimeout(renderGaleri, 300); }
const lolos = T => filter === 'semua' || (filter === 'ats' ? T.ats : T.kat.includes(filter));
function renderGaleri() {
  if ($('#p-tpl').hidden) return;
  const g = $('#galeri'), base = tampilData(), daftar = TEMPLATE.filter(lolos);
  $('#n-desain').textContent = u('nDesain')(daftar.length, filter !== 'semua');
  g.textContent = '';
  for (const T of daftar) {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'mini'; b.dataset.id = T.id;
    const pakai = data.gaya.template === T.id;
    b.setAttribute('aria-pressed', String(pakai));
    b.innerHTML = `<div class="mini-k"><div class="mini-s"></div></div><span class="mini-n"><i>${T.no}</i>${esc(T.nama)}${T.ats ? '<em>ATS</em>' : ''}${pakai ? `<b>${esc(u('dipakai'))}</b>` : ''}</span>`;
    g.append(b);
    tata($('.mini-s', b), { ...base, gaya: { ...data.gaya, template: T.id } }, { contoh: pakaiContoh, maks: 1 });
  }
  skalaMini();
}
const skalaMini = () => $$('.mini-k').forEach(k => $('.mini-s', k).style.setProperty('--ms', (k.clientWidth / W).toFixed(4)));
new ResizeObserver(skalaMini).observe($('#galeri'));
function pilihTemplate(id, dariGaleri) {
  data.gaya.template = id;
  swatch(); simpan(); render();
  if (dariGaleri && hp.matches) toast(`${cariTemplate(id).nama} · ${u('dipakai')}`);
  $$('.mini').forEach(x => {
    const on = x.dataset.id === id;
    x.setAttribute('aria-pressed', String(on));
    $('.mini-n b', x)?.remove();
    if (on) $('.mini-n', x).insertAdjacentHTML('beforeend', `<b>${esc(u('dipakai'))}</b>`);
  });
}
$('#galeri').addEventListener('click', e => { const b = e.target.closest('.mini'); if (b) pilihTemplate(b.dataset.id, true); });
$$('.filter button').forEach(b => b.addEventListener('click', () => {
  filter = b.dataset.f;
  $$('.filter button').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
  renderGaleri();
}));
const geser = arah => {
  const i = TEMPLATE.findIndex(t => t.id === data.gaya.template);
  pilihTemplate(TEMPLATE[(i + arah + TEMPLATE.length) % TEMPLATE.length].id);
};
$('#tpl-prev').addEventListener('click', () => geser(-1));
$('#tpl-next').addEventListener('click', () => geser(1));

/* ---------------- formulir ---------------- */
const form = $('#p-data');
const FIELD = ['nama', 'jabatan', 'email', 'telepon', 'lokasi', 'ringkasan', 'keahlian', 'bahasa', 'sertifikat', 'linkedin', 'github', 'situs', 'instagram', 'x'];
function isiLahir() {
  const bl = $('#lahir-b'), v = data.lahir.b;
  bl.innerHTML = `<option value="">${esc(u('bulan'))}</option>` + namaBulan(ui).map((n, i) => `<option value="${i + 1}">${esc(n)}</option>`).join('');
  bl.value = v;
  $('#lahir-t').options[0].textContent = u('tgl');
}
function isiForm() {
  for (const f of FIELD) form.elements[f].value = data[f];
  $('#lahir-t').value = data.lahir.t; $('#lahir-b').value = data.lahir.b; $('#lahir-y').value = data.lahir.y;
  for (const f of LIST) {
    const w = $(`[data-daftar="${f}"]`, form); w.textContent = '';
    data[f].forEach((x, i) => w.append(kartu(f, x, i)));
  }
  fotoTampil();
  $('#g-font').value = data.gaya.font; $('#g-judul').value = data.gaya.judul; $('#g-ukuran').value = data.gaya.ukuran;
  swatch();
}
function kartu(jenis, x, i) {
  const n = $('#tpl-' + jenis).content.firstElementChild.cloneNode(true);
  n.dataset.i = i;
  $$('[data-k]', n).forEach(el => { const k = el.dataset.k; if (el.type === 'checkbox') el.checked = !!x[k]; else el.value = x[k] || ''; });
  terjemah(n);
  kartuJudul(n, x);
  const sel = $('[data-k="selesai"]', n); if (sel) sel.disabled = !!x.kini;
  return n;
}
const kartuJudul = (n, x) => { $('.kartu-judul', n).textContent = [x.posisi || x.judul, x.tempat].filter(Boolean).join(' · ') || u('baru'); };

form.addEventListener('input', e => {
  const el = e.target;
  if (el.name && FIELD.includes(el.name)) data[el.name] = el.value;
  else if (el.id === 'lahir-y') data.lahir.y = el.value.replace(/\D/g, '').slice(0, 4);
  else if (el.dataset.k) {
    const k = el.closest('.kartu'), jenis = k.parentElement.dataset.daftar, x = data[jenis][+k.dataset.i];
    x[el.dataset.k] = el.type === 'checkbox' ? el.checked : el.value;
    if (el.dataset.k === 'kini') $('[data-k="selesai"]', k).disabled = el.checked;
    kartuJudul(k, x);
  } else return;
  simpan(); renderNanti();
});
form.addEventListener('change', e => {
  if (e.target.id === 'lahir-t') data.lahir.t = e.target.value;
  else if (e.target.id === 'lahir-b') data.lahir.b = e.target.value;
  else return;
  simpan(); render();
});
form.addEventListener('click', e => {
  const h = e.target.closest('.acc-h');
  if (h) { const a = h.parentElement, buka = h.getAttribute('aria-expanded') !== 'true'; h.setAttribute('aria-expanded', String(buka)); $('.acc-isi', a).hidden = !buka; return; }
  const tb = e.target.closest('[data-tambah]');
  if (tb) {
    const jenis = tb.dataset.tambah;
    if (data[jenis].length >= 30) return;
    const x = jenis === 'lainnya' ? { judul: '', isi: '' } : { posisi: '', tempat: '', mulai: '', selesai: '', kini: false, deskripsi: '', tautan: '' };
    data[jenis].push(x);
    const n = kartu(jenis, x, data[jenis].length - 1);
    $(`[data-daftar="${jenis}"]`, form).append(n); $('input', n).focus();
    simpan(); render(); return;
  }
  const k = e.target.closest('.kartu'); if (!k) return;
  const jenis = k.parentElement.dataset.daftar, i = +k.dataset.i, arr = data[jenis];
  if (e.target.closest('[data-hapus]')) arr.splice(i, 1);
  else if (e.target.closest('[data-geser]')) {
    const j = i + +e.target.closest('[data-geser]').dataset.geser;
    if (j < 0 || j >= arr.length) return;
    [arr[i], arr[j]] = [arr[j], arr[i]];
  } else return;
  const w = k.parentElement; w.textContent = ''; arr.forEach((x, n) => w.append(kartu(jenis, x, n)));
  simpan(); render();
});
(() => { const t = $('#lahir-t'); for (let i = 1; i <= 31; i++) t.add(new Option(String(i), String(i))); })();

/* ---------------- foto + pemotong ---------------- */
let fotoAsli = null;   // gambar sumber terakhir (agar bisa diatur ulang)
const fotoTampil = () => {
  const p = $('#foto-prev');
  p.style.backgroundImage = data.foto ? `url("${data.foto}")` : '';
  p.classList.toggle('ada', !!data.foto);
  $('#foto-hapus').hidden = !data.foto;
  $('#foto-atur').hidden = !data.foto;
  $('#foto-pilih-t').textContent = u(data.foto ? 'fGanti' : 'fPilih');
};
const dlgFoto = $('#dlg-foto'), cv = $('#potong-kanvas'), ctx = cv.getContext('2d');
const pot = { img: null, z: 1, x: 0, y: 0 };
function gambarPotong() {
  const S = cv.width, { img, z } = pot;
  const dasar = S / Math.min(img.width, img.height), sk = dasar * z;
  const w = img.width * sk, h = img.height * sk;
  pot.x = Math.min(0, Math.max(S - w, pot.x)); pot.y = Math.min(0, Math.max(S - h, pot.y));
  ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, S, S);
  ctx.drawImage(img, pot.x, pot.y, w, h);
}
function bukaPotong(img) {
  pot.img = img; pot.z = 1;
  const S = cv.width, sk = S / Math.min(img.width, img.height);
  pot.x = (S - img.width * sk) / 2; pot.y = (S - img.height * sk) / 2;
  $('#potong-zoom').value = 1;
  gambarPotong();
  dlgFoto.showModal();
}
const zoomKe = z => {
  const S = cv.width, c = S / 2, lama = pot.z;
  pot.z = Math.min(4, Math.max(1, z));
  pot.x = c - (c - pot.x) * pot.z / lama; pot.y = c - (c - pot.y) * pot.z / lama;
  $('#potong-zoom').value = pot.z; gambarPotong();
};
let seret = null;
cv.addEventListener('pointerdown', e => { seret = { x: e.clientX, y: e.clientY }; cv.setPointerCapture(e.pointerId); });
cv.addEventListener('pointermove', e => {
  if (!seret) return;
  const f = cv.width / cv.getBoundingClientRect().width;
  pot.x += (e.clientX - seret.x) * f; pot.y += (e.clientY - seret.y) * f; seret = { x: e.clientX, y: e.clientY }; gambarPotong();
});
cv.addEventListener('pointerup', () => { seret = null; });
cv.addEventListener('wheel', e => { e.preventDefault(); zoomKe(pot.z * (e.deltaY < 0 ? 1.08 : 1 / 1.08)); }, { passive: false });
cv.addEventListener('keydown', e => {
  const d = { ArrowLeft: [12, 0], ArrowRight: [-12, 0], ArrowUp: [0, 12], ArrowDown: [0, -12] }[e.key];
  if (d) { e.preventDefault(); pot.x += d[0]; pot.y += d[1]; gambarPotong(); }
  else if (e.key === '+' || e.key === '=') zoomKe(pot.z * 1.1);
  else if (e.key === '-') zoomKe(pot.z / 1.1);
});
$('#potong-zoom').addEventListener('input', e => zoomKe(+e.target.value));
$('#potong-batal').addEventListener('click', () => dlgFoto.close());
$('#potong-pakai').addEventListener('click', () => {
  const o = document.createElement('canvas'); o.width = o.height = 480;
  o.getContext('2d').drawImage(cv, 0, 0, 480, 480);
  data.foto = o.toDataURL('image/jpeg', 0.88);
  dlgFoto.close(); fotoTampil(); simpan(); render();
});
$('#foto').addEventListener('change', async e => {
  const f = e.target.files[0]; e.target.value = '';
  if (!f) return;
  if (!/^image\/(png|jpeg|webp)$/.test(f.type)) { toast(u('fotoGagal')); return; }
  try { fotoAsli = await createImageBitmap(f); bukaPotong(fotoAsli); } catch { toast(u('fotoGagal')); }
});
$('#foto-atur').addEventListener('click', async () => {
  try { bukaPotong(fotoAsli || await createImageBitmap(await (await fetch(data.foto)).blob())); } catch { toast(u('fotoGagal')); }
});
$('#foto-hapus').addEventListener('click', () => { data.foto = ''; fotoAsli = null; fotoTampil(); simpan(); render(); });

/* ---------------- gaya ---------------- */
function swatch() {
  const w = $('#swatch'), T = cariTemplate(data.gaya.template), aktif = data.gaya.warna;
  w.innerHTML = WARNA.map(c => `<button type="button" style="--c:${c || T.warna}" data-c="${c}" class="${c ? '' : 'bawaan'}" title="${c ? c : esc(u('bawaan'))}" aria-label="${c ? c : esc(u('bawaan'))}" aria-pressed="${c === aktif}"></button>`).join('')
    + `<label class="sw-bebas" title="#"><input type="color" value="${aktif || T.warna}" aria-label="${esc(u('warna'))}"><span></span></label>`;
}
$('#swatch').addEventListener('click', e => { const b = e.target.closest('[data-c]'); if (!b) return; data.gaya.warna = b.dataset.c; swatch(); simpan(); render(); });
$('#swatch').addEventListener('input', e => { if (e.target.type !== 'color') return; data.gaya.warna = e.target.value; simpan(); renderNanti(); });
$('#swatch').addEventListener('change', e => { if (e.target.type === 'color') swatch(); });
(() => {
  const f = $('#g-font');
  for (const [k, [nama, stack]] of Object.entries(FONT)) { const o = new Option(nama, k === 'sistem' ? 'sistem' : k); o.style.fontFamily = stack; f.add(o); }
  const j = $('#g-judul');
  for (const [k, v] of Object.entries(JUDUL)) j.add(new Option(v[0], k));
})();
$('#g-font').addEventListener('change', e => { data.gaya.font = e.target.value; simpan(); render(); });
$('#g-judul').addEventListener('change', e => { data.gaya.judul = e.target.value; simpan(); render(); });
$('#g-ukuran').addEventListener('change', e => { data.gaya.ukuran = e.target.value; simpan(); render(); });

/* ---------------- tab: 1 Isi data, 2 Template, 3 Pratinjau (tab ke-3 hanya di HP) ---------------- */
const hp = matchMedia('(max-width: 860px)');
const tabTerlihat = () => $$('.tabs [role=tab]').filter(t => t.offsetParent);
function bukaTab(id, gulir) {
  if (id === 'tab-pra' && !hp.matches) id = 'tab-data';
  $$('.tabs [role=tab]').forEach(t => {
    const on = t.id === id;
    t.setAttribute('aria-selected', String(on));
    t.tabIndex = on ? 0 : -1;
    if (t.id !== 'tab-pra') $('#' + t.getAttribute('aria-controls')).hidden = !on;
  });
  document.body.dataset.tab = id.slice(4);
  if (id === 'tab-tpl') renderGaleri();
  if (id === 'tab-pra') sesuaikan();
  if (gulir) {
    if (hp.matches) scrollTo({ top: Math.min(scrollY, $('.editor').offsetTop), behavior: 'smooth' });
    else $('.editor').scrollTo({ top: 0, behavior: 'smooth' });
  }
}
$$('.tabs [role=tab]').forEach(t => t.addEventListener('click', () => bukaTab(t.id, true)));
$('.tabs').addEventListener('keydown', e => {
  if (!['ArrowLeft', 'ArrowRight'].includes(e.key)) return;
  const t = tabTerlihat(), j = (t.indexOf(document.activeElement) + (e.key === 'ArrowRight' ? 1 : -1) + t.length) % t.length;
  t[j].focus(); bukaTab(t[j].id);
});
$('#ke-tpl').addEventListener('click', () => bukaTab('tab-tpl', true));
$('#ke-pra').addEventListener('click', () => bukaTab('tab-pra', true));
hp.addEventListener('change', () => { if (!hp.matches && document.body.dataset.tab === 'pra') bukaTab('tab-data'); sesuaikan(); });

/* ---------------- menu berkas ---------------- */
const menuBtn = $('#menu-btn'), menuIsi = $('#menu-isi');
const menu = buka => { menuIsi.hidden = !buka; menuBtn.setAttribute('aria-expanded', String(buka)); if (buka) $('button, label', menuIsi).focus(); };
menuBtn.addEventListener('click', e => { e.stopPropagation(); menu(menuIsi.hidden); });
document.addEventListener('click', e => { if (!e.target.closest('#menu')) menu(false); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !menuIsi.hidden) { menu(false); menuBtn.focus(); } });
$('#m-cetak').addEventListener('click', () => {
  menu(false);
  const lama = document.title; document.title = namaFile('pdf').replace(/\.pdf$/, '');
  setTimeout(() => { window.print(); document.title = lama; }, 60);
});
$('#m-simpan').addEventListener('click', () => { menu(false); unduh(namaFile('json'), new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })); });
$('#m-buka').addEventListener('change', async e => {
  const f = e.target.files[0]; e.target.value = ''; menu(false);
  if (!f) return;
  try {
    if (f.size > 8e6) throw 0;
    const o = JSON.parse(await f.text());
    if (!o || typeof o !== 'object' || Array.isArray(o)) throw 0;
    data = rapikan(o); fotoAsli = null; isiForm(); simpan(); render(); toast(u('jsonOk'));
  } catch { toast(u('jsonGagal')); }
});
$('#m-contoh').addEventListener('click', () => { menu(false); data = { ...rapikan(CONTOH), gaya: data.gaya }; isiForm(); simpan(); render(); });
$('#m-kosong').addEventListener('click', () => {
  menu(false);
  if (!confirm(u('yakinKosong'))) return;
  data = kosong(); fotoAsli = null;
  try { localStorage.removeItem(KUNCI); } catch { /* abaikan */ }
  isiForm(); render(); toast(u('dikosongkan'));
});

/* ---------------- ekspor PDF & PNG ---------------- */
async function gambarHalaman(cb) {
  const luar = $('#render-luar');
  const n = tata(luar, tampilData(), { contoh: pakaiContoh });
  if (document.fonts?.ready) await document.fonts.ready;
  await Promise.all($$('img', luar).map(i => i.decode?.().catch(() => {})));
  try {
    for (let i = 0; i < n; i++) {
      const el = luar.children[i];
      const c = await window.html2canvas(el, { scale: 2, backgroundColor: '#ffffff', logging: false, width: W, height: H, windowWidth: W });
      await cb(c, el, i, n);
    }
  } finally { luar.textContent = ''; }
  return n;
}
async function sibuk(btn, pesan, kerja) {
  if (!window.html2canvas || btn.disabled) return;
  btn.disabled = true; btn.classList.add('proses'); toast(u(pesan));
  try { await kerja(); } finally { btn.disabled = false; btn.classList.remove('proses'); }
}
$('#unduh-pdf').addEventListener('click', e => sibuk(e.currentTarget, 'pdfProses', async () => {
  try {
    const hal = [];
    await gambarHalaman(async (c, el) => {
      const blob = await new Promise(r => c.toBlob(r, 'image/jpeg', 0.92));
      hal.push({ jpeg: new Uint8Array(await blob.arrayBuffer()), iw: c.width, ih: c.height, teks: kumpulkanTeks(el), tautan: kumpulkanTautan(el) });
    });
    const d = tampilData();
    unduh(namaFile('pdf'), buatPdf(hal, W, H, { judul: 'CV ' + (d.nama || ''), penulis: d.nama, subjek: d.jabatan, kata: d.keahlian.split('\n').map(s => s.trim()).filter(Boolean).join(', ') }));
    toast(u('pdfOk'));
  } catch (err) { console.warn(err); toast(u('pdfGagal')); }
}));
$('#unduh-png').addEventListener('click', e => sibuk(e.currentTarget, 'pngProses', async () => {
  try {
    const n = await gambarHalaman(async (c, el, i, n) => {
      const blob = await new Promise(r => c.toBlob(r, 'image/png'));
      unduh(namaFile('png').replace(/\.png$/, n > 1 ? `-hal${i + 1}.png` : '.png'), blob);
      await tunda(300);
    });
    toast(u('pngOk')(n));
  } catch (err) { console.warn(err); toast(u('pngGagal')); }
}));

/* ---------------- bahasa antarmuka ---------------- */
function terjemah(r = document) {
  $$('[data-u]', r).forEach(el => { const v = u(el.dataset.u); if (typeof v === 'string') el.textContent = v; });
  $$('[data-ph]', r).forEach(el => { el.placeholder = u(el.dataset.ph); });
  $$('[data-al]', r).forEach(el => { el.setAttribute('aria-label', u(el.dataset.al)); el.title = u(el.dataset.al); });
}
function panduan() {
  $('#panduan-isi').innerHTML = u('g').map(([j, t], i) => `<li><span>${i + 1}</span><div><h3>${esc(j)}</h3><p>${esc(t)}</p></div></li>`).join('');
  $('#faq-isi').innerHTML = u('q').map(([j, t]) => `<details><summary>${esc(j)}</summary><p>${esc(t)}</p></details>`).join('');
}
function setUi(l) {
  ui = UI[l] ? l : 'id';
  document.documentElement.lang = ui;
  $('#ui-lang').value = ui;
  terjemah();
  $$('.kartu').forEach(k => kartuJudul(k, data[k.parentElement.dataset.daftar][+k.dataset.i]));
  isiLahir(); fotoTampil(); panduan();
  try { localStorage.setItem(KUNCI_UI, ui); } catch { /* abaikan */ }
  swatch(); render();
}
$('#ui-lang').addEventListener('change', e => setUi(e.target.value));

/* ---------------- mulai ---------------- */
let awalUi = (navigator.language || 'id').toLowerCase().startsWith('id') ? 'id' : 'en';
try {
  const s = localStorage.getItem(KUNCI); if (s) data = rapikan(JSON.parse(s));
  const l = localStorage.getItem(KUNCI_UI); if (UI[l]) awalUi = l;
} catch { /* penyimpanan tidak tersedia: mulai kosong */ }
const q = new URLSearchParams(location.search).get('lang'); if (UI[q]) awalUi = q;
ui = awalUi;
isiLahir();
isiForm();
bukaTab('tab-data');
setUi(awalUi);
addEventListener('resize', sesuaikan);
