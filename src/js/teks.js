/* Teks antarmuka (ID / EN) dan judul bagian CV (19 bahasa). */

export const UI = {
  id: {
    panduan: 'Panduan', faq: 'FAQ', alatLain: 'superfal-dev.com',
    tData: 'Isi data', tTpl: 'Template', tPra: 'Pratinjau',
    ctaKet: 'Sudah terisi? Pilih desain yang cocok, lalu unduh.', ctaTpl: 'Desain sudah dipilih? Lihat hasilnya, lalu unduh.', lihatPra: 'Lihat pratinjau',
    sDiri: 'Data diri', fPilih: 'Pilih foto', fGanti: 'Ganti foto', fAtur: 'Atur', fHapus: 'Hapus', fKet: 'Opsional. JPG, PNG atau WebP.',
    nama: 'Nama lengkap', phNama: 'Contoh: Dimas Prasetyo', jabatan: 'Jabatan atau profesi', phJabatan: 'Contoh: Staf Keuangan',
    telepon: 'Telepon', lokasi: 'Domisili', phLokasi: 'Contoh: Surabaya', lahir: 'Tanggal lahir', tgl: 'Tgl', bulan: 'Bulan', tahun: 'Tahun',
    ringkasan: 'Ringkasan diri', phRingkasan: 'Dua atau tiga kalimat tentang pengalaman, keahlian utama, dan pekerjaan yang kamu tuju.',
    sPeng: 'Pengalaman kerja', tbPeng: 'Tambah pengalaman', sPend: 'Pendidikan', tbPend: 'Tambah pendidikan',
    sKeah: 'Keahlian', keahlianKet: 'Tekan Enter untuk keahlian berikutnya.', phKeahlian: 'Microsoft Excel\nKomunikasi\nManajemen waktu',
    sBahasa: 'Bahasa', phBahasa: 'Indonesia (penutur asli)\nInggris (menengah)', sSertif: 'Sertifikat & pelatihan', phSertif: 'Pelatihan K3 (2024)',
    sProy: 'Proyek', tbProy: 'Tambah proyek', sLain: 'Bagian lain', tbLain: 'Tambah bagian', lainKet: 'Misalnya Organisasi, Penghargaan, atau Publikasi.',
    sTaut: 'Tautan', situs: 'Situs / portofolio', ops: 'opsional', lanjut: 'Lanjut pilih template',
    posisi: 'Jabatan', perusahaan: 'Perusahaan / instansi', mulai: 'Mulai', selesai: 'Selesai', kini: 'Masih bekerja di sini', kiniStudi: 'Masih menempuh studi',
    deskripsi: 'Tugas & pencapaian (satu poin per baris)', gelar: 'Jurusan / gelar', sekolah: 'Sekolah / kampus', catatan: 'Catatan (IPK, organisasi, prestasi)',
    namaProyek: 'Nama proyek', tautanProyek: 'Tautan', deskripsi2: 'Deskripsi', judulBagian: 'Judul bagian', isiBagian: 'Isi (satu poin per baris)',
    phMulai: 'Jan 2023', phSelesai: 'Des 2024', naik: 'Naik', turun: 'Turun', hapus: 'Hapus', baru: 'Entri baru',
    huruf: 'Huruf', bawaan: 'Bawaan template', bahasaJudul: 'Bahasa judul', warna: 'Warna aksen', ukuran: 'Ukuran teks',
    uKecil: 'Kecil', uNormal: 'Normal', uBesar: 'Besar', template: 'Template', tplKet: 'Miniatur memakai isi CV-mu (atau contoh bila masih kosong).',
    fSemua: 'Semua', fFormal: 'Formal', fWarna: 'Berwarna', fKreatif: 'Kreatif', fGelap: 'Gelap', fAts: 'ATS',
    nDesain: (n, f) => `${n} desain${f ? ' di saringan ini' : ''}. Bertanda ATS = satu kolom, paling aman untuk sistem penyaring lamaran.`,
    dipakai: 'Dipakai', sebelumnya: 'Template sebelumnya', berikutnya: 'Template berikutnya',
    berkas: 'Berkas', mCetak: 'Cetak lewat browser', mCetakKet: 'Atau simpan PDF dari dialog cetak', mSimpan: 'Simpan data ke file (.json)',
    mBuka: 'Buka data dari file', mContoh: 'Isi dengan contoh', mKosong: 'Mulai dari kosong', unduhPdf: 'Unduh PDF',
    banner: 'Ini isi contoh supaya bentuk template terlihat. Begitu kamu mulai mengetik di Isi data, kertas ini memakai datamu.',
    halaman: n => `${n} halaman A4`,
    privasi: 'CV diproses di browser ini dan tidak dikirim ke server. Data tersimpan otomatis di perangkat ini.',
    tersimpan: 'Tersimpan otomatis di browser ini', jsonOk: 'Data dimuat dari file.', jsonGagal: 'File ini tidak bisa dibaca sebagai data CV.',
    yakinKosong: 'Semua isi formulir, foto, dan pilihan template di browser ini akan dihapus. Lanjutkan?', dikosongkan: 'Formulir dikosongkan.',
    pdfProses: 'Menyiapkan PDF…', pdfOk: 'PDF diunduh.', pdfGagal: 'PDF gagal dibuat. Coba “Cetak lewat browser” di menu Berkas.',
    pngProses: 'Menyiapkan PNG…', pngOk: n => n > 1 ? `${n} file PNG diunduh (satu per halaman).` : 'PNG diunduh.', pngGagal: 'PNG gagal dibuat.',
    fotoGagal: 'Foto tidak bisa dibaca.', simpanGagal: 'Browser menolak penyimpanan lokal; simpan data ke .json agar tidak hilang.',
    potong: 'Atur foto', potongKet: 'Geser foto untuk memilih bagian. Panah untuk menggeser, + / − untuk zoom.', zoom: 'Zoom', batal: 'Batal', pakai: 'Pakai foto',
    gJudul: 'Cara membuat CV di sini',
    g: [
      ['Isi data', 'Mulai dari data diri. Foto boleh dikosongkan. Tulis pencapaian per baris, sebaiknya dengan angka (mis. “menaikkan penjualan 20%”).'],
      ['Pilih template', 'Buka tab Template atau pakai tombol ‹ › di atas kertas. Saring Formal, Berwarna, Kreatif, Gelap, atau ATS.'],
      ['Atur gaya', 'Ganti huruf, warna aksen, ukuran teks, dan bahasa judul (19 bahasa). Isi yang kamu ketik tidak ikut diterjemahkan.'],
      ['Unduh', 'Unduh PDF langsung (teks tetap bisa dicari dan dibaca ATS, tautan bisa diklik) atau PNG per halaman. Simpan juga file .json sebagai cadangan.'],
    ],
    faqJudul: 'Pertanyaan yang sering muncul',
    q: [
      ['Apakah benar gratis dan tanpa daftar?', 'Ya. Tidak ada akun, tidak ada tanda air, tidak ada batas unduhan.'],
      ['Ke mana data saya dikirim?', 'Tidak ke mana-mana. Semua diproses di browser ini dan disimpan di penyimpanan lokal perangkatmu. Mode penyamaran atau menghapus data situs akan menghapusnya, jadi simpan file .json sebagai cadangan.'],
      ['Apakah PDF-nya terbaca ATS?', 'Ya. PDF berisi gambar halaman ditambah lapisan teks asli di posisi yang sama, sehingga teks bisa dicari, disalin, dan dibaca sistem ATS. Untuk hasil paling aman pilih template bertanda ATS (satu kolom).'],
      ['CV saya lebih dari satu halaman, apa yang terjadi?', 'Isi dipindah ke halaman berikutnya per entri, judul bagian tidak ditinggal sendirian di bawah halaman, dan poin yang sangat panjang dipecah per baris.'],
      ['Bagaimana pindah ke perangkat lain?', 'Berkas → Simpan data ke file (.json), kirim file itu ke perangkat lain, lalu Berkas → Buka data dari file.'],
      ['Ukuran PNG berapa?', '1588 × 2244 piksel per halaman A4 (dua kali resolusi layar), satu file per halaman.'],
    ],
  },
  en: {
    panduan: 'Guide', faq: 'FAQ', alatLain: 'superfal-dev.com',
    tData: 'Your details', tTpl: 'Template', tPra: 'Preview',
    ctaKet: 'All filled in? Pick a design, then download.', ctaTpl: 'Picked a design? See the result, then download.', lihatPra: 'See preview',
    sDiri: 'Personal details', fPilih: 'Choose photo', fGanti: 'Change photo', fAtur: 'Adjust', fHapus: 'Remove', fKet: 'Optional. JPG, PNG or WebP.',
    nama: 'Full name', phNama: 'e.g. Dimas Prasetyo', jabatan: 'Job title', phJabatan: 'e.g. Finance Officer',
    telepon: 'Phone', lokasi: 'Location', phLokasi: 'e.g. Surabaya', lahir: 'Date of birth', tgl: 'Day', bulan: 'Month', tahun: 'Year',
    ringkasan: 'Summary', phRingkasan: 'Two or three sentences about your experience, key skills, and the role you want.',
    sPeng: 'Work experience', tbPeng: 'Add experience', sPend: 'Education', tbPend: 'Add education',
    sKeah: 'Skills', keahlianKet: 'Press Enter for the next skill.', phKeahlian: 'Microsoft Excel\nCommunication\nTime management',
    sBahasa: 'Languages', phBahasa: 'Indonesian (native)\nEnglish (intermediate)', sSertif: 'Certificates & training', phSertif: 'Workplace Safety Training (2024)',
    sProy: 'Projects', tbProy: 'Add project', sLain: 'Other sections', tbLain: 'Add section', lainKet: 'For example Organizations, Awards, or Publications.',
    sTaut: 'Links', situs: 'Website / portfolio', ops: 'optional', lanjut: 'Next: choose a template',
    posisi: 'Position', perusahaan: 'Company / organization', mulai: 'Start', selesai: 'End', kini: 'I currently work here', kiniStudi: 'Currently studying',
    deskripsi: 'Duties & achievements (one point per line)', gelar: 'Major / degree', sekolah: 'School / university', catatan: 'Notes (GPA, activities, awards)',
    namaProyek: 'Project name', tautanProyek: 'Link', deskripsi2: 'Description', judulBagian: 'Section title', isiBagian: 'Content (one point per line)',
    phMulai: 'Jan 2023', phSelesai: 'Dec 2024', naik: 'Move up', turun: 'Move down', hapus: 'Delete', baru: 'New entry',
    huruf: 'Font', bawaan: 'Template default', bahasaJudul: 'Heading language', warna: 'Accent color', ukuran: 'Text size',
    uKecil: 'Small', uNormal: 'Normal', uBesar: 'Large', template: 'Template', tplKet: 'Thumbnails use your CV content (or a sample while it is empty).',
    fSemua: 'All', fFormal: 'Formal', fWarna: 'Colorful', fKreatif: 'Creative', fGelap: 'Dark', fAts: 'ATS',
    nDesain: (n, f) => `${n} designs${f ? ' in this filter' : ''}. ATS = single column, the safest for applicant tracking systems.`,
    dipakai: 'In use', sebelumnya: 'Previous template', berikutnya: 'Next template',
    berkas: 'File', mCetak: 'Print from browser', mCetakKet: 'Or save a PDF from the print dialog', mSimpan: 'Save data to file (.json)',
    mBuka: 'Open data from file', mContoh: 'Fill with sample', mKosong: 'Start from blank', unduhPdf: 'Download PDF',
    banner: 'This is sample content so you can see the template. As soon as you type in Your details, the page uses your data.',
    halaman: n => `${n} A4 page${n > 1 ? 's' : ''}`,
    privasi: 'Your CV is processed in this browser and never sent to a server. Data autosaves on this device.',
    tersimpan: 'Autosaved in this browser', jsonOk: 'Data loaded from file.', jsonGagal: 'This file could not be read as CV data.',
    yakinKosong: 'All form data, photo and template choice in this browser will be deleted. Continue?', dikosongkan: 'Form cleared.',
    pdfProses: 'Preparing PDF…', pdfOk: 'PDF downloaded.', pdfGagal: 'PDF failed. Try “Print from browser” in the File menu.',
    pngProses: 'Preparing PNG…', pngOk: n => n > 1 ? `${n} PNG files downloaded (one per page).` : 'PNG downloaded.', pngGagal: 'PNG failed.',
    fotoGagal: 'The photo could not be read.', simpanGagal: 'This browser blocks local storage; save your data to .json so it is not lost.',
    potong: 'Adjust photo', potongKet: 'Drag the photo to choose the area. Arrow keys to move, + / − to zoom.', zoom: 'Zoom', batal: 'Cancel', pakai: 'Use photo',
    gJudul: 'How to make your CV here',
    g: [
      ['Fill in your details', 'Start with personal details; the photo is optional. Write one achievement per line, ideally with numbers (e.g. “grew sales 20%”).'],
      ['Choose a template', 'Open the Template tab or use ‹ › above the page. Filter by Formal, Colorful, Creative, Dark, or ATS.'],
      ['Style it', 'Change the font, accent color, text size, and heading language (19 languages). Your own text is not translated.'],
      ['Download', 'Download a PDF directly (text stays searchable and ATS-readable, links are clickable) or a PNG per page. Keep a .json file as a backup too.'],
    ],
    faqJudul: 'Frequently asked questions',
    q: [
      ['Is it really free with no sign-up?', 'Yes. No account, no watermark, no download limits.'],
      ['Where is my data sent?', 'Nowhere. Everything runs in this browser and is kept in your device’s local storage. Private mode or clearing site data removes it, so keep a .json backup.'],
      ['Is the PDF ATS-readable?', 'Yes. The PDF holds an image of each page plus the real text in the same positions, so it can be searched, copied, and read by ATS. For the safest result pick a template marked ATS (single column).'],
      ['What if my CV is longer than one page?', 'Content moves to the next page per entry, section headings are never left alone at the bottom, and very long entries are split by line.'],
      ['How do I move to another device?', 'File → Save data to file (.json), send it to the other device, then File → Open data from file.'],
      ['How large is the PNG?', '1588 × 2244 pixels per A4 page (twice screen resolution), one file per page.'],
    ],
  },
};

