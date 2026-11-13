# Curriculum Vitae

Alat buat CV gratis yang berjalan penuh di browser. Live: https://superfal-dev.com/tools/buatcvgratis/

- **Isi data**: data diri (foto dengan pemotong + zoom, tanggal lahir), pengalaman, pendidikan, keahlian, bahasa, sertifikat,
  proyek, bagian bebas (Organisasi, Penghargaan, …), tautan (LinkedIn, GitHub, situs, Instagram, X). Bagian bisa dilipat.
- **40 template** dengan saringan Formal / Berwarna / Kreatif / Gelap / ATS, miniatur memakai isi CV sendiri,
  tombol ‹ › di atas kertas, 20 huruf (di-host sendiri), 12 warna + warna bebas, 3 ukuran teks.
- **Judul bagian dalam 19 bahasa** (ID, EN, MS, FIL, VI, TH, ZH, JA, KO, HI, DE, FR, ES, PT, IT, NL, PL, TR, RU); bulan lahir ikut bahasa.
- **Pratinjau A4** langsung; isi berpindah halaman per entri, judul tidak ditinggal sendirian, entri yang sangat panjang dipecah per poin.
- **Unduh PDF langsung** (tanpa dialog cetak): gambar halaman + lapisan teks asli tak terlihat di posisi yang sama,
  jadi PDF tampak persis seperti pratinjau tetapi teksnya bisa dicari, disalin, dan dibaca ATS; email/telepon/tautan bisa diklik;
  nama, jabatan, dan keahlian masuk metadata PDF. Penulis PDF ditulis sendiri (`src/js/pdf.js`).
- **PNG** 1588 × 2244 px per halaman, **cetak lewat browser**, **simpan / buka .json**, simpan otomatis di `localStorage`.
- Antarmuka ID / EN, tampilan HP dengan navigasi bawah, mode gelap mengikuti sistem. Tidak ada server, iklan, atau pendaftaran.

## Build

```bash
npm ci
npm run build      # src/ -> dist/ (index.html, app.js, *.css, fonts/, vendor/)
npm run dev        # build lalu sajikan dist/ di http://localhost:8080
```

`dist/` berisi file statis saja. Di superfal-dev.com hasilnya disalin ke
`serfusion/portofolio` → `projects/portofolio/tools/buatcvgratis/`.

| File | Isi |
|---|---|
| `src/js/main.js` | antarmuka, simpan otomatis, ekspor |
| `src/js/template.js` | 40 template, penyusun isi, pemecah halaman A4 |
| `src/js/pdf.js` | penulis PDF (gambar + lapisan teks + tautan + metadata) |
| `src/js/teks.js` | teks antarmuka ID/EN dan judul CV 19 bahasa |
| `src/cv.css` | gaya lembar CV dan semua template |
| `alat/glyphless.py` | pembuat font "tanpa glyph" untuk lapisan teks PDF (`src/aset/glyphless.ttf`) |

## Dikerjakan dengan REA (Reverse Engineer Anything)

Metode [REA](https://github.com/serfusion/rea): lihat fitur yang disukai, pahami cara kerjanya dengan bukti, lalu bangun versi sendiri.

1. **Observasi**: alat CV sejenis dibuka di Chromium (Playwright), alurnya dipetakan (Isi data → Template → Unduh, bagian yang bisa
   dilipat, tombol template ‹ ›, menu Berkas, banner isi contoh, saringan template, pratinjau A4 berhalaman).
2. **Bukti teknis**: daftar modul skrip publiknya (bahasa, template, pemecah halaman, PDF, ekspor) dan cara PDF-nya dibuat
   (gambar halaman + teks tak terlihat dengan font tanpa glyph + anotasi tautan).
3. **Bangun versi sendiri**: semua kode, desain template, dan teks ditulis ulang dari nol; tidak ada kode, gambar, atau merek
   pihak lain yang disalin. Tambahan di atas target: bagian bebas, saringan ATS, warna bebas, ukuran teks, navigasi HP, mode gelap,
   huruf di-host sendiri (tanpa Google Fonts / iklan / pelacak).
4. **Audit**: 40 template, pemecahan halaman, PDF (teks bisa diekstrak, metadata, multi-halaman, aksara CJK), PNG, JSON,
   pemotong foto, cetak, tampilan HP, dan konsol tanpa galat.

Lisensi pihak ketiga: html2canvas (MIT) di `vendor/`, huruf Fontsource (SIL OFL 1.1) di `fonts/`.
