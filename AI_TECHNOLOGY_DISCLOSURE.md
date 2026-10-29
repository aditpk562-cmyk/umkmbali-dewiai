# AI & Technology Disclosure

Nama Produk: UMKMBali / DewiAI

- Framework / Frontend: HTML5, CSS3, JavaScript vanilla.
- Backend / Runtime: Python 3 standard library (`http.server`, `urllib`).
- Database / Storage: Belum digunakan pada MVP ini. Direktori produk menggunakan data contoh statis.
- Hosting / Deployment: Lokal untuk pengembangan. Tentukan layanan hosting saat deployment.
- AI Model / API / Method: Google Gemini API (`gemini-2.5-flash`) sebagai pilihan utama. OpenAI Responses API (`gpt-4.1-mini`) tersedia sebagai alternatif.
- Peran AI dalam Produk: Menjawab pertanyaan pelaku UMKM tentang perencanaan usaha, pemasaran, keuangan, dan konteks produk lokal Bali.
- Dataset / Data Source: Knowledge base lokal buatan untuk fallback. Direktori produk pada versi ini adalah data contoh dan perlu diverifikasi sebelum dipublikasikan sebagai direktori nyata.
- Open-source Libraries: Tidak ada library JavaScript/Python eksternal wajib.
- Template / Boilerplate: Tidak dicantumkan; lengkapi jika menggunakan komponen/template dari pihak ketiga.
- AI Coding Assistant: Isi secara jujur sesuai alat yang benar-benar digunakan selama pengembangan.
- Pre-existing Components: Sesuaikan dengan riwayat pengembangan proyek Anda.
- Third-party Assets / Credits: Google Fonts (Plus Jakarta Sans dan Fraunces). API AI tunduk pada ketentuan penyedia masing-masing.

## Alur data

Pengguna -> Browser (frontend) -> `/api/chat` pada backend Python -> Gemini API atau OpenAI API -> jawaban AI -> browser.

API key disimpan di environment variable atau file `.env` lokal. Jangan mengunggah file `.env` ke GitHub.

## Batasan MVP

- Belum menyimpan akun, percakapan, atau data produk ke database.
- Jika API key tidak tersedia atau API gagal, DewiAI menggunakan knowledge base lokal.
- Konten direktori dan angka demo perlu diperiksa dan diganti dengan data yang benar sebelum submission.
- Jawaban AI dapat keliru. Verifikasi informasi legal, pajak, dan sertifikasi ke lembaga resmi.
