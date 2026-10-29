/* ============================================================
   UMKMBali — DewiAI (Mode Lokal / Fallback)
   Knowledge-base pencocokan intent. Dipakai otomatis bila
   server tidak punya API key OpenAI, atau sebagai cadangan.
   ============================================================ */
(function () {
  "use strict";

  const KNOWLEDGE = [
    {
      id: "memulai_usaha",
      keywords: { "mulai":3, "memulai":3, "buka usaha":3, "bisnis baru":3, "usaha baru":2, "rajin":1, "dari nol":3, "new business":1 },
      answer: () => ({
        text: "Langkah memulai usaha UMKM di Bali secara garis besar:",
        list: [
          "Temukan ide yang sesuai minat & potensi daerah Anda (kuliner, kerajinan, pertanian, jasa wisata).",
          "Riset pasar: siapa pembeli, di mana, dan bagaimana tren di Bali & turis.",
          "Susun model bisnis sederhana — produk, harga, tempat jual, dan promosi (4P).",
          "Siapkan modal awal: tabungan pribadi, koperasi, atau pembiayaan mikro KUR.",
          "Urus perizinan: NIB + sertifikat halal (jika kuliner) via OSS.",
          "Buat branding & kemasan yang menonjolkan cerita lokal Bali.",
          "Mulai jual dulu dalam skala kecil, uji pasar, lalu perbesar perlahan."
        ],
        tip: "Jangan tunggu sempurna. Jualan versi MVP (minimum viable product) dulu, perbaiki dari masukan pelanggan."
      })
    },
    {
      id: "pemasaran_online",
      keywords: { "pemasaran":3, "marketing":3, "jualan online":3, "online":2, "digital":2, "instagram":3, "tiktok":3, "sosmed":2, "media sosial":3, "promosi":2, "iklan":2, "engagement":2, "konten":2 },
      answer: () => ({
        text: "Strategi pemasaran online untuk UMKM Bali:",
        list: [
          "Pilih 1-2 platform dulu (Instagram untuk visual produk, TikTok untuk video proses pembuatan).",
          "Tunjukkan proses di balik layar (behind the scene) — turis & pembeli suka cerita keaslian.",
          "Pakai foto produk dengan pencahayaan alami dan background bernuansa Bali.",
          "Posting konsisten + gunakan hashtag lokal (#UMKMBali #ProdukLokalBali #BaliMade).",
          "Gabung marketplace: Tokopedia, Shopee, atau TikTok Shop untuk jangkauan nasional.",
          "Bangun trust: testimoni pelanggan, rating, dan balas DM dengan ramah & cepat.",
          "Pertimbangkan iklan berbayar kecil (Rp50rb) untuk menguji produk paling laku."
        ],
        tip: "Konten yang performa terbaik untuk UMKM Bali adalah video pendek proses membuat produk + cerita sang pembuat."
      })
    },
    {
      id: "perizinan",
      keywords: { "izin":3, "perizinan":3, "legalkan":3, "nib":3, "sertifikat":2, "halal":3, "oss":3, "pirt":3, "bpom":3, "legalitas":3, "dokumen":2, "registrasi":2, "sertifikasi":2 },
      answer: () => ({
        text: "Panduan perizinan usaha UMKM:",
        list: [
          "NIB (Nomor Induk Berusaha) — buat gratis lewat OSS (ss.business.oss.go.id).",
          "Dengan NIB Anda sudah dapat nomor pokok usaha & akses KUR (pinjaman rendah bunga).",
          "Kuliner: urus sertifikat halal gratis via SIHOL/BPJPH, serta PIRT untuk pangan rumah tangga.",
          "Kosmetik & obat tradisional: daftar BPOM melalui fitur Notifikasi/Reg Traditional.",
          "Logo/brand: daftarkan merek ke DJKI agar dilindungi dari pembajakan.",
          "Dinas KUKM Bali & KPUB sering adakan pendampingan gratis — manfaatkan!"
        ],
        tip: "NIB sekarang cukup 1 dokumen untuk hampir semua jenis usaha mikro. Prosesnya online dan bisa selesai dalam hari."
      })
    },
    {
      id: "keuangan",
      keywords: { "keuangan":3, "modal":3, "pembiayaan":3, "pinjaman":3, "kur":3, "uang":2, "laba":2, "koperasi":2, "catatan keuangan":3, "manajemen keuangan":3, "laba rugi":2, "cashflow":2, "arus kas":2, "profit":2 },
      answer: (q) => {
        if (/pinjaman|kur|modal usaha|kredit/i.test(q)) {
          return {
            text: "Opsi pembiayaan modal untuk UMKM:",
            list: [
              "KUR Mikro — pinjaman hingga Rp100jt, bunga 6%/tahun, tanpa agunan (cukup NIB).",
              "Pembiayaan koperasi & BMT lokal di Bali.",
              "Program kredit chaneling dari Pemprov Bali & bank daerah.",
              "Modal venture / angel investor untuk UMKM yang sudah skala & punya traction.",
              "Crowdfunding & pre-order via platform lokal."
            ],
            tip: "Sebelum mengajukan pinjaman, siapkan catatan keuangan 3-6 bulan terakhir. Bank/lembaga wajib melihatnya."
          };
        }
        return {
          text: "Dasar manajemen keuangan UMKM:",
          list: [
            "Pisahkan uang pribadi & usaha — buka rekening bisnis tersendiri.",
            "Catat pemasukan & pengeluaran harian (aplikasi gratis: BukuKas, Money Tracker).",
            "Hitung HPP (harga pokok produksi) agar tahu margin keuntungan per produk.",
            "Sisihkan minimal 10% laba untuk modal kerja, bukan habis di operasional.",
            "Buat target bulanan & bandingkan realisasi vs target setiap akhir bulan.",
            "Sisihkan dana darurat 1-3 bulan biaya operasional."
          ],
          tip: "Laba belum tentu berarti ada uang. Arus kas (cashflow) yang menentukan usaha Anda tetap hidup."
        };
      }
    },
    {
      id: "pengembangan_produk",
      keywords: { "kualitas":2, "inovasi":2, "kemasan":3, "packaging":3, "pengembangan":2, "varian":2, "produk baru":3, "merek":1 },
      answer: () => ({
        text: "Cara mengembangkan produk UMKM yang kompetitif:",
        list: [
          "Cari unique selling point — apa yang membuat produk Anda berbeda (cerita, bahan lokal, proses tradisional).",
          "Investasi di kemasan: kemasan baik menaikkan harga jual 2-3x lipat.",
          "Kemasan ramah lingkungan menambah daya tarik untuk turis & pasar ekspor.",
          "Ciptakan varian produk dari bahan dasar yang sama (mis. kopi: whole bean, ground, sachet).",
          "Minta feedback pelanggan & ubah kelemahan jadi perbaikan.",
          "Ikut pelatihan produksi dari Dinas KUKM atau komunitas UMKM Bali."
        ],
        tip: "Kemasan yang menonjolkan keaslian Bali (motif, bahan alami) bisa menaikkan harga jual signifikan untuk pasar turis & ekspor."
      })
    },
    {
      id: "produk_laku_turis",
      keywords: { "turis":3, "wisatawan":3, "oleh-oleh":3, "suvenir":3, "souvenir":3, "laku":2, "jual ke turis":3, "pasar wisata":3, "tourist":2 },
      answer: () => ({
        text: "Produk khas Bali yang laris untuk turis & pasar wisata:",
        list: [
          "Oleh-oleh kuliner: dodol, sambal matah, kopi Kintamani, kacang tanah bali — ringan dibawa.",
          "Kerajinan kecil: gantungan kunci perak, dreamcatcher, miniatur ukiran.",
          "Skincare natural (lulur boreh, sabun herbal) — turis suka produk 'wellness' Bali.",
          "Batik & fesyen ringan: kain, mukena, dress bermotif Bali.",
          "Kopi & cokelat premium sebagai 'craft gift'.",
          "Pengalaman: workshop 1-2 jam membuat produk (melukis, tenun, masak)."
        ],
        tip: "Turis beli cerita, bukan hanya barang. Sertakan kartu kecil yang menceritakan asal & pembuat produk Anda."
      })
    },
    {
      id: "harga",
      keywords: { "harga":3, "menetapkan harga":3, "mark up":2, "margin":3, "pricing":3, "berapa harga":3, "untung":2 },
      answer: () => ({
        text: "Cara menetapkan harga jual yang sehat:",
        list: [
          "Hitung HPP = bahan baku + tenaga kerja + overhead per unit.",
          "Tambahkan margin keuntungan (umumnya 30-50% untuk UMKM).",
          "Bandingkan harga kompetitor produk serupa — jangan terlalu murah.",
          "Untuk turis/ekspor, harga boleh lebih tinggi karena ada nilai cerita & keaslian.",
          "Buat harga grosir (untuk reseller) berbeda dari harga eceran.",
          "Evaluasi harga tiap 3-6 bulan, terutama saat bahan baku naik."
        ],
        tip: "Harga terlalu murah justru sering menurunkan kepercayaan. Produk khas Bali layak dihargai premium."
      })
    },
    {
      id: "ekspor",
      keywords: { "ekspor":3, "export":3, "kirim luar negeri":3, "luar negeri":2, "internasional":2, "shipping":1 },
      answer: () => ({
        text: "Memulai ekspor produk UMKM Bali:",
        list: [
          "Pastikan produk & kemasan memenuhi standar negara tujuan (label, komposisi, sertifikat).",
          "Gunakan jasa ekspedisi freight forwarder yang melayani UMKM.",
          "Buat dokumen: invoice, packing list, sertifikat asal (COO untuk bea murah APTA).",
          "Coba dulu pasar via marketplace cross-border atau platform ekspor UMKM.",
          "Bangun kepercayaan via sertifikasi (Halal, organik, fair trade).",
          "Ikut pameran ekspor yang diselenggarakan Disperindag/KPUB Bali."
        ],
        tip: "Mulai ekspor ke satu negara dulu (mis. Singapura atau Australia) sebelum melebarkan."
      })
    },
    {
      id: "salam",
      keywords: { "halo":3, "hai":3, "hello":3, "selamat pagi":3, "selamat siang":3, "selamat sore":3, "selamat malam":3, "apa kabar":3 },
      answer: () => ({
        text: "Om Swastiastu! Saya DewiAI, asisten bisnis untuk pelaku UMKM Bali. 🙏",
        list: null,
        extra: "Ada yang bisa saya bantu? Misalnya: cara memulai usaha, pemasaran online, perizinan, keuangan, atau rekomendasi produk untuk turis."
      })
    },
    {
      id: "terima_kasih",
      keywords: { "terima kasih":3, "makasih":3, "thanks":3, "suksme":3, "matur suksme":3 },
      answer: () => ({
        text: "Matur suksme! Senang bisa membantu. Semoga usaha Anda makin berkembang dan berkah. 🙏",
        list: null,
        extra: "Kapan saja butuh saran bisnis, saya di sini. Sukses selalu untuk UMKM Bali!"
      })
    }
  ];

  function recommendProducts(query) {
    const data = window.UMKM_DATA || [];
    let pool = data;
    const lower = (query || "").toLowerCase();
    const catMap = {
      kuliner: ["kuliner", "makanan", "minuman", "kopi", "oleh", "jajanan", "sambal", "arak"],
      kerajinan: ["kerajinan", "ukir", "tenun", "keramik", "perak", "kain"],
      fashion: ["fashion", "batik", "baju", "busana"],
      pertanian: ["pertanian", "kakao", "garam", "tani", "cokelat"],
      jasa: ["jasa", "wisata", "tour", "paket", "skincare"]
    };
    let cat = null;
    for (const c in catMap) { if (catMap[c].some(k => lower.includes(k))) { cat = c; break; } }
    if (cat) pool = data.filter(d => d.category === cat);
    if (/turis|wisata|suvenir|oleh/i.test(lower)) pool = data.filter(d => /kuliner|kerajinan|jasa/i.test(d.category));
    const scored = pool.map(d => {
      let s = 0;
      const hay = (d.name + " " + d.product + " " + d.desc + " " + d.tags.join(" ")).toLowerCase();
      lower.split(/\s+/).forEach(w => { if (w.length > 3 && hay.includes(w)) s += 1; });
      return { d, s };
    }).sort((a, b) => b.s - a.s || b.d.rating - a.d.rating);
    return scored.slice(0, 3).map(x => x.d);
  }

  function generateResponse(question) {
    const q = (question || "").toLowerCase().trim();
    if (/rekomendasi|saran produk|produk apa|ide produk|jual apa/i.test(q) || (/produk/.test(q) && /laku|turis|jualan/.test(q))) {
      const recs = recommendProducts(q);
      if (recs.length) return { text: "Berikut rekomendasi produk khas Bali yang potensial untuk Anda:", products: recs, tip: "Pelajari satu produk lebih dalam — sumber bahan, proses pembuatan, dan cerita di baliknya." };
    }
    let best = null, bestScore = 0;
    for (const intent of KNOWLEDGE) {
      let score = 0;
      for (const key in intent.keywords) { if (q.includes(key)) score += intent.keywords[key]; }
      if (score > bestScore) { bestScore = score; best = intent; }
    }
    if (best && bestScore >= 2) {
      const res = best.answer(question);
      res.id = best.id;
      return res;
    }
    return {
      text: "Pertanyaan menarik! Untuk membantu lebih akurat, berikut topik yang biasanya saya kuasai:",
      list: ["Memulai usaha UMKM dari nol", "Strategi pemasaran online & media sosial", "Perizinan (NIB, halal, BPOM, merek)", "Manajemen keuangan & pinjaman modal (KUR)", "Pengembangan & kemasan produk", "Rekomendasi produk untuk turis / ekspor"],
      extra: "Coba tanyakan salah satu topik di atas, atau ketik kata kunci seperti \"pemasaran\" atau \"perizinan\". 🙏"
    };
  }

  window.DewiAI = { generateResponse, recommendProducts };
})();
