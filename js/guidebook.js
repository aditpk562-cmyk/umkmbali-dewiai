/* ============================================================
   UMKMBali — Buku Panduan
   Konten bab-bab panduan lengkap UMKM Bali
   ============================================================ */
(function () {
  "use strict";

  const GUIDE = [
    {
      num: "01", eyebrow: "Bab 1 · Fondasi", title: "Memetakan Peluang & Memulai Usaha", sub: "Dari ide mentah menjadi usaha yang berjalan.",
      body: [
        { type: "p", text: "Bali bukan hanya tujuan wisata, tapi rumah bagi ribuan usaha mikro yang hidup dari kekayaan budayanya. Sebelum menggelar produk, luangkan waktu memahami apa yang sebenarnya dibutuhkan pasar dan apa yang Anda kuasai." },
        { type: "h3", text: "1. Kenali sumber daya & keahlian Anda" },
        { type: "p", text: "Apakah Anda pandai memasak, menenun, mengukir, atau mengelola kebun? Usaha paling bertahan biasanya lahir dari keahlian yang sudah dimiliki. Tulis 3 keahlian utama dan 3 minat Anda, lalu cari titik temuannya." },
        { type: "h3", text: "2. Riset pasar Bali & turis" },
        { type: "p", text: "Pasar Bali itu dua sisi: warga lokal (kebutuhan harian) dan turis (oleh-oleh & pengalaman). Tentukan siapa target utama Anda sebelum membuat produk. Amati UMKM lain di daerah Anda — apa yang laris, apa yang kurang dilayani." },
        { type: "h3", text: "3. Validasi ide dengan cepat" },
        { type: "p", text: "Jangan langsung produksi massal. Buat versi paling sederhana (MVP), tawarkan ke 10-20 orang terdekat, catat masukan mereka, lalu perbaiki. Ini menghemat modal dan menghindari produksi yang tidak laku." },
        { type: "tip", text: "<strong>Prinsip emas:</strong> Jual dulu, sempurnakan kemudian. Produk yang benar-benar laku sering muncul dari iterasi, bukan rencana di atas kertas." },
        { type: "steps", items: [
          { t: "Daftar ide & keahlian", d: "Tulis semua kemampuan & minat Anda" },
          { t: "Pilih target pelanggan", d: "Lokal, turis domestik, atau turis asing" },
          { t: "Riset kompetitor", d: "Kunjungi 5 UMKM sejenis di area Anda" },
          { t: "Buat prototipe", d: "Versi paling sederhana untuk diuji" },
          { t: "Uji ke 10 orang", d: "Kumpulkan masukan & repeat" },
          { t: "Tetapkan model bisnis", d: "Produk, harga, tempat jual, promosi" }
        ] }
      ]
    },
    {
      num: "02", eyebrow: "Bab 2 · Legalitas", title: "Perizinan & Legalitas Usaha", sub: "Izin yang tepat membuat usaha aman, dipercaya, dan siap naik kelas.",
      body: [
        { type: "p", text: "Banyak pelaku UMKM takut urus izin karena dianggap rumit. Padahal kini hampir semua perizinan mikro bisa diurus online, gratis, dan cukup satu dokumen: NIB." },
        { type: "h3", text: "NIB — Nomor Induk Berusaha" },
        { type: "p", text: "NIB adalah identitas usaha Anda. Dibuat gratis lewat OSS (Online Single Submission) di ss.business.oss.go.id. Cukup KTP & data usaha, dalam hitungan hari NIB terbit. Dengan NIB Anda juga sudah mendapat akses ke KUR (pinjaman bunga rendah)." },
        { type: "h3", text: "Sertifikat halal (khusus kuliner)" },
        { type: "p", text: "Gratis via SIHOL/BPJPH. Penting karena banyak pembeli, hotel, dan ritel mensyaratkan halal. Prosesnya kini digratiskan untuk UMKM." },
        { type: "h3", text: "PIRT & BPOM" },
        { type: "p", text: "PIRT untuk pangan olahan rumah tangga (urus di dinas kesehatan kabupaten/kota). BPOM Notifikasi untuk kosmetik & obat tradisional. Dua-dua ada jalur khusus UMKM yang lebih ringan." },
        { type: "h3", text: "Merek dagang" },
        { type: "p", text: "Daftarkan logo & nama merek ke DJKI agar tidak dibajak. Investasi kecil yang sangat melindungi brand jangka panjang." },
        { type: "tip", text: "<strong>Peluang:</strong> Dinas KUKM & KPUB Bali rutin adakan pendampingan & bebas biaya untuk pengurusan izin. Pantau info dari kantor desa/kecamatan." },
        { type: "steps", items: [
          { t: "Buat NIB di OSS", d: "Gratis, online, cukup KTP" },
          { t: "Sertifikat halal (jika pangan)", d: "Gratis via SIHOL" },
          { t: "PIRT/BPOM", d: "Sesuai jenis produk" },
          { t: "Daftar merek", d: "DJKI untuk perlindungan brand" },
          { t: "Buka rekening bisnis", d: "Pakai NIB sebagai syarat" }
        ] }
      ]
    },
    {
      num: "03", eyebrow: "Bab 3 · Produk", title: "Membuat Produk yang Bernilai", sub: "Kemasan & cerita yang membuat produk dikenang dan layak dihargai premium.",
      body: [
        { type: "p", text: "Pembeli, terutama turis, tidak hanya membeli barang — mereka membeli cerita, keaslian, dan pengalaman. Inilah keuntungan UMKM Bali: setiap produk punya akar budaya yang bisa dijual sebagai nilai." },
        { type: "h3", text: "Tentukan Unique Selling Point" },
        { type: "p", text: "Tanyakan: apa yang tidak dimiliki kompetitor? Apakah bahan lokal, proses tradisional, resep turun-temurun, atau dampak sosial/lingkungan? Itulah USP Anda — semua pemasaran harus berputar di sekitarnya." },
        { type: "h3", text: "Investasi kemasan" },
        { type: "p", text: "Kemasan baik bisa menaikkan harga jual 2-3 kali lipat. Pilih kemasan yang melindungi produk, ramah lingkungan, dan menampilkan identitas Bali (motif, bahan alami, kaligrafi)." },
        { type: "h3", text: "Ciptakan varian dari satu bahan" },
        { type: "p", text: "Punya satu bahan baku? Buat beberapa varian. Misal kopi: whole bean, ground, sachet, atau cold brew. Ini memperluas pasar tanpa menambah risiko bahan baru." },
        { type: "h3", text: "Kartu cerita produk" },
        { type: "p", text: "Sertakan kartu kecil yang menceritakan siapa pembuat, asal bahan, dan filosofi produk. Sederhana, tapi dampaknya besar pada persepsi nilai." },
        { type: "tip", text: "<strong>Fakta:</strong> Turis bersedia membayar lebih mahal untuk produk yang punya cerita & kemasan baik. Kemasan bukan biaya, tapi investasi harga jual." }
      ]
    },
    {
      num: "04", eyebrow: "Bab 4 · Pemasaran", title: "Pemasaran Digital untuk UMKM", sub: "Membawa produk Bali ke tangan pembeli di seluruh dunia.",
      body: [
        { type: "p", text: "Anda tidak perlu mahir teknologi untuk sukses jualan online. Yang penting konsisten dan jujur menampilkan keaslian produk Anda." },
        { type: "h3", text: "Pilih platform yang tepat" },
        { type: "p", text: "Untuk produk visual (kuliner, kerajinan, fesyen): Instagram & TikTok terbaik. Untuk jualan skala nasional: Tokopedia, Shopee, atau TikTok Shop. Jangan dibuka semua sekaligus — kuasai 1-2 dulu." },
        { type: "h3", text: "Konten di balik layar (behind the scene)" },
        { type: "p", text: "Video pendek proses membuat produk, kondisi bengker/pabrik, dan cerita pembuat adalah jenis konten yang paling engaging. Turis & pembeli online suka melihat keaslian, bukan iklan." },
        { type: "h3", text: "Foto produk berkualitas" },
        { type: "p", text: "Tidak perlu kamera mahal — cukup pencahayaan alami (dekat jendela, pagi/sore) dan background bersih dengan nuansa Bali. Foto yang baik bisa menaikkan konversi jualan hingga 40%." },
        { type: "h3", text: "Bangun kepercayaan" },
        { type: "p", text: "Balas DM dengan ramah & cepat. Minta testimoni pelanggan. Tampilkan rating. Kepercayaan adalah mata uang utama dalam jualan online." },
        { type: "h3", text: "Iklan berbayar untuk pengujian" },
        { type: "p", text: "Mulai dengan Rp50-100rb untuk menguji produk mana yang paling responsif. Bila ada yang performa baik, tingkatkan perlahan." },
        { type: "tip", text: "<strong>Rumus konten UMKM Bali:</strong> 70% edukasi/cerita proses, 20% testimoni & interaksi, 10% jualan langsung." },
        { type: "steps", items: [
          { t: "Buka akun 1-2 platform", d: "Instagram + TikTok untuk visual" },
          { t: "Posting konsisten", d: "Minimal 3x seminggu" },
          { t: "Tunjukkan proses", d: "Behind the scene, pembuat" },
          { t: "Gabung marketplace", d: "Untuk jangkauan nasional" },
          { t: "Uji iklan kecil", d: "Rp50rb untuk lihat performa" },
          { t: "Bangun testimoni", d: "Minta & tampilkan review" }
        ] }
      ]
    },
    {
      num: "05", eyebrow: "Bab 5 · Keuangan", title: "Manajemen Keuangan & Pembiayaan", sub: "Disiplin kecil yang menjaga usaha tetap sehat dan tumbuh.",
      body: [
        { type: "p", text: "Banyak UMKM untung di atas kertas tapi tetap krisis uang. Penyebabnya satu: keuangan pribadi & usaha yang tercampur, dan arus kas yang tidak dipantau." },
        { type: "h3", text: "Pisahkan uang pribadi & usaha" },
        { type: "p", text: "Buka rekening bisnis tersendiri pakai NIB. Ini wajib. Tanpa pemisahan, Anda tidak akan tahu usaha sebenarnya untung atau rugi." },
        { type: "h3", text: "Catat setiap transaksi" },
        { type: "p", text: "Pakai aplikasi gratis seperti BukuKas atau Money Tracker. Catat pemasukan & pengeluaran harian. Hanya butuh 5 menit sehari, tapi dampaknya luar biasa." },
        { type: "h3", text: "Pahami HPP & margin" },
        { type: "p", text: "Harga Pokok Produksi (HPP) = bahan baku + tenaga kerja + overhead per unit. Tanpa tahu HPP, Anda bisa jadi menjual dengan rugi tanpa sadar. Target margin sehat UMKM: 30-50%." },
        { type: "h3", text: "Sisihkan untuk modal kerja" },
        { type: "p", text: "Minimal 10% laba masuk ke modal kerja, bukan ke operasional atau konsumsi pribadi. Ini jadi bensin untuk pertumbuhan." },
        { type: "h3", text: "Opsi pembiayaan modal" },
        { type: "p", text: "KUR Mikro (bunga 6%/tahun, hingga Rp100jt, tanpa agunan), koperasi/BMT lokal, kredit channeling Pemprov Bali, hingga crowdfunding/pre-order. Pilih yang paling nyaman cicilannya." },
        { type: "tip", text: "<strong>Hati-hati:</strong> Laba bukan berarti ada uang. Yang menjaga usaha hidup adalah arus kas (cashflow), bukan laporan laba-rugi." },
        { type: "steps", items: [
          { t: "Buka rekening bisnis", d: "Pakai NIB sebagai syarat" },
          { t: "Catat keuangan harian", d: "Aplikasi gratis, 5 menit/hari" },
          { t: "Hitung HPP tiap produk", d: "Agar tahu margin sebenarnya" },
          { t: "Sisihkan 10% laba", d: "Untuk modal kerja" },
          { t: "Bangun dana darurat", d: "1-3 bulan biaya operasional" },
          { t: "Ajukan KUR bila perlu", d: "Cukup NIB, bunga rendah" }
        ] }
      ]
    },
    {
      num: "06", eyebrow: "Bab 6 · Skala", title: "Skala, Ekspor & Keberlanjutan", sub: "Menumbuhkan usaha tanpa kehilangan akar lokalnya.",
      body: [
        { type: "p", text: "Setelah usaha stabil, ada dua jalan: memperdalam (naik kelas produk & harga) atau melebarkan (pasar baru, termasuk ekspor). Keduanya butuh fondasi yang sama: kualitas & kepercayaan." },
        { type: "h3", text: "Naik kelas (premiumisasi)" },
        { type: "p", text: "Tingkatkan kualitas bahan, kemasan, dan storytelling. Produk khas Bali punya keunggulan kultural yang membuatnya layak premium — asalkan kualitas menopang harga." },
        { type: "h3", text: "Melebarkan via reseller & agen" },
        { type: "p", text: "Daripada jual semua sendiri, bangun jaringan reseller & agen di luar Bali. Mereka bantu distribusi; Anda fokus produksi & kualitas." },
        { type: "h3", text: "Persiapan ekspor" },
        { type: "p", text: "Pastikan kemasan & label memenuhi standar negara tujuan, sertifikat asal (COO) untuk bea rendah APTA, dan pakai freight forwarder yang melayani UMKM. Mulai ke satu negara dulu (mis. Singapura/Australia)." },
        { type: "h3", text: "Keberlanjutan & dampak sosial" },
        { type: "p", text: "Bahan lokal & ramah lingkungan bukan hanya tren, tapi nilai jual. Pembeli modern, terutama internasional, mencari produk berdampak positif. Ini juga melindungi bahan baku Anda untuk jangka panjang." },
        { type: "h3", text: "Bangun tim kecil" },
        { type: "p", text: "Saat pesanan melebihi kapasitas, latih & pekerjakan warga lokal. Ini memperbesar kapasitas sekaligus memberi dampak ekonomi ke komunitas — cerita yang memperkuat brand." },
        { type: "tip", text: "<strong>Ingat:</strong> Pertumbuhan terbaik adalah pertumbuhan yang tidak mengikis akar lokal Anda. Keaslian Bali adalah modal terbesar Anda — jagalah, jangan digantikan produksi massal generik." }
      ]
    }
  ];

  window.GUIDE_BOOK = GUIDE;
})();
