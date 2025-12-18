# 🔐 Panduan Setup Privy Authentication

## Kenapa Login Tidak Berfungsi?

Ada beberapa alasan umum mengapa login Privy tidak berfungsi:

### ❌ Masalah Umum:

1. **App ID belum diganti** - Masih menggunakan `YOUR_PRIVY_APP_ID`
2. **Privy SDK tidak ter-load** - Script CDN belum dimuat
3. **Domain belum terdaftar** - Domain Anda belum ditambahkan di Privy Dashboard
4. **Browser memblokir pop-up** - Privy menggunakan pop-up untuk login

---

## 📝 Cara Setup Privy (Step-by-Step)

### Step 1: Buat Akun Privy

1. Kunjungi [https://dashboard.privy.io](https://dashboard.privy.io)
2. Klik **"Sign Up"** atau **"Get Started"**
3. Daftar menggunakan email atau GitHub
4. Verifikasi email Anda

### Step 2: Buat App Baru

1. Setelah login, klik **"Create App"** atau **"New Project"**
2. Beri nama aplikasi (contoh: "Ugly Cat Chain")
3. Pilih **"Web3"** sebagai tipe aplikasi
4. Klik **"Create"**

### Step 3: Dapatkan App ID

1. Di dashboard, buka aplikasi yang baru dibuat
2. Klik tab **"Settings"** atau **"Configuration"**
3. Copy **App ID** Anda (format: `clXXXXXXXXXXXXXXXXXXXX`)
4. **SIMPAN** App ID ini!

### Step 4: Daftarkan Domain

⚠️ **PENTING:** Anda harus mendaftarkan domain/URL tempat aplikasi akan dijalankan.

**Untuk Development (localhost):**
1. Di Privy Dashboard, buka **Settings** → **Allowed Origins**
2. Tambahkan:
   ```
   http://localhost:3000
   http://localhost:5173
   http://127.0.0.1:3000
   http://127.0.0.1:5173
   ```
3. Klik **"Save"**

**Untuk Production (Vercel):**
1. Setelah deploy ke Vercel, dapatkan URL (contoh: `https://ugly-cat-chain.vercel.app`)
2. Di Privy Dashboard, tambahkan URL production Anda:
   ```
   https://ugly-cat-chain.vercel.app
   https://your-custom-domain.com (jika ada)
   ```
3. Klik **"Save"**

### Step 5: Update Kode dengan App ID

Buka file `src/EarlyAccess.jsx` dan ganti `YOUR_PRIVY_APP_ID`:

```javascript
// SEBELUM (❌ SALAH)
const appId = "YOUR_PRIVY_APP_ID";

// SESUDAH (✅ BENAR)
const appId = "clXXXXXXXXXXXXXXXXXXXX"; // Ganti dengan App ID Anda
```

**Alternatif: Menggunakan Environment Variable (Recommended)**

1. Buat file `.env.local` di root project:
   ```env
   VITE_PRIVY_APP_ID=clXXXXXXXXXXXXXXXXXXXX
   ```

2. Update kode:
   ```javascript
   const appId = import.meta.env.VITE_PRIVY_APP_ID || "YOUR_PRIVY_APP_ID";
   ```

3. Di Vercel, tambahkan environment variable:
   - Dashboard → Settings → Environment Variables
   - Key: `VITE_PRIVY_APP_ID`
   - Value: App ID Anda

---

## 🧪 Testing Login

### Test di Localhost:

1. Jalankan development server:
   ```bash
   npm run dev
   ```

2. Buka browser di `http://localhost:5173`

3. Klik tombol **"Continue with Email"**

4. **Pop-up harus muncul** dengan form login Privy

5. Masukkan email Anda dan verifikasi

### Jika Pop-up Tidak Muncul:

✅ **Checklist:**
- [ ] Pastikan browser tidak memblokir pop-up
- [ ] Buka Console (F12) dan cek error
- [ ] Pastikan App ID sudah benar
- [ ] Pastikan domain sudah terdaftar di Privy Dashboard
- [ ] Pastikan tidak ada error di Network tab

---

## 🔍 Troubleshooting

### Error: "Privy SDK not loaded"

**Penyebab:** Script Privy belum ter-load dari CDN

**Solusi:**
1. Pastikan internet connection stabil
2. Cek file `index.html` ada script:
   ```html
   <script src="https://unpkg.com/@privy-io/js-sdk@1.0.0/dist/index.umd.js"></script>
   ```
3. Refresh halaman (Ctrl+F5)

### Error: "Invalid App ID"

**Penyebab:** App ID salah atau tidak valid

**Solusi:**
1. Copy ulang App ID dari Privy Dashboard
2. Pastikan format benar: `clXXXXXXXXXXXXXXXXXXXX`
3. Tidak ada spasi atau karakter tambahan

### Error: "Origin not allowed"

**Penyebab:** Domain Anda belum didaftarkan di Privy Dashboard

**Solusi:**
1. Buka Privy Dashboard → Settings → Allowed Origins
2. Tambahkan domain/URL Anda
3. Untuk localhost: `http://localhost:5173`
4. Untuk Vercel: `https://your-app.vercel.app`
5. Save dan coba lagi

### Pop-up Blocked

**Penyebab:** Browser memblokir pop-up

**Solusi:**
1. **Chrome/Edge:**
   - Klik ikon "pop-up blocked" di address bar
   - Pilih "Always allow pop-ups from this site"
   
2. **Firefox:**
   - Klik ikon shield di address bar
   - Disable pop-up blocking untuk site ini

3. **Safari:**
   - Safari → Preferences → Websites → Pop-up Windows
   - Set "Allow" untuk domain Anda

### Login Button Disabled

**Penyebab:** Privy client belum terinisialisasi

**Solusi:**
1. Tunggu 2-3 detik setelah page load
2. Refresh halaman
3. Cek Console untuk error initialization

### User Data Tidak Muncul

**Penyebab:** Struktur data user dari Privy berbeda dari expected

**Solusi:**
1. Buka Console setelah login sukses
2. Check struktur `user` object:
   ```javascript
   console.log('User data:', user);
   ```
3. Update kode sesuai struktur yang ada

---

## 📊 Testing Checklist

Sebelum deploy, pastikan:

- [ ] App ID sudah diganti dari `YOUR_PRIVY_APP_ID`
- [ ] Login berhasil di localhost
- [ ] Pop-up login muncul dengan normal
- [ ] Email verification berfungsi
- [ ] Profile popup menampilkan data user
- [ ] Logout berfungsi
- [ ] Domain production sudah didaftarkan di Privy
- [ ] Environment variables sudah diset di Vercel (jika pakai)

---

## 🆘 Masih Tidak Berhasil?

### Cek Console Browser (F12)

Look for errors seperti:
```
❌ Privy SDK not loaded
❌ Invalid App ID
❌ Origin not allowed
❌ Network error
```

### Verifikasi Setup:

1. **Privy Dashboard:**
   - App ID benar? ✓
   - Domain terdaftar? ✓
   - Login methods enabled (email)? ✓

2. **Kode:**
   - App ID updated? ✓
   - Import benar? ✓
   - Script CDN ter-load? ✓

3. **Browser:**
   - Pop-up allowed? ✓
   - Console tidak ada error? ✓
   - Internet connection stabil? ✓

### Alternative: Gunakan Demo App ID

Untuk testing cepat, Anda bisa gunakan demo App ID dari Privy docs (hanya untuk development):

```javascript
const appId = "clh0qXXXXXXXXXXXXXXXXX"; // Demo ID (ganti dengan milik Anda nanti)
```

⚠️ **JANGAN gunakan demo ID untuk production!**

---

## 📚 Resources

- 📖 [Privy Documentation](https://docs.privy.io)
- 🎥 [Privy Video Tutorials](https://www.youtube.com/@PrivyIO)
- 💬 [Privy Discord Community](https://discord.gg/privy)
- 🐛 [GitHub Issues](https://github.com/privy-io/privy-js)

---

## 💡 Pro Tips

1. **Gunakan Environment Variables** untuk menyimpan App ID
2. **Enable Email Login** di Privy Dashboard
3. **Test di Incognito Mode** untuk memastikan tidak ada cache issue
4. **Check Network Tab** untuk melihat request/response dari Privy API
5. **Gunakan React DevTools** untuk debug state changes

---

## ✅ Success Indicators

Login berhasil jika:
- ✓ Pop-up muncul dengan form email
- ✓ Email verification terkirim
- ✓ Setelah verify, user redirect kembali ke app
- ✓ Profile avatar muncul di kanan atas
- ✓ Profile popup menampilkan email/wallet address

Selamat! Authentication Anda sudah berfungsi! 🎉
