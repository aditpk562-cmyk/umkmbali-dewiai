# UMKMBali | DewiAI

MVP web untuk membantu digitalisasi UMKM Bali. Proyek ini relevan dengan tema Bali DigiFest AI Web Innovation Challenge, khususnya Business & MSME Digitalization.

## Fitur

- Direktori produk UMKM Bali dengan pencarian dan filter kategori.
- Asisten DewiAI yang mengirim pesan ke API AI melalui backend Python.
- Provider Gemini sebagai pilihan utama, OpenAI sebagai alternatif, dan knowledge base lokal sebagai fallback.
- Buku panduan usaha, pemasaran, legalitas, keuangan, dan pengembangan produk.
- UI responsif dengan palet merah bata, hijau, dan emas yang terinspirasi nuansa Bali.

## Menjalankan di Windows

1. Pastikan Python 3 terpasang. Cek dengan `python --version`.
2. Salin `.env.example` menjadi `.env`.
3. Buka https://aistudio.google.com/apikey dan buat API key Gemini.
4. Masukkan key ke `.env` pada baris `GEMINI_API_KEY=...`. Jangan tambahkan tanda kutip.
5. Buka terminal pada folder proyek, lalu jalankan `python server.py`.
6. Buka `http://localhost:8000` di browser.
7. Periksa status pada bagian Asisten AI. Status harus menunjukkan `AI aktif · Gemini`.

Jika menggunakan PowerShell, salin file contoh dengan:

```powershell
Copy-Item .env.example .env
notepad .env
python server.py
```

## Menggunakan OpenAI

Isi `OPENAI_API_KEY` dan `OPENAI_MODEL` di `.env`. Hapus nilai `GEMINI_API_KEY` jika ingin memprioritaskan OpenAI. API berbayar mengikuti akun dan penggunaan Anda.

## Endpoint

- `GET /api/status`: status provider dan model aktif tanpa membocorkan API key.
- `POST /api/chat`: menerima `{ "messages": [{"role":"user","content":"..."}] }` dan mengembalikan jawaban.

## Keamanan

- Jangan menaruh API key di JavaScript atau HTML.
- Jangan mengunggah `.env` ke repository. File ini sudah masuk `.gitignore`.
- Gunakan `.env.example` untuk mendokumentasikan nama variabel tanpa secret.
- Jangan memasukkan data pribadi/sensitif pengguna ke prompt.

## Sebelum submission kompetisi

- Ganti atau verifikasi data contoh UMKM dan statistik demo. Jangan mengklaim data contoh sebagai data nyata.
- Isi identitas tim dan disclosure sesuai kondisi sebenarnya.
- Tambahkan bukti sumber untuk data yang dipakai.
- Uji API dengan input yang berbeda, termasuk saat key salah atau kuota habis.
- Deploy website, push repository GitHub, dan catat commit hash sesuai panduan lomba.
- Siapkan proposal maksimal 5 halaman isi dan video demo jika lolos final.

Lihat `AI_TECHNOLOGY_DISCLOSURE.md` untuk draft disclosure teknologi.
