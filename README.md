# Interactive Resume — Next.js + Tailwind CSS

Website resume interaktif, premium, dan responsive dengan dark/light mode,
animasi Framer Motion, dan aksesibilitas penuh (ARIA + keyboard navigation).

## Struktur Folder (Multi-Page)

Situs ini kini terdiri dari beberapa halaman terpisah yang saling terhubung
lewat navbar, dengan animasi transisi halus setiap kali berpindah halaman.

```
resume-website/
├── app/
│   ├── layout.tsx          # Navbar + Footer + transisi halaman (berlaku di semua page)
│   ├── page.tsx            # "/"           → Beranda: Hero + About + kartu Jelajahi
│   ├── experience/page.tsx # "/experience" → Halaman Pengalaman
│   ├── skills/page.tsx     # "/skills"     → Halaman Keahlian
│   ├── projects/page.tsx   # "/projects"   → Halaman Proyek & Galeri
│   ├── contact/page.tsx    # "/contact"    → Halaman Kontak
│   └── globals.css         # Tailwind + style global
├── components/
│   ├── Navbar.tsx           # Navigasi dengan indikator "pill" aktif beranimasi
│   ├── PageTransition.tsx   # Wrapper animasi fade/slide antar halaman
│   ├── PageIntro.tsx        # Banner judul di tiap halaman
│   ├── ExploreLinks.tsx     # Kartu interaktif di Beranda menuju 4 halaman lain
│   ├── ThemeToggle.tsx
│   ├── ThemeProvider.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Experience.tsx
│   ├── Skills.tsx
│   ├── Projects.tsx
│   ├── Contact.tsx
│   └── Footer.tsx
├── lib/
│   └── data.ts              # Semua data resume (edit di sini!)
├── public/
│   ├── profile-photo.jpg    # Foto profil (dari CV)
│   ├── cv.pdf               # File CV untuk tombol "Unduh CV"
│   └── project-placeholder-*.svg  # Placeholder gambar galeri proyek
├── package.json
├── tailwind.config.ts
├── next.config.mjs
└── tsconfig.json
```

### Alur Navigasi

- **Beranda (`/`)** menampilkan foto profil, ringkasan diri, data pribadi, lalu
  4 kartu interaktif ("Jelajahi") yang mengarah ke halaman lain.
- **Navbar** (muncul di semua halaman) memberi akses langsung ke kelima halaman,
  dengan indikator pill emas yang meluncur mulus (`layoutId` Framer Motion)
  mengikuti halaman aktif.
- Setiap perpindahan halaman memakai animasi fade + slide melalui
  `PageTransition.tsx`.

## 1. Edit Konten Anda

Semua data (nama, pengalaman, skill, proyek, kontak) ada di satu file:

```
lib/data.ts
```

Ganti nilai-nilainya sesuai profil Anda. Untuk foto profil dan gambar
proyek, ganti file di `public/` dengan foto asli (format `.jpg`/`.png`/`.webp`)
lalu perbarui path di `lib/data.ts` (misalnya `photo: "/foto-saya.jpg"`).

Untuk tombol "Unduh CV", letakkan file PDF Anda di `public/cv.pdf`.

## 2. Jalankan Secara Lokal

Pastikan Node.js versi 18.17 atau lebih baru sudah terpasang.

```bash
npm install
npm run dev
```

Buka `http://localhost:3000` di browser.

## 3. Build Produksi (opsional, untuk verifikasi)

```bash
npm run build
npm run start
```

## 4. Deploy ke Vercel — Langkah demi Langkah

### Opsi A: Lewat Vercel CLI (tercepat)

```bash
npm install -g vercel
vercel login
vercel
```

Ikuti instruksi di terminal (pilih scope, nama project, dsb). Setelah
selesai, Vercel akan memberikan URL preview. Jalankan `vercel --prod`
untuk deploy ke production.

### Opsi B: Lewat GitHub + Dashboard Vercel

1. **Inisialisasi Git dan push ke GitHub**

   ```bash
   git init
   git add .
   git commit -m "Initial commit: interactive resume"
   git branch -M main
   git remote add origin https://github.com/USERNAME/NAMA-REPO.git
   git push -u origin main
   ```

