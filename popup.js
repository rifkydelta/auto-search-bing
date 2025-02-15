let generatedLinks = [];

// Fungsi untuk update tampilan daftar link di popup
function updateLinkListDisplay() {
  const linkListDiv = document.getElementById("linkList");
  if (generatedLinks.length === 0) {
    linkListDiv.innerHTML = "<p>Tidak ada link yang digenerate.</p>";
    document.getElementById("nextSearch").disabled = true;
    return;
  }
  let html = "<ul>";
  generatedLinks.forEach(link => {
    html += `<li>${link}</li>`;
  });
  html += "</ul>";
  linkListDiv.innerHTML = html;
  document.getElementById("nextSearch").disabled = false;
}

// Fungsi untuk menyimpan link ke chrome.storage
function saveLinksToStorage() {
  chrome.storage.local.set({ generatedLinks: generatedLinks }, function() {
    // Link sudah tersimpan
  });
}

// Fungsi untuk load link dari chrome.storage
function loadLinksFromStorage() {
  chrome.storage.local.get(["generatedLinks"], function(result) {
    if (result.generatedLinks && Array.isArray(result.generatedLinks)) {
      generatedLinks = result.generatedLinks;
    }
    updateLinkListDisplay();
  });
}

// Array kata-kata umum dalam bahasa Indonesia (1 kata per item)
const commonWords = [
  "cara", "membuat", "terbaik", "murah", "gratis", "tutorial", "ulasan", "tips", "panduan",
  "contoh", "resep", "layanan", "online", "unduh", "download", "update", "baru", "terkini",
  "top", "daftar", "apa", "adalah", "bisa", "versus", "bandingkan", "kenapa", "dimana", "kapan",
  "definisi", "manfaat", "keuntungan", "kerugian", "kelebihan", "kekurangan", "sejarah",
  "analisis", "statistik", "fakta", "rumus", "metode", "teknik", "solusi", "jawaban",
  "masalah", "kasus", "studi", "teknologi", "tren", "terbaru", "berita", "informasi",
  "buku", "ide", "inspirasi", "perbandingan", "fungsi", "penyebab", "efek", "dampak",
  "sumber", "referensi", "praktis", "efektif", "efisien", "ampuh", "cepat", "mudah",
  "akurat", "tepat", "aman", "bagaimana", "mengapa", "penjelasan", "strategi",
  "rekomendasi", "pengertian", "makna", "testimoni", "bukti", "praktik", "alternatif",
  "inovasi", "populer", "favorit", "langkah", "prosedur", "kebijakan", "aturan",
  "hukum", "syarat", "perbedaan", "persamaan", "hubungan", "pengaruh", "laporan",
  "penelitian", "unik", "menarik", "kesalahan", "mitos", "kenyataan", "ilmiah",
  "prediksi", "perkiraan", "visi", "misi", "tujuan", "konsep", "teori", "hipotesis",
  "eksperimen", "uji", "data", "penemuan", "revolusi", "struktur", "organisasi",
  "pengelolaan", "manajemen", "optimasi", "keamanan", "privasi", "etika", "hak",
  "lisensi", "standar", "sertifikasi", "kredibilitas", "pengguna", "pengalaman",
  "kesaksian", "riset", "keputusan", "pilihan", "resiko", "investasi", "bisnis",
  "usaha", "penghasilan", "penghematan", "budgeting", "keuangan", "tabungan",
  "strategi", "pemasaran", "media", "sosial", "iklan", "branding", "produk",
  "tren", "terkini", "AI", "robot", "otomatisasi", "blockchain", "keamanan",
  "hacking", "software", "gadget", "smartphone", "kamera", "laptop", "PC",
  "gaming", "console", "game", "e-sports", "streaming", "konten", "creator",
  "viral", "engagement", "video", "editing", "podcast", "monetisasi",
  "penghasilan", "dropshipping", "e-commerce", "marketplace", "jualan",
  "copywriting", "SEO", "iklan", "trafik", "website", "hosting", "domain",
  "blogging", "wordpress", "shopify", "toko", "strategi", "diskon", "promosi",
  "email", "loyalitas", "pelanggan", "pemasaran", "sosial", "facebook",
  "google", "adsense", "algoritma", "instagram", "tiktok", "youtube",
  "startup", "usaha", "modal", "tanpa", "pekerjaan", "lowongan", "freelance",
  "remote", "wirausaha", "karir", "gaji", "saham", "crypto", "bitcoin",
  "keuangan", "budgeting", "pinjaman", "hutang", "strategi", "brand",
  "influencer", "endorsement", "sponsorship", "event", "CRM", "keputusan",
  "keuntungan", "penjualan", "perubahan", "konsumen", "iklan", "kerjasama",
  "analisis", "kompetitor", "pasar", "produk", "pengaruh", "perbedaan",
  "persamaan", "syarat", "aturan", "hukum", "legalitas", "resiko",
  "keuntungan", "peluang", "potensi", "tren", "masa", "depan", "perkiraan",
  "eksperimen", "penemuan", "data", "statistik", "bukti", "hipotesis",
  "studi", "laporan", "penelitian", "sejarah", "referensi", "sumber",
  "kenyataan", "mitos", "kesalahan", "strategi", "optimasi", "efektivitas",
  "efisiensi", "perlindungan", "standar", "kredibilitas", "sertifikasi",
  "hak", "privasi", "keamanan", "teknologi", "transformasi", "struktur",
  "organisasi", "pengelolaan", "manajemen", "optimasi", "perlindungan",
  "sertifikasi", "laporan", "pengguna", "pengalaman", "testimoni", "praktik",
  "alternatif", "bukti", "makna", "pengertian", "rekomendasi", "strategi",
  "tahapan", "langkah", "prosedur", "syarat", "perbedaan", "persamaan",
  "dampak", "pengaruh", "laporan", "investasi", "resiko", "keputusan",
  "bisnis", "wirausaha", "startup", "modal", "tanpa", "pekerjaan",
  "lowongan", "karir", "freelance", "remote", "wirausaha", "karir",
  "penghasilan", "keuangan", "tabungan", "investasi", "asuransi",
  "budgeting", "hutang", "saham", "crypto", "bitcoin", "keuangan",
  "strategi", "bisnis", "usaha", "pemasaran", "iklan", "branding",
  "digital", "influencer", "iklan", "media", "sosial", "dropshipping",
  "e-commerce", "marketplace", "toko", "website", "SEO", "trafik",
  "iklan", "facebook", "google", "instagram", "tiktok", "youtube",
  "konten", "viral", "engagement", "monetisasi", "strategi", "produk",
  "tren", "terbaru", "teknologi", "tren", "masa", "depan", "eksperimen",
  "AI", "robot", "otomatisasi", "blockchain", "cyber", "security",
  "hacking", "teknologi", "tren", "produk", "smartphone", "kamera",
  "laptop", "PC", "gaming", "console", "game", "e-sports", "streaming",
  "konten", "creator", "video", "editing", "podcast", "monetisasi"
];

