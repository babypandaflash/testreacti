# 🚀 Panduan Deploy ke Vercel

## Persiapan Sebelum Deploy

### 1. Upload ke GitHub

**Langkah-langkah:**

1. **Buat Repository Baru di GitHub**
   - Buka [github.com](https://github.com)
   - Klik tombol `+` → `New repository`
   - Beri nama repository (misal: `ugly-cat-chain-react`)
   - Pilih `Public` atau `Private`
   - **JANGAN** centang "Initialize with README"
   - Klik `Create repository`

2. **Upload Kode ke GitHub**
   
   Buka terminal/command prompt di folder project Anda, lalu jalankan:
   
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Ugly Cat Chain React App"
   git branch -M main
   git remote add origin https://github.com/USERNAME/ugly-cat-chain-react.git
   git push -u origin main
   ```
   
   *Ganti `USERNAME` dengan username GitHub Anda*

### 2. Siapkan Logo

Sebelum deploy, pastikan file `logo.png` sudah ada di folder `public/`:

```
public/
└── logo.png  ← Letakkan logo Anda di sini
```

## Deploy ke Vercel

### Metode 1: Deploy via GitHub (RECOMMENDED)

1. **Buka Vercel**
   - Kunjungi [vercel.com](https://vercel.com)
   - Klik `Sign Up` atau `Log In`
   - Login menggunakan akun GitHub Anda

2. **Import Project**
   - Klik `Add New...` → `Project`
   - Pilih `Import Git Repository`
   - Cari dan pilih repository `ugly-cat-chain-react`
   - Klik `Import`

3. **Configure Project**
   - **Framework Preset**: Vercel akan auto-detect sebagai `Vite`
   - **Root Directory**: Biarkan default (`.`)
   - **Build Command**: `npm run build` (sudah otomatis)
   - **Output Directory**: `dist` (sudah otomatis)
   - **Install Command**: `npm install` (sudah otomatis)

4. **Environment Variables (Opsional)**
   Jika Anda ingin menyimpan Privy App ID sebagai environment variable:
   - Klik `Environment Variables`
   - Tambahkan:
     - Key: `VITE_PRIVY_APP_ID`
     - Value: `your-privy-app-id`
   
   Kemudian update kode di `EarlyAccess.jsx`:
   ```javascript
   appId: import.meta.env.VITE_PRIVY_APP_ID || "YOUR_PRIVY_APP_ID"
   ```

5. **Deploy**
   - Klik `Deploy`
   - Tunggu proses build selesai (biasanya 1-2 menit)
   - Setelah selesai, Anda akan mendapat URL seperti: `https://your-project.vercel.app`

### Metode 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login ke Vercel
vercel login

# Deploy
vercel

# Deploy ke production
vercel --prod
```

## Setelah Deploy

### ✅ Checklist
- [ ] Website bisa diakses di URL Vercel
- [ ] Logo tampil dengan benar
- [ ] Menu hamburger berfungsi
- [ ] Button login berfungsi
- [ ] Popup coming soon muncul
- [ ] Styling tampil dengan benar
- [ ] Responsive di mobile

### 🔧 Update Privy App ID

**PENTING:** Jangan lupa update Privy App ID di file `src/EarlyAccess.jsx`:

```javascript
const privyInstance = new window.Privy({
  appId: "YOUR_PRIVY_APP_ID", // ← Ganti dengan App ID asli Anda
  loginMethods: ['email']
});
```

Setelah mengganti, push ke GitHub:
```bash
git add .
git commit -m "Update Privy App ID"
git push
```

Vercel akan otomatis re-deploy.

## Custom Domain (Opsional)

Untuk menggunakan domain sendiri:

1. Buka project di Vercel Dashboard
2. Klik tab `Settings` → `Domains`
3. Klik `Add Domain`
4. Masukkan domain Anda (misal: `uglycat.com`)
5. Ikuti instruksi untuk update DNS settings di registrar domain Anda

## Troubleshooting

### ❌ Build Failed

**Error: `npm install` gagal**
- **Solusi**: Pastikan `package.json` sudah ter-commit ke GitHub

**Error: Logo tidak tampil**
- **Solusi**: Pastikan file `logo.png` ada di folder `public/`

**Error: Privy SDK tidak terdeteksi**
- **Solusi**: Cek apakah script Privy SDK sudah ada di `index.html`

### ⚠️ Website Tampil Tapi Tidak Berfungsi

**Login tidak berfungsi**
- **Solusi**: Update Privy App ID dengan yang valid

**Menu tidak muncul**
- **Solusi**: Cek browser console untuk error JavaScript

## Auto-Deploy

Setelah setup awal, setiap kali Anda push ke GitHub:

```bash
git add .
git commit -m "Update fitur baru"
git push
```

Vercel akan **otomatis detect dan deploy** perubahan Anda! 🎉

## Monitoring

- **Analytics**: Vercel Dashboard → Tab `Analytics`
- **Logs**: Vercel Dashboard → Tab `Deployments` → Klik deployment → `View Function Logs`
- **Performance**: Vercel Dashboard → Tab `Speed Insights`

## Support

Jika ada masalah:
- 📖 [Vercel Documentation](https://vercel.com/docs)
- 💬 [Vercel Community](https://github.com/vercel/vercel/discussions)
- 🎯 [Vite Documentation](https://vitejs.dev)
