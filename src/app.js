/* Buat Curriculum Vitae - CV: semua berjalan di browser. Tidak ada data yang dikirim ke server. */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const KUNCI = 'buatcv:v1', KUNCI_UI = 'buatcv:ui';
  const LIST = ['pengalaman', 'pendidikan', 'proyek'];

  /* ---------------- teks antarmuka (ID / EN) ---------------- */
  const UI = {
    id: {
      lk1: 'Isi data', lk2: 'Template', lk3: 'Unduh', kembali: 'superfal-dev.com', tData: 'Isi data', tTpl: 'Template & gaya',
      sDiri: 'Data diri', fPilih: 'Pilih foto', fGanti: 'Ganti foto', fHapus: 'Hapus foto', fKet: 'Opsional. JPG, PNG atau WebP, dipotong persegi.',
      nama: 'Nama lengkap', jabatan: 'Jabatan / profesi', telepon: 'Telepon', lokasi: 'Domisili', ringkasan: 'Ringkasan diri',
      sPeng: 'Pengalaman kerja', tbPeng: 'Tambah pengalaman', sPend: 'Pendidikan', tbPend: 'Tambah pendidikan', sKeah: 'Keahlian',
      keahlianKet: 'Satu keahlian per baris', bahasaKet: 'Bahasa (satu per baris)', sertifKet: 'Sertifikat / pelatihan (satu per baris)',
      ops: '(opsional)', sProy: 'Proyek', tbProy: 'Tambah proyek', sTaut: 'Tautan', situs: 'Situs / portofolio', lanjut: 'Lanjut pilih template',
      fSemua: 'Semua', fWarna: 'Berwarna', fKreatif: 'Kreatif', fGelap: 'Gelap', gWarna: 'Warna aksen', gFont: 'Huruf', gBawaan: 'Bawaan template',
      gJudul: 'Bahasa judul CV', gUkuran: 'Ukuran teks', uKecil: 'Kecil', uNormal: 'Normal', uBesar: 'Besar',
      atsKet: 'Template bertanda ATS memakai satu kolom: urutan bacanya paling aman untuk sistem penyaring lamaran.',
      berkas: 'Berkas', mSimpan: 'Simpan data (.json)', mBuka: 'Buka data (.json)', mContoh: 'Isi dengan contoh', mKosong: 'Mulai dari kosong',
      unduhPdf: 'Unduh PDF', privasi: 'Semua diproses di browser ini. Data tersimpan otomatis di perangkat Anda dan tidak dikirim ke server.',
      lihat: 'Lihat pratinjau', ubah: 'Ubah data', pdfJ: 'Simpan sebagai PDF',
      pdf1: 'Di jendela cetak, pilih tujuan <b>Simpan sebagai PDF</b>.', pdf2: 'Kertas <b>A4</b>, margin <b>Tidak ada</b>, skala <b>100%</b>.',
      pdf3: 'Centang <b>Grafik latar belakang</b> agar warna template ikut.', pdf4: 'Teks di PDF tetap bisa diseleksi dan dibaca ATS; email dan tautan bisa diklik.',
      batal: 'Batal', lanjutCetak: 'Buka jendela cetak',
      posisi: 'Posisi', perusahaan: 'Perusahaan / instansi', mulai: 'Mulai', selesai: 'Selesai', kini: 'Masih bekerja di sini', kiniStudi: 'Masih menempuh studi',
      deskripsi: 'Tugas & capaian (satu poin per baris)', gelar: 'Jurusan / gelar', sekolah: 'Sekolah / kampus', catatan: 'Catatan (IPK, organisasi, prestasi)',
      namaProyek: 'Nama proyek', tautanProyek: 'Tautan (opsional)', deskripsi2: 'Deskripsi (satu poin per baris)', phMulai: 'mis. Jan 2023', phSelesai: 'mis. Des 2024',
      baru: 'Entri baru', halaman: n => `${n} halaman A4`, contoh: 'Pratinjau memakai data contoh. Mulai isi formulir untuk menggantinya.',
      tersimpan: 'Tersimpan di browser ini', jsonOk: 'Data dimuat dari file.', jsonGagal: 'File tidak bisa dibaca sebagai data CV.',
      yakinKosong: 'Hapus semua isi formulir, foto dan pilihan template di browser ini?', dikosongkan: 'Formulir dikosongkan.',
      pngProses: 'Membuat PNG…', pngOk: n => n > 1 ? `${n} file PNG diunduh (satu per halaman).` : 'PNG diunduh.', pngGagal: 'PNG gagal dibuat. Coba Unduh PDF.',
      fotoGagal: 'Foto tidak bisa dibaca.', simpanGagal: 'Browser menolak penyimpanan lokal; simpan data ke .json agar tidak hilang.',
    },
    en: {
      lk1: 'Fill in', lk2: 'Template', lk3: 'Download', kembali: 'superfal-dev.com', tData: 'Your details', tTpl: 'Template & style',
      sDiri: 'Personal details', fPilih: 'Choose photo', fGanti: 'Change photo', fHapus: 'Remove photo', fKet: 'Optional. JPG, PNG or WebP, cropped square.',
      nama: 'Full name', jabatan: 'Job title', telepon: 'Phone', lokasi: 'Location', ringkasan: 'Summary',
      sPeng: 'Work experience', tbPeng: 'Add experience', sPend: 'Education', tbPend: 'Add education', sKeah: 'Skills',
      keahlianKet: 'One skill per line', bahasaKet: 'Languages (one per line)', sertifKet: 'Certificates / training (one per line)',
      ops: '(optional)', sProy: 'Projects', tbProy: 'Add project', sTaut: 'Links', situs: 'Website / portfolio', lanjut: 'Next: choose a template',
      fSemua: 'All', fWarna: 'Colorful', fKreatif: 'Creative', fGelap: 'Dark', gWarna: 'Accent color', gFont: 'Font', gBawaan: 'Template default',
      gJudul: 'CV heading language', gUkuran: 'Text size', uKecil: 'Small', uNormal: 'Normal', uBesar: 'Large',
      atsKet: 'Templates marked ATS use a single column: the safest reading order for applicant tracking systems.',
      berkas: 'File', mSimpan: 'Save data (.json)', mBuka: 'Open data (.json)', mContoh: 'Fill with sample', mKosong: 'Start from blank',
      unduhPdf: 'Download PDF', privasi: 'Everything runs in this browser. Your data autosaves on this device and is never sent to a server.',
      lihat: 'See preview', ubah: 'Edit details', pdfJ: 'Save as PDF',
      pdf1: 'In the print window, choose <b>Save as PDF</b>.', pdf2: 'Paper <b>A4</b>, margins <b>None</b>, scale <b>100%</b>.',
      pdf3: 'Tick <b>Background graphics</b> so template colors are kept.', pdf4: 'PDF text stays selectable and ATS-readable; email and links are clickable.',
      batal: 'Cancel', lanjutCetak: 'Open print window',
      posisi: 'Position', perusahaan: 'Company / organization', mulai: 'Start', selesai: 'End', kini: 'I currently work here', kiniStudi: 'Currently studying',
      deskripsi: 'Duties & achievements (one point per line)', gelar: 'Major / degree', sekolah: 'School / university', catatan: 'Notes (GPA, activities, awards)',
      namaProyek: 'Project name', tautanProyek: 'Link (optional)', deskripsi2: 'Description (one point per line)', phMulai: 'e.g. Jan 2023', phSelesai: 'e.g. Dec 2024',
      baru: 'New entry', halaman: n => `${n} A4 page${n > 1 ? 's' : ''}`, contoh: 'Preview shows sample data. Start filling in the form to replace it.',
      tersimpan: 'Saved in this browser', jsonOk: 'Data loaded from file.', jsonGagal: 'This file could not be read as CV data.',
      yakinKosong: 'Delete all form data, photo and template choice in this browser?', dikosongkan: 'Form cleared.',
      pngProses: 'Creating PNG…', pngOk: n => n > 1 ? `${n} PNG files downloaded (one per page).` : 'PNG downloaded.', pngGagal: 'PNG failed. Try Download PDF.',
      fotoGagal: 'The photo could not be read.', simpanGagal: 'This browser blocks local storage; save your data to .json so it is not lost.',
    },
  };
  let ui = 'id';
  const u = k => UI[ui][k] ?? UI.id[k] ?? k;

  /* ---------------- judul bagian CV (ID / EN / ZH) ---------------- */
  const JUDUL = {
    id: { profil: 'Profil', pengalaman: 'Pengalaman Kerja', pendidikan: 'Pendidikan', keahlian: 'Keahlian', bahasa: 'Bahasa', sertifikat: 'Sertifikat & Pelatihan', proyek: 'Proyek', kontak: 'Kontak', tautan: 'Tautan', kini: 'Sekarang' },
    en: { profil: 'Profile', pengalaman: 'Work Experience', pendidikan: 'Education', keahlian: 'Skills', bahasa: 'Languages', sertifikat: 'Certifications & Training', proyek: 'Projects', kontak: 'Contact', tautan: 'Links', kini: 'Present' },
    zh: { profil: '个人简介', pengalaman: '工作经历', pendidikan: '教育背景', keahlian: '专业技能', bahasa: '语言能力', sertifikat: '证书与培训', proyek: '项目经历', kontak: '联系方式', tautan: '链接', kini: '至今' },
  };

  /* ---------------- template ----------------
     kolom: satu | kiri | kanan   kepala: atas (selebar halaman) | utama (di kolom utama)   foto: bulat | kotak */
  const TEMPLATE = [
    { id: 'modern', nama: 'Modern', kat: ['formal', 'warna'], kolom: 'satu', kepala: 'atas', foto: 'bulat', font: 'sans', ats: true, warna: '#2563eb' },
    { id: 'klasik', nama: 'Klasik', kat: ['formal'], kolom: 'satu', kepala: 'atas', foto: 'kotak', font: 'serif', ats: true, warna: '#1f2937' },
    { id: 'minimal', nama: 'Minimal', kat: ['formal'], kolom: 'satu', kepala: 'atas', foto: 'bulat', font: 'humanis', ats: true, warna: '#0f766e' },
    { id: 'samping', nama: 'Panel Samping', kat: ['warna'], kolom: 'kiri', kepala: 'utama', foto: 'bulat', font: 'sans', ats: false, warna: '#1e3a8a' },
    { id: 'linimasa', nama: 'Linimasa', kat: ['kreatif', 'warna'], kolom: 'satu', kepala: 'atas', foto: 'bulat', font: 'sans', ats: true, warna: '#7c3aed' },
    { id: 'ringkas', nama: 'Ringkas', kat: ['formal'], kolom: 'kanan', kepala: 'atas', foto: 'kotak', font: 'humanis', ats: false, warna: '#334155' },
    { id: 'anggun', nama: 'Anggun', kat: ['kreatif'], kolom: 'satu', kepala: 'atas', foto: 'bulat', font: 'serif', ats: true, warna: '#9f1239' },
    { id: 'malam', nama: 'Malam', kat: ['gelap', 'kreatif'], kolom: 'kiri', kepala: 'utama', foto: 'bulat', font: 'sans', ats: false, warna: '#38bdf8' },
  ];
  const WARNA = ['#2563eb', '#1e3a8a', '#0f766e', '#15803d', '#7c3aed', '#9f1239', '#c2410c', '#1f2937', '#38bdf8'];
  const FONT = {
    sans: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "PingFang SC", "Microsoft YaHei", sans-serif',
    humanis: '"Segoe UI", "Trebuchet MS", "Lucida Grande", Ubuntu, Cantarell, "Noto Sans", "Microsoft YaHei", sans-serif',
    serif: 'Georgia, Cambria, "Times New Roman", "Noto Serif", "Songti SC", "SimSun", serif',
    mono: 'ui-monospace, "SFMono-Regular", Menlo, Consolas, "Liberation Mono", monospace',
  };

  /* ---------------- data ---------------- */
  const kosong = () => ({
    foto: '', nama: '', jabatan: '', email: '', telepon: '', lokasi: '', ringkasan: '',
    pengalaman: [], pendidikan: [], proyek: [], keahlian: '', bahasa: '', sertifikat: '',
    linkedin: '', github: '', situs: '',
    gaya: { template: 'modern', warna: '', font: '', judul: 'id', ukuran: 'normal' },
  });
  const CONTOH = {
    foto: '', nama: 'Rani Pramesti', jabatan: 'Analis Data', email: 'rani.pramesti@contoh.id', telepon: '0812 3456 7890', lokasi: 'Bandung, Jawa Barat',
    ringkasan: 'Analis data dengan 4 tahun pengalaman mengolah data penjualan dan operasional menjadi dasbor serta rekomendasi yang dipakai tim manajemen. Terbiasa bekerja dengan SQL, Python dan Looker Studio.',
    pengalaman: [
      { posisi: 'Analis Data', tempat: 'PT Niaga Nusantara', mulai: 'Feb 2023', selesai: '', kini: true, deskripsi: 'Membangun dasbor penjualan harian untuk 40 cabang\nMemangkas waktu laporan bulanan dari 3 hari menjadi 4 jam lewat otomatisasi SQL\nMenyusun model prakiraan stok bersama tim gudang' },
      { posisi: 'Staf Administrasi Data', tempat: 'Koperasi Sejahtera Bersama', mulai: 'Jul 2021', selesai: 'Jan 2023', kini: false, deskripsi: 'Merapikan 12.000 data anggota dan pinjaman\nMembuat laporan keuangan triwulan untuk rapat pengurus' },
    ],
    pendidikan: [{ posisi: 'S1 Statistika', tempat: 'Universitas Padjadjaran', mulai: '2017', selesai: '2021', kini: false, deskripsi: 'IPK 3,62 · Asisten praktikum Analisis Regresi' }],
    proyek: [{ posisi: 'Dasbor Harga Pangan', tautan: 'https://contoh.id/pangan', deskripsi: 'Dasbor sumber terbuka yang memantau harga 20 komoditas di Jawa Barat' }],
    keahlian: 'SQL (PostgreSQL, BigQuery)\nPython (pandas)\nLooker Studio\nMicrosoft Excel lanjutan\nKomunikasi data', bahasa: 'Indonesia (penutur asli)\nInggris (profesional)',
    sertifikat: 'Google Data Analytics Certificate (2022)\nPelatihan Dasar SQL, Kominfo (2021)', linkedin: 'ranipramesti', github: '', situs: '',
  };
  let data = kosong();

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

  const rapikan = d => {
    const k = kosong(), o = d && typeof d === 'object' ? d : {};
    for (const f of Object.keys(k)) if (f !== 'gaya' && !LIST.includes(f) && typeof o[f] === 'string') k[f] = o[f];
    for (const f of LIST) if (Array.isArray(o[f])) k[f] = o[f].filter(x => x && typeof x === 'object').slice(0, 30).map(x => ({
      posisi: String(x.posisi ?? ''), tempat: String(x.tempat ?? ''), mulai: String(x.mulai ?? ''), selesai: String(x.selesai ?? ''),
      kini: !!x.kini, deskripsi: String(x.deskripsi ?? ''), tautan: String(x.tautan ?? ''),
    }));
    if (!/^data:image\/(jpeg|png|webp);base64,/.test(k.foto)) k.foto = '';
    const g = o.gaya && typeof o.gaya === 'object' ? o.gaya : {};
    if (TEMPLATE.some(t => t.id === g.template)) k.gaya.template = g.template;
    if (/^#[0-9a-f]{6}$/i.test(g.warna || '')) k.gaya.warna = g.warna;
    if (FONT[g.font]) k.gaya.font = g.font;
    if (JUDUL[g.judul]) k.gaya.judul = g.judul;
    if (['kecil', 'normal', 'besar'].includes(g.ukuran)) k.gaya.ukuran = g.ukuran;
    return k;
  };
  const isiKosong = d => !(d.foto || d.nama || d.jabatan || d.email || d.telepon || d.lokasi || d.ringkasan || d.keahlian || d.bahasa || d.sertifikat
    || d.linkedin || d.github || d.situs || LIST.some(f => d[f].some(x => x.posisi || x.tempat || x.deskripsi)));

  /* ---------------- util ---------------- */
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const baris = s => String(s || '').split('\n').map(x => x.replace(/^\s*[-•*·]\s*/, '').trim()).filter(Boolean);
  const urlAman = s => {
    s = String(s || '').trim();
    if (!s) return '';
    if (!/^https?:\/\//i.test(s)) s = 'https://' + s;
    try { const x = new URL(s); return /^https?:$/.test(x.protocol) && x.hostname.includes('.') ? x.href : ''; } catch { return ''; }
  };
  const campur = (a, b, t) => {
    const p = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
    const x = p(a), y = p(b);
    return `rgb(${x.map((v, i) => Math.round(v * t + y[i] * (1 - t))).join(',')})`;
  };
  const tampilUrl = h => h.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
  const unduh = (nama, href) => { const a = document.createElement('a'); a.href = href; a.download = nama; document.body.append(a); a.click(); a.remove(); };
  const namaFile = (ext) => ('CV ' + (data.nama || 'saya')).trim().replace(/[\\/:*?"<>|]+/g, '').replace(/\s+/g, '-') + '.' + ext;
  let toastT;
  function toast(msg) { const t = $('#toast'); t.textContent = msg; t.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('on'), 3200); }

  const IKON = {
    email: '<path d="m22 7-8.99 5.73a2 2 0 0 1-2.02 0L2 7"/><rect x="2" y="4" width="20" height="16" rx="2"/>',
    telepon: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>',
    lokasi: '<path d="M20 10c0 5-5.5 10.2-7.4 11.8a1 1 0 0 1-1.2 0C9.5 20.2 4 15 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
    linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
    github: '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.1-1.3-.3-2.5-1-3.5.3-1.2.3-2.4 0-3.5 0 0-1 0-3 1.5-2.6-.5-5.4-.5-8 0C6 2 5 2 5 2c-.3 1.1-.3 2.3 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.4.5-.7 1-.8 1.6-.2.6-.3 1.3-.2 1.9v4"/><path d="M9 18c-4.5 2-5-2-7-2"/>',
    situs: '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
  };
  const ik = n => `<svg class="ci" viewBox="0 0 24 24" aria-hidden="true">${IKON[n]}</svg>`;

  /* ---------------- membangun isi CV ---------------- */
  function kontakList(d) {
    const L = [];
    if (d.email) L.push({ n: 'email', t: d.email, h: 'mailto:' + d.email.trim() });
    if (d.telepon) L.push({ n: 'telepon', t: d.telepon, h: 'tel:' + d.telepon.replace(/[^\d+]/g, '') });
    if (d.lokasi) L.push({ n: 'lokasi', t: d.lokasi });
    const li = d.linkedin.trim().replace(/^(https?:\/\/)?(www\.)?linkedin\.com\/in\//i, '').replace(/\/$/, '');
    if (li) L.push({ n: 'linkedin', t: 'linkedin.com/in/' + li, h: 'https://www.linkedin.com/in/' + encodeURIComponent(li) });
    const gh = d.github.trim().replace(/^(https?:\/\/)?(www\.)?github\.com\//i, '').replace(/^@/, '').replace(/\/$/, '');
    if (gh) L.push({ n: 'github', t: 'github.com/' + gh, h: 'https://github.com/' + encodeURIComponent(gh) });
    const s = urlAman(d.situs);
    if (s) L.push({ n: 'situs', t: tampilUrl(s), h: s });
    return L;
  }
  const kontakHtml = (L, kelas) => `<ul class="${kelas}">${L.map(k => `<li>${ik(k.n)}${k.h ? `<a href="${esc(k.h)}">${esc(k.t)}</a>` : `<span>${esc(k.t)}</span>`}</li>`).join('')}</ul>`;
  const poin = s => { const b = baris(s); return !b.length ? '' : b.length === 1 ? `<p class="dsk">${esc(b[0])}</p>` : `<ul class="poin">${b.map(x => `<li>${esc(x)}</li>`).join('')}</ul>`; };
  const tanggal = (x, J) => { const a = x.mulai.trim(), b = x.kini ? J.kini : x.selesai.trim(); return a && b ? `${esc(a)} – ${esc(b)}` : esc(a || b); };

  function entri(x, J, jenis) {
    const tgl = jenis === 'proyek' ? '' : tanggal(x, J);
    const href = jenis === 'proyek' ? urlAman(x.tautan) : '';
    const sub = jenis === 'proyek' ? (href ? `<a href="${esc(href)}">${esc(tampilUrl(href))}</a>` : '') : esc(x.tempat);
    return `<div class="en"><div class="en-a"><b>${esc(x.posisi)}</b>${tgl ? `<span class="tgl">${tgl}</span>` : ''}</div>${sub ? `<div class="en-b">${sub}</div>` : ''}${poin(x.deskripsi)}</div>`;
  }
  const judul = t => `<h2 class="jd"><span>${esc(t)}</span></h2>`;

  /* hasil: { kepala, sisi (html | ''), blok: [html] } blok = potongan yang tidak dipisah antarhalaman */
  function susun(d, T) {
    const J = JUDUL[d.gaya.judul] || JUDUL.id, dua = T.kolom !== 'satu';
    const L = kontakList(d), foto = d.foto ? `<img class="foto ${T.foto}" src="${d.foto}" alt="">` : '';
    const nama = `<h1 class="nm">${esc(d.nama || ' ')}</h1>${d.jabatan ? `<p class="jb">${esc(d.jabatan)}</p>` : ''}`;
    const kepala = dua && T.kepala === 'utama'
      ? `<header class="kepala"><div class="kp-t">${nama}</div></header>`
      : `<header class="kepala">${foto && !dua ? foto : ''}${foto && dua && T.kepala === 'atas' ? foto : ''}<div class="kp-t">${nama}${dua ? '' : kontakHtml(L, 'kontak baris')}</div>${dua && T.kepala === 'atas' ? kontakHtml(L, 'kontak tumpuk') : ''}</header>`;

    const blok = [];
    const bagian = (jd, isi) => { if (!isi.length) return; blok.push(`<section class="bg">${judul(jd)}${isi[0]}</section>`); isi.slice(1).forEach(h => blok.push(`<section class="bg lanjut">${h}</section>`)); };
    if (d.ringkasan.trim()) bagian(J.profil, [`<p class="ringkas">${esc(d.ringkasan.trim()).replace(/\n+/g, '<br>')}</p>`]);
    bagian(J.pengalaman, d.pengalaman.filter(x => x.posisi || x.tempat || x.deskripsi).map(x => entri(x, J, 'pengalaman')));
    bagian(J.pendidikan, d.pendidikan.filter(x => x.posisi || x.tempat || x.deskripsi).map(x => entri(x, J, 'pendidikan')));
    bagian(J.proyek, d.proyek.filter(x => x.posisi || x.deskripsi).map(x => entri(x, J, 'proyek')));

    const keah = baris(d.keahlian), bhs = baris(d.bahasa), ser = baris(d.sertifikat);
    let sisi = '';
    if (dua) {
      const s = [];
      if (foto && T.kepala === 'utama') s.push(`<div class="sisi-foto">${foto}</div>`);
      if (L.length && T.kepala === 'utama') s.push(`<section class="bg">${judul(J.kontak)}${kontakHtml(L, 'kontak tumpuk')}</section>`);
      if (keah.length) s.push(`<section class="bg">${judul(J.keahlian)}<ul class="daftar-s">${keah.map(x => `<li>${esc(x)}</li>`).join('')}</ul></section>`);
      if (bhs.length) s.push(`<section class="bg">${judul(J.bahasa)}<ul class="daftar-s">${bhs.map(x => `<li>${esc(x)}</li>`).join('')}</ul></section>`);
      if (ser.length) s.push(`<section class="bg">${judul(J.sertifikat)}<ul class="daftar-s">${ser.map(x => `<li>${esc(x)}</li>`).join('')}</ul></section>`);
      sisi = s.join('');
    } else {
      if (keah.length) bagian(J.keahlian, [`<ul class="chip">${keah.map(x => `<li>${esc(x)}</li>`).join('')}</ul>`]);
      if (bhs.length) bagian(J.bahasa, [`<ul class="chip">${bhs.map(x => `<li>${esc(x)}</li>`).join('')}</ul>`]);
      if (ser.length) bagian(J.sertifikat, [`<ul class="poin">${ser.map(x => `<li>${esc(x)}</li>`).join('')}</ul>`]);
    }
    return { kepala, sisi, blok };
  }

  /* ---------------- halaman A4 + pemisah halaman ---------------- */
  function gayaHalaman(el, d, T) {
    el.className = `lembar t-${T.id} k-${T.kolom} u-${d.gaya.ukuran}`;
    const a = d.gaya.warna || T.warna;
    /* campuran warna dihitung di sini (bukan color-mix CSS) supaya PNG lewat html2canvas tetap benar */
    el.style.setProperty('--aksen', a);
    el.style.setProperty('--a10', campur(a, '#ffffff', 0.10));
    el.style.setProperty('--a25', campur(a, '#ffffff', 0.25));
    el.style.setProperty('--a35', campur(a, '#ffffff', 0.35));
    el.style.setProperty('--a-tua', campur(a, '#111111', 0.70));
    el.style.setProperty('--a-gelap', campur(a, '#12151c', 0.18));
    el.style.setProperty('--font', FONT[d.gaya.font || T.font]);
    el.lang = d.gaya.judul === 'zh' ? 'zh' : d.gaya.judul;
  }
  function halamanBaru(d, T, pertama, isi) {
    const p = document.createElement('div');
    gayaHalaman(p, d, T);
    const sisi = T.kolom === 'satu' ? '' : `<aside class="sisi">${pertama ? isi.sisi : ''}</aside>`;
    const kep = pertama && T.kepala === 'atas' ? isi.kepala : '';
    p.innerHTML = `${kep}<div class="badan">${T.kolom === 'kanan' ? '' : sisi}<div class="utama"></div>${T.kolom === 'kanan' ? sisi : ''}</div>`;
    if (!pertama) p.classList.add('lanjutan');
    return p;
  }
  const meluap = el => el.scrollHeight > el.clientHeight + 1;

  /* susun ke dalam wadah; kembalikan jumlah halaman */
  function tata(wadah, d) {
    const T = TEMPLATE.find(t => t.id === d.gaya.template) || TEMPLATE[0];
    const isi = susun(d, T);
    wadah.textContent = '';
    let hal = halamanBaru(d, T, true, isi);
    wadah.append(hal);
    let utama = $('.utama', hal);
    const antre = T.kepala === 'utama' && T.kolom !== 'satu' ? [isi.kepala, ...isi.blok] : isi.blok;
    for (const html of antre) {
      const t = document.createElement('template');
      t.innerHTML = html;
      const el = t.content.firstElementChild;
      utama.append(el);
      if (meluap(utama) && utama.children.length > 1) {
        el.remove();
        hal = halamanBaru(d, T, false, isi);
        wadah.append(hal);
        utama = $('.utama', hal);
        if (el.classList.contains('lanjut')) el.classList.add('sambung');
        utama.append(el);
      }
    }
    return wadah.children.length;
  }

  /* ---------------- pratinjau ---------------- */
  const halamanEl = $('#halaman'), skala = $('#skala'), kanvas = $('#kanvas');
  let pakaiContoh = false;
  function render() {
    pakaiContoh = isiKosong(data);
    const d = pakaiContoh ? { ...rapikan(CONTOH), gaya: data.gaya } : data;
    const n = tata(halamanEl, d);
    $('#info').innerHTML = `<b>${esc(u('halaman')(n))}</b>${pakaiContoh ? ` · <span class="redup">${esc(u('contoh'))}</span>` : ''}`;
    halamanEl.classList.toggle('contoh', pakaiContoh);
    sesuaikan();
    renderGaleriNanti();
  }
  function sesuaikan() {
    const w = kanvas.clientWidth - 32, s = Math.min(1, w / 794);
    skala.style.setProperty('--s', s.toFixed(4));
    skala.style.width = 794 * s + 'px';
    skala.style.height = halamanEl.offsetHeight * s + 'px';
  }
  new ResizeObserver(sesuaikan).observe(kanvas);

  /* ---------------- galeri template (miniatur berisi data sendiri / contoh) ---------------- */
  let filter = 'semua', galeriT;
  function renderGaleriNanti() { clearTimeout(galeriT); galeriT = setTimeout(renderGaleri, 250); }
  function renderGaleri() {
    const g = $('#galeri');
    if ($('#p-tpl').hidden) return;
    const base = pakaiContoh ? rapikan(CONTOH) : data;
    g.textContent = '';
    for (const T of TEMPLATE) {
      if (filter !== 'semua' && !T.kat.includes(filter)) continue;
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'mini'; b.dataset.id = T.id;
      b.setAttribute('aria-pressed', String(data.gaya.template === T.id));
      b.innerHTML = `<div class="mini-k"><div class="mini-s"></div></div><span>${esc(T.nama)}${T.ats ? '<em>ATS</em>' : ''}</span>`;
      g.append(b);
      const d = { ...base, gaya: { ...data.gaya, template: T.id, warna: data.gaya.warna, font: data.gaya.font } };
      const w = $('.mini-s', b); tata(w, d);
      while (w.children.length > 1) w.lastElementChild.remove();
    }
    skalaMini();
  }
  const skalaMini = () => $$('.mini-k').forEach(k => $('.mini-s', k).style.setProperty('--ms', (k.clientWidth / 794).toFixed(4)));
  new ResizeObserver(skalaMini).observe($('#galeri'));
  $('#galeri').addEventListener('click', e => {
    const b = e.target.closest('.mini'); if (!b) return;
    data.gaya.template = b.dataset.id;
    $$('.mini').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    swatch(); simpan(); render();
    if (matchMedia('(max-width: 960px)').matches) toast(TEMPLATE.find(t => t.id === b.dataset.id).nama);
  });
  $$('.filter button').forEach(b => b.addEventListener('click', () => {
    filter = b.dataset.f;
    $$('.filter button').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    renderGaleri();
  }));

  /* ---------------- formulir ---------------- */
  const form = $('#p-data');
  const FIELD = ['nama', 'jabatan', 'email', 'telepon', 'lokasi', 'ringkasan', 'keahlian', 'bahasa', 'sertifikat', 'linkedin', 'github', 'situs'];
  function isiForm() {
    for (const f of FIELD) form.elements[f].value = data[f];
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
    $$('[data-k]', n).forEach(el => {
      const k = el.dataset.k;
      if (el.type === 'checkbox') el.checked = !!x[k]; else el.value = x[k] || '';
    });
    terjemah(n);
    kartuJudul(n, x);
    const sel = $('[data-k="selesai"]', n); if (sel) sel.disabled = !!x.kini;
    return n;
  }
  const kartuJudul = (n, x) => { $('.kartu-judul', n).textContent = [x.posisi, x.tempat].filter(Boolean).join(' · ') || u('baru'); };

  form.addEventListener('input', e => {
    const el = e.target;
    if (el.name && FIELD.includes(el.name)) data[el.name] = el.value;
    else if (el.dataset.k) {
      const k = el.closest('.kartu'), jenis = k.parentElement.dataset.daftar, x = data[jenis][+k.dataset.i];
      x[el.dataset.k] = el.type === 'checkbox' ? el.checked : el.value;
      if (el.dataset.k === 'kini') $('[data-k="selesai"]', k).disabled = el.checked;
      kartuJudul(k, x);
    } else return;
    simpan(); renderNanti();
  });
  let renderT; const renderNanti = () => { clearTimeout(renderT); renderT = setTimeout(render, 120); };

  form.addEventListener('click', e => {
    const tb = e.target.closest('[data-tambah]');
    if (tb) {
      const jenis = tb.dataset.tambah, x = { posisi: '', tempat: '', mulai: '', selesai: '', kini: false, deskripsi: '', tautan: '' };
      if (data[jenis].length >= 30) return;
      data[jenis].push(x);
      const w = $(`[data-daftar="${jenis}"]`, form), n = kartu(jenis, x, data[jenis].length - 1);
      w.append(n); $('input', n).focus();
      simpan(); render(); return;
    }
    const k = e.target.closest('.kartu'); if (!k) return;
    const jenis = k.parentElement.dataset.daftar, i = +k.dataset.i, arr = data[jenis];
    if (e.target.closest('[data-hapus]')) { arr.splice(i, 1); }
    else if (e.target.closest('[data-geser]')) {
      const j = i + +e.target.closest('[data-geser]').dataset.geser;
      if (j < 0 || j >= arr.length) return;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    } else return;
    const w = k.parentElement; w.textContent = ''; arr.forEach((x, n) => w.append(kartu(jenis, x, n)));
    simpan(); render();
  });

  /* foto: potong persegi di tengah, perkecil ke 400 px */
  const fotoTampil = () => {
    const p = $('#foto-prev');
    p.style.backgroundImage = data.foto ? `url("${data.foto}")` : '';
    p.classList.toggle('ada', !!data.foto);
    $('#foto-hapus').hidden = !data.foto;
    $('[data-u="fPilih"]').textContent = u(data.foto ? 'fGanti' : 'fPilih');
  };
  $('#foto').addEventListener('change', async e => {
    const f = e.target.files[0]; e.target.value = '';
    if (!f || !/^image\/(png|jpeg|webp)$/.test(f.type)) { if (f) toast(u('fotoGagal')); return; }
    try {
      const bmp = await createImageBitmap(f);
      const s = Math.min(bmp.width, bmp.height), c = document.createElement('canvas'), out = Math.min(400, s);
      c.width = c.height = out;
      const g = c.getContext('2d');
      g.fillStyle = '#fff'; g.fillRect(0, 0, out, out);
      g.drawImage(bmp, (bmp.width - s) / 2, (bmp.height - s) / 2, s, s, 0, 0, out, out);
      data.foto = c.toDataURL('image/jpeg', 0.86);
      fotoTampil(); simpan(); render();
    } catch { toast(u('fotoGagal')); }
  });
  $('#foto-hapus').addEventListener('click', () => { data.foto = ''; fotoTampil(); simpan(); render(); });

  /* gaya */
  function swatch() {
    const w = $('#swatch'), T = TEMPLATE.find(t => t.id === data.gaya.template), aktif = data.gaya.warna || T.warna;
    w.innerHTML = WARNA.map(c => `<button type="button" style="--c:${c}" data-c="${c}" aria-label="${c}" aria-pressed="${c === aktif}"></button>`).join('')
      + `<label class="sw-bebas" aria-label="Warna lain"><input type="color" value="${aktif}"><span style="--c:${aktif}"></span></label>`;
  }
  $('#swatch').addEventListener('click', e => { const b = e.target.closest('[data-c]'); if (!b) return; data.gaya.warna = b.dataset.c; swatch(); simpan(); render(); });
  $('#swatch').addEventListener('input', e => { if (e.target.type !== 'color') return; data.gaya.warna = e.target.value; e.target.nextElementSibling.style.setProperty('--c', e.target.value); simpan(); renderNanti(); });
  $('#swatch').addEventListener('change', e => { if (e.target.type === 'color') swatch(); });
  $('#g-font').addEventListener('change', e => { data.gaya.font = e.target.value; simpan(); render(); });
  $('#g-judul').addEventListener('change', e => { data.gaya.judul = e.target.value; simpan(); render(); });
  $('#g-ukuran').addEventListener('change', e => { data.gaya.ukuran = e.target.value; simpan(); render(); });

  /* tab editor */
  function bukaTab(id) {
    $$('.tabs [role=tab]').forEach(t => { const on = t.id === id; t.setAttribute('aria-selected', String(on)); $('#' + t.getAttribute('aria-controls')).hidden = !on; });
    $$('.langkah li').forEach((l, i) => l.classList.toggle('on', i === (id === 'tab-data' ? 0 : 1)));
    if (id === 'tab-tpl') renderGaleri();
  }
  $$('.tabs [role=tab]').forEach(t => t.addEventListener('click', () => bukaTab(t.id)));
  $('.tabs').addEventListener('keydown', e => {
    if (!['ArrowLeft', 'ArrowRight'].includes(e.key)) return;
    const t = $$('.tabs [role=tab]'), i = t.indexOf(document.activeElement), j = (i + (e.key === 'ArrowRight' ? 1 : -1) + t.length) % t.length;
    t[j].focus(); bukaTab(t[j].id);
  });
  $('#ke-tpl').addEventListener('click', () => { bukaTab('tab-tpl'); $('.editor').scrollIntoView({ behavior: 'smooth', block: 'start' }); });

  /* menu berkas */
  const menuBtn = $('#menu-btn'), menuIsi = $('#menu-isi');
  const menu = buka => { menuIsi.hidden = !buka; menuBtn.setAttribute('aria-expanded', String(buka)); };
  menuBtn.addEventListener('click', e => { e.stopPropagation(); menu(menuIsi.hidden); });
  document.addEventListener('click', e => { if (!e.target.closest('#menu')) menu(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') menu(false); });
  $('#m-simpan').addEventListener('click', () => {
    menu(false);
    const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }));
    unduh(namaFile('json'), url); setTimeout(() => URL.revokeObjectURL(url), 2000);
  });
  $('#m-buka').addEventListener('change', async e => {
    const f = e.target.files[0]; e.target.value = ''; menu(false);
    if (!f) return;
    try {
      if (f.size > 8e6) throw 0;
      const o = JSON.parse(await f.text());
      if (!o || typeof o !== 'object' || Array.isArray(o)) throw 0;
      data = rapikan(o); isiForm(); simpan(); render(); toast(u('jsonOk'));
    } catch { toast(u('jsonGagal')); }
  });
  $('#m-contoh').addEventListener('click', () => { menu(false); data = { ...rapikan(CONTOH), gaya: data.gaya }; isiForm(); simpan(); render(); });
  $('#m-kosong').addEventListener('click', () => {
    menu(false);
    if (!confirm(u('yakinKosong'))) return;
    data = kosong(); try { localStorage.removeItem(KUNCI); } catch { /* abaikan */ }
    isiForm(); render(); toast(u('dikosongkan'));
  });

  /* PDF lewat dialog cetak browser: teks asli (bisa diseleksi, ramah ATS), tautan bisa diklik */
  const dlg = $('#dlg-pdf');
  $('#unduh-pdf').addEventListener('click', () => { if (dlg.showModal) dlg.showModal(); else cetak(); });
  $('#pdf-batal').addEventListener('click', () => dlg.close());
  $('#pdf-lanjut').addEventListener('click', () => { dlg.close(); cetak(); });
  dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
  function cetak() {
    const judulLama = document.title;
    document.title = namaFile('pdf').replace(/\.pdf$/, '');
    setTimeout(() => { window.print(); document.title = judulLama; }, 60);
  }

  /* PNG: tiap halaman dirender ulang tanpa skala lalu digambar html2canvas (2x, ±1588 × 2246 px) */
  $('#unduh-png').addEventListener('click', async () => {
    if (!window.html2canvas) { toast(u('pngGagal')); return; }
    const btn = $('#unduh-png'); btn.disabled = true; toast(u('pngProses'));
    const luar = $('#render-luar');
    try {
      const d = pakaiContoh ? { ...rapikan(CONTOH), gaya: data.gaya } : data;
      const n = tata(luar, d);
      if (document.fonts?.ready) await document.fonts.ready;
      for (let i = 0; i < n; i++) {
        const c = await window.html2canvas(luar.children[i], { scale: 2, backgroundColor: null, useCORS: false, logging: false, width: 794, height: 1122 });
        const blob = await new Promise(r => c.toBlob(r, 'image/png'));
        const url = URL.createObjectURL(blob);
        unduh(namaFile('png').replace(/\.png$/, n > 1 ? `-hal${i + 1}.png` : '.png'), url);
        setTimeout(() => URL.revokeObjectURL(url), 4000);
        await new Promise(r => setTimeout(r, 350));
      }
      toast(u('pngOk')(n));
    } catch (err) { console.warn(err); toast(u('pngGagal')); }
    finally { luar.textContent = ''; btn.disabled = false; }
  });

  /* tombol lompat (HP) */
  const lompat = $('#lompat');
  let diPratinjau = false;
  new IntersectionObserver(es => { diPratinjau = es[0].isIntersecting; lompat.textContent = u(diPratinjau ? 'ubah' : 'lihat'); }, { threshold: 0.15 }).observe($('.pratinjau'));
  lompat.addEventListener('click', () => (diPratinjau ? $('.editor') : $('.pratinjau')).scrollIntoView({ behavior: 'smooth', block: 'start' }));

  /* bahasa antarmuka */
  function terjemah(r = document) {
    $$('[data-u]', r).forEach(el => { const v = u(el.dataset.u); if (typeof v === 'string') el.innerHTML = v.replace(/&(?!amp;|lt;|gt;)/g, '&amp;'); });
    $$('[data-ph]', r).forEach(el => { el.placeholder = u(el.dataset.ph); });
  }
  function setUi(l) {
    ui = UI[l] ? l : 'id';
    document.documentElement.lang = ui;
    $$('[data-ui]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.ui === ui)));
    terjemah();
    $$('.kartu').forEach(k => kartuJudul(k, data[k.parentElement.dataset.daftar][+k.dataset.i]));
    fotoTampil();
    lompat.textContent = u(diPratinjau ? 'ubah' : 'lihat');
    try { localStorage.setItem(KUNCI_UI, ui); } catch { /* abaikan */ }
    render();
  }
  $$('[data-ui]').forEach(b => b.addEventListener('click', () => setUi(b.dataset.ui)));

  /* ---------------- mulai ---------------- */
  let awalUi = (navigator.language || 'id').toLowerCase().startsWith('id') ? 'id' : 'en';
  try {
    const s = localStorage.getItem(KUNCI); if (s) data = rapikan(JSON.parse(s));
    const l = localStorage.getItem(KUNCI_UI); if (UI[l]) awalUi = l;
  } catch { /* penyimpanan tidak tersedia: mulai kosong */ }
  const q = new URLSearchParams(location.search).get('lang'); if (UI[q]) awalUi = q;
  isiForm();
  bukaTab('tab-data');
  setUi(awalUi);
})();