/* Judul bagian CV: kunci yang sama untuk semua bahasa */
export const JUDUL = {
  id: ['Bahasa Indonesia', 'Profil', 'Pengalaman Kerja', 'Pendidikan', 'Keahlian', 'Bahasa', 'Sertifikat & Pelatihan', 'Proyek', 'Kontak', 'Sekarang'],
  en: ['English', 'Profile', 'Work Experience', 'Education', 'Skills', 'Languages', 'Certifications & Training', 'Projects', 'Contact', 'Present'],
  ms: ['Bahasa Melayu', 'Profil', 'Pengalaman Kerja', 'Pendidikan', 'Kemahiran', 'Bahasa', 'Sijil & Latihan', 'Projek', 'Hubungi', 'Kini'],
  fil: ['Filipino', 'Profile', 'Karanasan sa Trabaho', 'Edukasyon', 'Mga Kasanayan', 'Mga Wika', 'Mga Sertipiko at Pagsasanay', 'Mga Proyekto', 'Kontak', 'Kasalukuyan'],
  vi: ['Tiếng Việt', 'Giới thiệu', 'Kinh nghiệm làm việc', 'Học vấn', 'Kỹ năng', 'Ngoại ngữ', 'Chứng chỉ & Đào tạo', 'Dự án', 'Liên hệ', 'Hiện tại'],
  th: ['ไทย', 'ประวัติโดยย่อ', 'ประสบการณ์ทำงาน', 'การศึกษา', 'ทักษะ', 'ภาษา', 'ใบรับรองและการอบรม', 'โครงการ', 'ติดต่อ', 'ปัจจุบัน'],
  zh: ['中文', '个人简介', '工作经历', '教育背景', '专业技能', '语言能力', '证书与培训', '项目经历', '联系方式', '至今'],
  ja: ['日本語', '自己紹介', '職務経歴', '学歴', 'スキル', '語学', '資格・研修', 'プロジェクト', '連絡先', '現在'],
  ko: ['한국어', '자기소개', '경력', '학력', '기술', '언어', '자격증 및 교육', '프로젝트', '연락처', '현재'],
  hi: ['हिन्दी', 'प्रोफ़ाइल', 'कार्य अनुभव', 'शिक्षा', 'कौशल', 'भाषाएँ', 'प्रमाणपत्र और प्रशिक्षण', 'परियोजनाएँ', 'संपर्क', 'वर्तमान'],
  de: ['Deutsch', 'Profil', 'Berufserfahrung', 'Ausbildung', 'Kenntnisse', 'Sprachen', 'Zertifikate & Weiterbildung', 'Projekte', 'Kontakt', 'heute'],
  fr: ['Français', 'Profil', 'Expérience professionnelle', 'Formation', 'Compétences', 'Langues', 'Certifications et formations', 'Projets', 'Contact', 'aujourd’hui'],
  es: ['Español', 'Perfil', 'Experiencia laboral', 'Educación', 'Habilidades', 'Idiomas', 'Certificaciones y formación', 'Proyectos', 'Contacto', 'actualidad'],
  pt: ['Português', 'Perfil', 'Experiência profissional', 'Formação', 'Competências', 'Idiomas', 'Certificações e cursos', 'Projetos', 'Contato', 'atual'],
  it: ['Italiano', 'Profilo', 'Esperienza lavorativa', 'Istruzione', 'Competenze', 'Lingue', 'Certificazioni e formazione', 'Progetti', 'Contatti', 'oggi'],
  nl: ['Nederlands', 'Profiel', 'Werkervaring', 'Opleiding', 'Vaardigheden', 'Talen', 'Certificaten & trainingen', 'Projecten', 'Contact', 'heden'],
  pl: ['Polski', 'Profil', 'Doświadczenie zawodowe', 'Wykształcenie', 'Umiejętności', 'Języki', 'Certyfikaty i szkolenia', 'Projekty', 'Kontakt', 'obecnie'],
  tr: ['Türkçe', 'Profil', 'İş Deneyimi', 'Eğitim', 'Yetenekler', 'Diller', 'Sertifikalar ve Eğitimler', 'Projeler', 'İletişim', 'halen'],
  ru: ['Русский', 'Профиль', 'Опыт работы', 'Образование', 'Навыки', 'Языки', 'Сертификаты и курсы', 'Проекты', 'Контакты', 'по наст. время'],
};
const KUNCI_J = ['nama', 'profil', 'pengalaman', 'pendidikan', 'keahlian', 'bahasa', 'sertifikat', 'proyek', 'kontak', 'kini'];
export const judulUntuk = l => Object.fromEntries((JUDUL[l] || JUDUL.id).map((v, i) => [KUNCI_J[i], v]));

/* nama bulan sesuai bahasa (untuk tanggal lahir) */
export const namaBulan = l => Array.from({ length: 12 }, (_, i) => {
  try { return new Intl.DateTimeFormat(l, { month: 'long', timeZone: 'UTC' }).format(Date.UTC(2001, i, 15)); } catch { return String(i + 1); }
});
export function formatLahir(lh, l) {
  const t = +lh.t, b = +lh.b, y = +lh.y;
  try {
    if (t && b && y) return new Intl.DateTimeFormat(l, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(Date.UTC(y, b - 1, t));
    if (b && y) return new Intl.DateTimeFormat(l, { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(Date.UTC(y, b - 1, 1));
  } catch { /* lanjut */ }
  return y ? String(y) : '';
}