2. **Import repository ke Vercel**
   - Buka [vercel.com](https://vercel.com) dan login (bisa pakai akun GitHub).
   - Klik **Add New → Project**.
   - Pilih repository yang baru saja di-push.

3. **Konfigurasi build**
   Vercel otomatis mendeteksi framework Next.js, sehingga pengaturan berikut
   sudah terisi otomatis (tidak perlu diubah):
   - **Framework Preset**: Next.js
   - **Build Command**: `next build`
   - **Output Directory**: `.next` (dikelola otomatis oleh adapter Next.js Vercel)
   - **Install Command**: `npm install`

4. **Environment Variables**
   Tidak ada environment variable wajib untuk versi saat ini — form kontak
   sudah terhubung langsung ke Formspree lewat endpoint yang ditulis di
   `components/Contact.tsx` (`FORMSPREE_ENDPOINT`), tanpa perlu API key
   tambahan di Vercel.

5. **Deploy**
   - Klik **Deploy**.
   - Tunggu proses build selesai (~1–2 menit).
   - Vercel akan memberikan URL seperti `https://nama-project.vercel.app`.

6. **Custom Domain (opsional)**
   - Buka `Project Settings → Domains`, tambahkan domain Anda, lalu ikuti
     instruksi DNS yang diberikan.

### Auto-Deploy

Setelah terhubung ke GitHub, setiap `git push` ke branch `main` akan
otomatis memicu deployment baru di Vercel.

## Fitur yang Sudah Diimplementasikan

- ✅ Hero dengan nama, tagline, foto profil, tombol kontak & unduh CV
- ✅ About dengan bio singkat dan data pribadi
- ✅ Experience: timeline interaktif dengan animasi scroll (Framer Motion)
- ✅ Skills: progress bar animasi terkelompok per kategori
- ✅ Projects: grid galeri dengan modal detail (dapat dinavigasi keyboard, `Esc` untuk menutup)
- ✅ Contact: form dengan validasi real-time, terhubung ke Formspree untuk pengiriman email sungguhan, + link sosial media
- ✅ Dark/Light mode toggle (menggunakan `next-themes`, tersimpan di browser)
- ✅ Responsive penuh (mobile, tablet, desktop)
- ✅ SEO: metadata, Open Graph, Twitter Card, semantic HTML (`<header>`, `<main>`, `<section>`, `<footer>`)
- ✅ Aksesibilitas: ARIA labels, focus states, skip-to-content link, navigasi keyboard, kontras warna memadai
- ✅ Insight pengunjung real-time via Vercel Web Analytics & Speed Insights
- ✅ Notifikasi instan ke Telegram setiap ada pengunjung baru

## Insight Pengunjung (Vercel Analytics)

Situs ini sudah dipasangi **Vercel Web Analytics** (`@vercel/analytics`) dan
**Speed Insights** (`@vercel/speed-insights`) di `app/layout.tsx`. Begitu
di-deploy ke Vercel, setiap kunjungan otomatis tercatat — tanpa perlu
database, API key, atau environment variable tambahan.

**Cara melihat datanya:**

1. Buka dashboard Vercel → pilih project ini.
2. Klik tab **Analytics** di bagian atas.
3. Kalau muncul tombol "Enable", klik untuk mengaktifkan (sekali saja,
   gratis di plan Hobby dengan kuota terbatas per bulan).
4. Setelah beberapa kunjungan masuk, dashboard menampilkan: jumlah
   pengunjung & page view, halaman terpopuler, negara/kota pengunjung,
   jenis device (mobile/desktop), browser, dan sumber trafik (referrer).
5. Tab **Speed Insights** menampilkan skor performa nyata dari pengunjung
   asli (Core Web Vitals), bukan cuma skor simulasi.

Data ini hanya bisa dilihat oleh Anda lewat dashboard Vercel (privat, tidak
tampil di halaman resume). Untuk notifikasi real-time setiap ada pengunjung
baru, lihat bagian **Notifikasi Real-Time (Telegram)** di bawah.

## Notifikasi Real-Time (Telegram)

Setiap ada orang membuka situs ini, Anda akan menerima **pesan Telegram
langsung ke HP** dalam hitungan detik — tanpa perlu buka dashboard Vercel.
Ini beda dengan Vercel Analytics: kalau Analytics itu dashboard yang harus
dibuka manual, ini push notification instan.

Cara kerjanya: `components/VisitorPing.tsx` mengirim satu ping ke
`app/api/notify/route.ts` (serverless function) sekali per sesi browser
(bukan setiap pindah halaman), lalu function itu meneruskan pesan ke bot
Telegram Anda lewat Telegram Bot API. Isi notifikasinya: halaman yang
dibuka, perkiraan lokasi (dari header geo Vercel), referrer, waktu (WIB),
dan jenis device/browser.

### Setup (sekali saja)

1. **Buat bot Telegram**
   - Buka Telegram, cari **@BotFather**, kirim `/newbot`.
   - Ikuti instruksinya (kasih nama bot, misal `Resume Visitor Bot`).
   - BotFather akan memberi **token**, formatnya seperti
     `123456789:AAExxxxxxxxxxxxxxxxxxxxxxxxxxxx` — simpan ini.

2. **Dapatkan Chat ID Anda**
   - Cari bot yang baru dibuat di Telegram (nama sesuai yang Anda kasih),
     lalu kirim pesan apa saja ke bot itu (misal "hi") supaya bot
     "mengenal" chat Anda.
   - Buka browser, akses:
     `https://api.telegram.org/bot<TOKEN_ANDA>/getUpdates`
     (ganti `<TOKEN_ANDA>` dengan token dari langkah 1).
   - Cari angka di bagian `"chat":{"id":123456789,...}` — itu **Chat ID**
     Anda.

3. **Pasang di Vercel**
   - Dashboard Vercel → project ini → **Settings → Environment Variables**.
   - Tambahkan dua variable:
     - `TELEGRAM_BOT_TOKEN` = token dari langkah 1
     - `TELEGRAM_CHAT_ID` = chat id dari langkah 2
   - Pilih environment **Production** (dan Preview kalau mau testing di
     preview deployment juga), lalu **Save**.
   - Redeploy project (push commit baru, atau klik "Redeploy" di tab
     Deployments) supaya environment variable-nya terbaca.

4. **Testing lokal (opsional)**
   - Salin `.env.local.example` jadi `.env.local`, isi dua variable di
     atas dengan nilai asli Anda (`.env.local` sudah otomatis di-ignore
     git, tidak akan ke-commit/ter-upload).
   - `npm run dev`, buka situsnya, cek Telegram Anda.

**Catatan:**
- Kalau environment variable belum diisi, endpoint ini otomatis diam saja
  (tidak error, tidak mengganggu pengunjung) — jadi aman untuk deploy
  duluan sebelum sempat setup bot.
- Notifikasi cuma dikirim **1x per sesi browser** seorang pengunjung
  (dideteksi lewat `sessionStorage`), jadi kalau ada yang buka 5 halaman
  berturut-turut, Anda cuma dapat 1 notifikasi — bukan 5.
- Jangan pernah commit token/chat id langsung ke kode atau ke GitHub;
  selalu lewat Environment Variables di Vercel.

## Form Kontak (Formspree)

Form kontak sudah aktif mengirim email sungguhan lewat
[Formspree](https://formspree.io) dengan endpoint:

```
https://formspree.io/f/mvkgwbpo
```

Endpoint ini ditulis langsung di `components/Contact.tsx` pada konstanta
`FORMSPREE_ENDPOINT`. Saat form disubmit dan lolos validasi, data dikirim
via `fetch()` (metode POST, JSON) ke endpoint tersebut; Formspree akan
meneruskan pesan ke email yang terdaftar di akun Formspree Anda.

**Hal yang perlu diperhatikan:**

- Pastikan endpoint `mvkgwbpo` terdaftar di akun Formspree milik Anda
  sendiri (bukan orang lain) agar pesan masuk ke inbox yang benar.
- Formspree free plan membatasi jumlah submission per bulan — cek dashboard
  Formspree jika form berhenti mengirim.
- Untuk mengganti ke endpoint Formspree lain, cukup ubah nilai
  `FORMSPREE_ENDPOINT` di `components/Contact.tsx`.
- Tidak perlu API Route atau Environment Variable tambahan — permintaan
  langsung dari browser ke Formspree.

## Kustomisasi Warna & Font

- Warna aksen (emas) diatur di `tailwind.config.ts` pada key `colors.accent`.
- Font: judul menggunakan **Playfair Display** (serif, elegan), teks isi
  menggunakan **Inter** (sans-serif). Bisa diganti di `app/layout.tsx`.
