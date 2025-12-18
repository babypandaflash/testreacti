# Ugly Cat Chain - Early Community Access (React Version)

Konversi dari HTML ke React untuk halaman Early Community Access Ugly Cat Chain.

## Fitur

- ✅ Komponen React yang modular dan reusable
- ✅ State management menggunakan React Hooks (useState, useEffect, useRef)
- ✅ Integrasi Privy SDK untuk autentikasi email
- ✅ Responsive design
- ✅ Hamburger menu dengan close on outside click
- ✅ Profile popup dengan informasi user
- ✅ Coming soon popup untuk fitur yang belum tersedia
- ✅ Ready untuk deploy ke Vercel

## Struktur Proyek

```
/
├── index.html          # HTML entry point
├── package.json        # Dependencies
├── vite.config.js      # Vite configuration
├── vercel.json         # Vercel deployment config
├── .gitignore          # Git ignore file
├── README.md           # Dokumentasi
├── DEPLOY.md           # Panduan deployment lengkap
├── public/
│   └── logo.png        # Logo (letakkan file Anda di sini)
└── src/
    ├── main.jsx        # React entry point
    ├── EarlyAccess.jsx # Komponen utama
    └── EarlyAccess.css # Styling
```

## 🚀 Quick Start

### Instalasi Lokal

1. Install dependencies:
```bash
npm install
```

2. Jalankan development server:
```bash
npm run dev
```

3. Build untuk production:
```bash
npm run build
```

4. Preview production build:
```bash
npm run preview
```

## 🌐 Deploy ke Vercel

**Ya! Kode ini SIAP untuk di-deploy ke Vercel menggunakan GitHub Import.**

### Langkah Singkat:

1. **Upload ke GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/USERNAME/REPO-NAME.git
   git push -u origin main
   ```

2. **Deploy di Vercel:**
   - Login ke [vercel.com](https://vercel.com) dengan GitHub
   - Klik `Add New...` → `Project`
   - Pilih repository Anda
   - Klik `Import` → `Deploy`
   - Selesai! 🎉

📖 **Panduan lengkap deployment**: Lihat file [DEPLOY.md](./DEPLOY.md)

## Konfigurasi Privy

**PENTING:** Login tidak akan berfungsi sampai Anda setup Privy dengan benar!

### Quick Setup:

1. **Daftar di Privy:**
   - Kunjungi [https://dashboard.privy.io](https://dashboard.privy.io)
   - Buat akun dan buat app baru
   - Copy **App ID** Anda

2. **Update App ID:**
   
   **Cara 1 - Direct (Simple):**
   
   Edit `src/EarlyAccess.jsx`, line 20:
   ```javascript
   const appId = "clXXXXXXXXXXXXXXXXXXXX"; // Ganti dengan App ID Anda
   ```

   **Cara 2 - Environment Variable (Recommended):**
   
   Buat file `.env.local`:
   ```env
   VITE_PRIVY_APP_ID=clXXXXXXXXXXXXXXXXXXXX
   ```

3. **Daftarkan Domain:**
   - Di Privy Dashboard → Settings → Allowed Origins
   - Tambahkan:
     - Localhost: `http://localhost:5173`
     - Production: `https://your-app.vercel.app`

4. **Test Login:**
   ```bash
   npm run dev
   ```
   Klik "Continue with Email" dan coba login!

📖 **Panduan lengkap:** Lihat [PRIVY_SETUP.md](./PRIVY_SETUP.md)

### Menggunakan Environment Variable (Recommended):

Di Vercel Dashboard, tambahkan environment variable:
- Key: `VITE_PRIVY_APP_ID`
- Value: `your-actual-app-id`

Lalu update kode:
```javascript
appId: import.meta.env.VITE_PRIVY_APP_ID || "fallback-app-id"
```

## Perubahan dari HTML ke React

### Yang Ditambahkan:
- State management dengan `useState` untuk menu, popup, dan user data
- Event handlers menggunakan React pattern (onClick, useEffect)
- Component lifecycle management
- Click outside detection untuk menutup menu
- Conditional rendering untuk show/hide elements
- Proper event propagation handling di popup

### Yang Diperbaiki:
- Pemisahan logic dan UI
- Lebih maintainable dan scalable
- Type-safe event handling
- Better performance dengan React virtual DOM
- Proper cleanup di useEffect

## Catatan Penting

- ✅ File `vercel.json` sudah tersedia untuk konfigurasi Vercel
- ✅ File `.gitignore` sudah tersedia
- ✅ Logo path sudah menggunakan Vite public folder (`/logo.png`)
- ⚠️ Pastikan file `logo.png` ada di folder `public/` sebelum deploy
- ⚠️ Update Privy App ID sebelum production deployment

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Tech Stack

- **React 18** - UI Library
- **Vite** - Build Tool & Dev Server
- **Privy SDK** - Web3 Authentication
- **Font Awesome 6.5** - Icons

## Troubleshooting

### Logo tidak tampil?
Pastikan file `logo.png` ada di folder `public/`

### Login tidak berfungsi?
Update Privy App ID dengan yang valid

### Build error di Vercel?
Cek apakah semua file sudah ter-commit ke GitHub

---

💡 **Tips**: Setelah deploy, setiap push ke GitHub akan otomatis trigger re-deploy di Vercel!
