# Portofolio Rizky Hidayat — rzhdyt28.github.io

Website portofolio pribadi dua bahasa (Indonesia / English), dibangun dengan HTML, CSS, dan JavaScript murni. Tanpa framework, tanpa build step — langsung jalan di GitHub Pages.

## Struktur file

```
├── index.html          # Halaman utama (ID + EN dalam satu file)
├── portofolio.html     # Halaman portofolio: galeri per pengalaman + project berjalan
├── style.css           # Styling (dipakai kedua halaman)
├── script.js           # Toggle bahasa, animasi terminal, navbar, menu mobile, lightbox
└── assets/
    ├── Rizky_Hidayat_CV.pdf
    └── images/
        ├── profile.png       # Foto profil (sudah dikompres)
        ├── logo.png          # Favicon
        └── portfolio/        # Foto dokumentasi kerja (saat ini masih placeholder)
            ├── berca-1.jpg … berca-4.jpg
            ├── teguh-karya-1.jpg … teguh-karya-3.jpg
            ├── jiexpo-1.jpg … jiexpo-3.jpg
            ├── kreasindo-1.jpg, kreasindo-2.jpg
            ├── chronos-1.jpg, chronos-2.jpg
            ├── bigrich-1.jpg, bigrich-2.jpg
            ├── homelab-1.jpg, homelab-2.jpg     # project berjalan
            └── kafka-1.jpg, kafka-2.jpg         # project berjalan
```

## Cara update ke GitHub Pages

1. Backup dulu isi repo lama (opsional).
2. Hapus file lama `index.html`, `style.css`, `script.js` di repo `rzhdyt28.github.io`.
3. Salin semua isi folder ini ke repo, lalu:
   ```bash
   git add .
   git commit -m "Redesign portfolio: bilingual ID/EN, konten sesuai CV"
   git push origin main
   ```
4. Tunggu 1–2 menit, buka https://rzhdyt28.github.io/

## Cara mengubah konten

- **Dua bahasa:** setiap teks memiliki pasangan
  `<span lang="id">…</span><span lang="en">…</span>`.
  Edit keduanya agar tetap sinkron. Bahasa default adalah Indonesia; pilihan pengunjung tersimpan otomatis (localStorage).
- **Ganti CV:** timpa file `assets/Rizky_Hidayat_CV.pdf` dengan versi terbaru (nama file sama).
- **Ganti foto:** timpa `assets/images/profile.png` (disarankan lebar ± 800px agar ringan).
- **Ubah warna:** semua warna ada di bagian `:root` paling atas `style.css`.
- **Menambah pengalaman kerja:** duplikat satu blok `<article class="job">…</article>` di bagian Experience, lalu sesuaikan isinya. Urutkan dari yang terbaru di atas. Pagination (3 pengalaman per halaman) otomatis menyesuaikan jumlah — tidak perlu mengubah JavaScript. Jumlah per halaman bisa diubah lewat variabel `perPage` di `script.js`.
- **Bagian "Sedang Dipelajari" (progress bar):** setiap item ada di blok `<div class="learn-item" data-progress="70">`. Ubah angka `data-progress` (0–100) untuk memperbarui persentase progres belajar — animasi mengikuti otomatis. Tambah item baru dengan menduplikat satu blok `learn-item`.

## Halaman portofolio (portofolio.html)

- Setiap pengalaman di halaman utama bisa diklik (judul atau tautan "Lihat portofolio & dokumentasi →") dan mengarah ke bagian terkait di `portofolio.html` (misalnya `portofolio.html#berca`).
- **Mengganti foto placeholder:** timpa file di `assets/images/portfolio/` dengan foto asli, **nama file harus sama** (mis. `berca-1.jpg`). Disarankan lebar ± 800–1200px, rasio 4:3, dan ukuran < 300 KB per foto agar cepat dimuat.
- **Menambah foto pada satu pengalaman:** duplikat satu blok `<figure class="g-item">…</figure>` di section terkait, lalu arahkan `src` ke file foto baru dan sesuaikan caption ID/EN-nya.
- **Menambah/mengubah project berjalan:** edit bagian `<section id="in-progress">` — duplikat satu blok `<article class="wip-card">…</article>` untuk project baru.
- Klik gambar mana pun akan membuka lightbox (perbesar); tutup dengan tombol ✕, klik area gelap, atau tombol Escape.

## Catatan

- Font (Space Grotesk, IBM Plex Sans, JetBrains Mono) dimuat dari Google Fonts — butuh koneksi internet saat diakses.
- Email di tombol kontak sudah diperbaiki dari typo lama `@gamil.com` menjadi `rzhdyt28@gmail.com`.
