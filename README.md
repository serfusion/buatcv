# Curriculum Vitae

Alat buat CV gratis yang berjalan penuh di browser. Live: https://superfal-dev.com/tools/buatcvgratis/

- Isi data diri, pengalaman, pendidikan, keahlian, bahasa, sertifikat, proyek dan tautan (foto opsional, dipotong persegi).
- 8 template (Modern, Klasik, Minimal, Panel Samping, Linimasa, Ringkas, Anggun, Malam) dengan filter Formal / Berwarna / Kreatif / Gelap;
  warna aksen, huruf dan ukuran teks bisa diatur. Template bertanda ATS memakai satu kolom.
- Pratinjau A4 langsung, terpecah otomatis ke halaman berikutnya tanpa memotong entri.
- Unduh PDF lewat dialog cetak browser (teks asli: bisa diseleksi, terbaca ATS, tautan bisa diklik) atau PNG per halaman (1588 × 2244 px).
- Judul bagian CV dalam Bahasa Indonesia, English, atau 中文; antarmuka ID / EN.
- Data tersimpan otomatis di `localStorage` perangkat; bisa disimpan / dibuka sebagai `.json`. Tidak ada server, tidak ada pendaftaran.

## Build

```bash
npm ci
npm run build      # src/ -> dist/ (index.html, app.js, style.css, vendor/html2canvas.min.js)
npm run dev        # build lalu sajikan dist/ di http://localhost:8080
```

`dist/` berisi file statis saja; salin ke server mana pun. Di superfal-dev.com hasilnya ada di
`serfusion/portofolio` → `projects/portofolio/tools/buatcvgratis/`.

## Dikerjakan dengan teknik REA

1. **Riset**: membedah alat sejenis (alur isi data → template → unduh, pratinjau A4, ekspor PDF/PNG/JSON, privasi lokal)
   untuk menentukan fitur yang wajib ada. Kode, nama, dan tampilan dibuat sendiri, tidak disalin.
2. **Eksekusi**: membangun ulang dengan JavaScript murni tanpa framework; satu-satunya pustaka pihak ketiga adalah
   html2canvas (MIT) untuk PNG, disimpan lokal di `vendor/`.
3. **Audit**: uji di Chromium (Playwright): semua template, pemecahan halaman, PDF, PNG, JSON, simpan otomatis,
   bahasa, tampilan HP, dan konsol tanpa galat.