// Fungsi untuk generate link dengan kata per link acak (3-5 kata)
function generateLinks(num, formID) {
  let links = [];
  for (let i = 0; i < num; i++) {
    // Tentukan jumlah kata antara 3 sampai 5
    const wordsCount = Math.floor(Math.random() * 3) + 3;  // Random: 3,4,5
    let linkWords = [];
    for (let j = 0; j < wordsCount; j++) {
      const randIndex = Math.floor(Math.random() * commonWords.length);
      linkWords.push(commonWords[randIndex]);
    }
    // Encode setiap kata dan gabung dengan tanda '+'
    const query = linkWords.map(word => encodeURIComponent(word)).join("+");
    links.push(`https://bing.com/search?q=${query}&qs=PN&form=${encodeURIComponent(formID)}`);
  }
  return links;
}

// Event listener untuk tombol SAVE
document.getElementById("saveBtn").addEventListener("click", () => {
  const jumlah = parseInt(document.getElementById("jumlahInput").value, 10);
  const formID = document.getElementById("idInput").value.trim();

  if (!jumlah || jumlah < 1) {
    alert("Masukin jumlah link yang valid!");
    return;
  }
  if (!formID) {
    alert("Masukin ID search yang valid!");
    return;
  }

  generatedLinks = generateLinks(jumlah, formID);
  saveLinksToStorage();
  updateLinkListDisplay();
  alert(`Berhasil generate ${jumlah} link!`);
});

// Event listener untuk tombol BUKA LINK
document.getElementById("nextSearch").addEventListener("click", () => {
  if (generatedLinks.length > 0) {
    const link = generatedLinks.shift();
    chrome.tabs.update({ url: link });
    saveLinksToStorage();
    updateLinkListDisplay();
  } else {
    alert("Wah, semua link udah kebuka! Generate ulang link.");
    document.getElementById("nextSearch").disabled = true;
  }
});

// Load link saat popup dibuka
loadLinksFromStorage();
