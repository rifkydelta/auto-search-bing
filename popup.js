let generatedLinks = [];

// Function to update the display of the generated links in the popup
function updateLinkListDisplay() {
  const linkListDiv = document.getElementById("linkList");
  if (generatedLinks.length === 0) {
    linkListDiv.innerHTML = "<p>No generated links available.</p>";
    document.getElementById("nextSearch").disabled = true;
    document.getElementById("runBot").disabled = true;
    return;
  }
  let html = "<ul>";
  generatedLinks.forEach(link => {
    html += `<li>${link}</li>`;
  });
  html += "</ul>";
  linkListDiv.innerHTML = html;
  document.getElementById("nextSearch").disabled = false;
  document.getElementById("runBot").disabled = false;
}

// Function to save links to chrome.storage
function saveLinksToStorage() {
  chrome.storage.local.set({ generatedLinks: generatedLinks }, function() {
    // Links have been saved
  });
}

// Function to load links from chrome.storage
function loadLinksFromStorage() {
  chrome.storage.local.get(["generatedLinks"], function(result) {
    if (result.generatedLinks && Array.isArray(result.generatedLinks)) {
      generatedLinks = result.generatedLinks;
    }
    updateLinkListDisplay();
  });
}

// Array of common Indonesian words (one word per item)
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
  "konten", "viral", "engagement", "monetisasi"
];

// Function to generate links with a random query of 3-5 words per link
function generateLinks(num, formID) {
  let links = [];
  for (let i = 0; i < num; i++) {
    // Determine a random number of words between 3 and 5 (Random: 3, 4, or 5)
    const wordsCount = Math.floor(Math.random() * 3) + 3;
    let linkWords = [];
    for (let j = 0; j < wordsCount; j++) {
      const randIndex = Math.floor(Math.random() * commonWords.length);
      linkWords.push(commonWords[randIndex]);
    }
    // Encode each word and join them with '+'
    const query = linkWords.map(word => encodeURIComponent(word)).join("+");
    links.push(`https://bing.com/search?q=${query}&qs=PN&form=${encodeURIComponent(formID)}`);
  }
  return links;
}
// Event listener for the SAVE button
document.getElementById("saveBtn").addEventListener("click", () => {
  const amount = parseInt(document.getElementById("amountInput").value, 10);
  const formID = document.getElementById("formIdInput").value.trim();

  if (!amount || amount < 1) {
    alert("Please enter a valid number of links!");
    return;
  }
  if (!formID) {
    alert("Please enter a valid search ID!");
    return;
  }

  generatedLinks = generateLinks(amount, formID);
  saveLinksToStorage();
  updateLinkListDisplay();
  alert(`Successfully generated ${amount} links!`);
});

// Event listener for the OPEN LINK button
document.getElementById("nextSearch").addEventListener("click", () => {
  if (generatedLinks.length > 0) {
    const link = generatedLinks.shift();
    chrome.tabs.update({ url: link });
    saveLinksToStorage();
    updateLinkListDisplay();
  } else {
    alert("Wow, all links have been opened! Please generate new links.");
    document.getElementById("nextSearch").disabled = true;
    document.getElementById("runBot").disabled = true;
  }
});

// Event listener for the RUN BOT button
document.getElementById("runBot").addEventListener("click", () => {
  runBot();
});

// Function to run the bot that automatically opens links with a random delay
function runBot() {
  // Update the link list display
  const minDelay = 5000;
  const maxDelay = 8000;

  if (generatedLinks.length > 0) {
    const link = generatedLinks.shift();
    chrome.tabs.update({ url: link });
    saveLinksToStorage();
    updateLinkListDisplay();
    const delay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
    setTimeout(runBot, delay);
  } else {
    alert("Wow, all links have been opened! Please generate new links.");
    document.getElementById("nextSearch").disabled = true;
    document.getElementById("runBot").disabled = true;
  }
}

// Load links when the popup is opened
loadLinksFromStorage();
