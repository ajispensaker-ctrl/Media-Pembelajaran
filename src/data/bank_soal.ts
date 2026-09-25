export interface Soal {
  id: string;
  kategori: string;
  tingkat: 'mudah' | 'sedang' | 'sulit';
  tipe: 'pilihan_ganda';
  poin: number;
  pertanyaan: string;
  opsi: [string, string, string, string];
  jawaban: number; // 0..3
  pembahasan: string;
}

export interface BankSoalData {
  meta: {
    judul: string;
    mapel: string;
    jenjang: string;
    kelas: string;
    semester: string;
    bab: string;
    versi: string;
    penyusun: string;
  };
  kategori: string[];
  tingkat: string[];
  soal: Soal[];
}

export const BANK_SOAL: BankSoalData = {
  meta: {
    judul: "Kecerdasan Artifisial Generatif",
    mapel: "Koding dan Kecerdasan Artificial",
    jenjang: "SMP",
    kelas: "7",
    semester: "Ganjil / Fase D",
    bab: "Konsep dan Cara Kerja Kecerdasan Artifisial Generatif",
    versi: "1.0.0",
    penyusun: "Lead Educational Game Developer"
  },
  kategori: [
    "Konsep Dasar AI & GenAI",
    "AI Tradisional vs GenAI",
    "Ragam Karya & Modalitas GenAI",
    "Cara Kerja & Prompting",
    "Etika, Batasan & Sikap Bijak",
    "Studi Kasus & Konteks Siswa"
  ],
  tingkat: ["mudah", "sedang", "sulit"],
  soal: [
    // --- Kategori 1: Konsep Dasar AI & GenAI ---
    {
      id: "KAI-001",
      kategori: "Konsep Dasar AI & GenAI",
      tingkat: "mudah",
      tipe: "pilihan_ganda",
      poin: 10,
      pertanyaan: "Apa kepanjangan dari AI dalam dunia teknologi komputer?",
      opsi: ["Artificial Intelligence", "Automatic Information", "Applied Internet", "Algorithmic Interface"],
      jawaban: 0,
      pembahasan: "AI singkatan dari Artificial Intelligence (Kecerdasan Buatan)."
    },
    {
      id: "KAI-002",
      kategori: "Konsep Dasar AI & GenAI",
      tingkat: "mudah",
      tipe: "pilihan_ganda",
      poin: 10,
      pertanyaan: "Ciri utama dari Kecerdasan Artifisial Generatif (Generative AI) adalah kemampuannya untuk...",
      opsi: ["Membuat atau menciptakan konten baru", "Mematikan komputer secara otomatis", "Menghapus virus di flashdisk", "Menghitung nilai raport saja"],
      jawaban: 0,
      pembahasan: "GenAI memiliki keahlian utama menciptakan konten orisinal baru (teks, gambar, audio, dll)."
    },
    {
      id: "KAI-003",
      kategori: "Konsep Dasar AI & GenAI",
      tingkat: "mudah",
      tipe: "pilihan_ganda",
      poin: 10,
      pertanyaan: "Dalam analogi sederhana, Generative AI diibaratkan seperti seorang...",
      opsi: ["Seniman yang melukis karya dari imajinasi", "Juri yang hanya menilai karya orang lain", "Penjaga kasir toko yang menghitung nota", "Kamera CCTV yang merekam jalan raya"],
      jawaban: 0,
      pembahasan: "Generative AI seperti seniman yang menghasilkan karya baru, sedangkan AI tradisional seperti juri."
    },
    {
      id: "KAI-004",
      kategori: "Konsep Dasar AI & GenAI",
      tingkat: "sedang",
      tipe: "pilihan_ganda",
      poin: 20,
      pertanyaan: "Mengapa Generative AI disebut 'Generatif'?",
      opsi: ["Karena berasal dari kata 'generate' yang artinya menghasilkan atau membangkitkan", "Karena hanya dibuat oleh generasi muda", "Karena membutuhkan koneksi internet berkecepatan 5G", "Karena hanya berfungsi pada komputer generasi lama"],
      jawaban: 0,
      pembahasan: "Generatif berasal dari 'to generate' yang berarti memproduksi, menciptakan, atau membangkitkan konten baru."
    },
    {
      id: "KAI-005",
      kategori: "Konsep Dasar AI & GenAI",
      tingkat: "sedang",
      tipe: "pilihan_ganda",
      poin: 20,
      pertanyaan: "Apakah Generative AI benar-benar memiliki perasaan dan akal budi seperti manusia?",
      opsi: ["Tidak, AI hanya memproses pola matematika dan probabilitas kata/piksel", "Ya, AI memiliki emosi dan kesadaran diri sendiri", "Ya, saat baterai perangkat terisi penuh 100%", "Hanya jika komputer terhubung ke internet"],
      jawaban: 0,
      pembahasan: "AI tidak memiliki perasaan atau kesadaran, melainkan model matematis statistik canggih."
    },
    {
      id: "KAI-006",
      kategori: "Konsep Dasar AI & GenAI",
      tingkat: "sulit",
      tipe: "pilihan_ganda",
      poin: 30,
      pertanyaan: "Teknologi pondasi di balik Generative AI modern yang memungkinkannya belajar dari data skala masif disebut...",
      opsi: ["Deep Learning & Model Jaringan Saraf Tiruan", "Flashdisk berkapasitas besar", "Sistem operasi DOS kuno", "Kabel serat optik bawah laut"],
      jawaban: 0,
      pembahasan: "Fondasi Generative AI adalah Machine Learning / Deep Learning dengan arsitektur jaringan saraf tiruan (neural networks/transformer)."
    },

    // --- Kategori 2: AI Tradisional vs GenAI ---
    {
      id: "KAI-007",
      kategori: "AI Tradisional vs GenAI",
      tingkat: "mudah",
      tipe: "pilihan_ganda",
      poin: 10,
      pertanyaan: "Tugas manakah yang merupakan contoh pekerjaan dari AI Tradisional (Biasa)?",
      opsi: ["Mendeteksi apakah email masuk adalah Spam atau Bukan", "Menulis cerita dongeng fantasi 5 babak", "Menggubah lagu pop dengan lirik bahasa Jawa", "Membuat lukisan pemandangan negeri dongeng"],
      jawaban: 0,
      pembahasan: "Filter spam adalah contoh klasifikasi AI tradisional, bukan membuat konten baru."
    },
    {
      id: "KAI-008",
      kategori: "AI Tradisional vs GenAI",
      tingkat: "mudah",
      tipe: "pilihan_ganda",
      poin: 10,
      pertanyaan: "Sistem rekomendasi video di YouTube atau beranda TikTok termasuk ke dalam jenis...",
      opsi: ["AI Tradisional (Analisis & Klasifikasi Data)", "Generative AI", "Perangkat Keras Mekanik", "Kamera Sensor Gerak"],
      jawaban: 0,
      pembahasan: "Sistem rekomendasi menganalisis riwayat tontonan dan menyaring video yang sudah ada (klasifikasi/ranking)."
    },
    {
      id: "KAI-009",
      kategori: "AI Tradisional vs GenAI",
      tingkat: "sedang",
      tipe: "pilihan_ganda",
      poin: 20,
      pertanyaan: "Perbedaan utama fungsi AI Tradisional dibanding Generative AI adalah...",
      opsi: ["AI tradisional menganalisis data yang ada, GenAI menciptakan konten baru", "AI tradisional butuh listrik, GenAI tidak butuh listrik", "AI tradisional hanya untuk dokter, GenAI hanya untuk gamer", "AI tradisional berbentuk robot fisik, GenAI berupa kabel"],
      jawaban: 0,
      pembahasan: "Fungsi utama AI tradisional adalah analisis & klasifikasi, sedangkan GenAI menghasilkan konten baru."
    },
    {
      id: "KAI-010",
      kategori: "AI Tradisional vs GenAI",
      tingkat: "sedang",
      tipe: "pilihan_ganda",
      poin: 20,
      pertanyaan: "Fitur face unlock (pemindai wajah) di smartphone untuk membuka kunci layar adalah contoh...",
      opsi: ["AI Pengenalan Pola (Tradisional)", "Generative AI pembuat wajah baru", "Deepfake audio interaktif", "Chatbot teks"],
      jawaban: 0,
      pembahasan: "Face unlock membandingkan wajah di kamera dengan foto pemilik (verifikasi/klasifikasi pola)."
    },
    {
      id: "KAI-011",
      kategori: "AI Tradisional vs GenAI",
      tingkat: "sulit",
      tipe: "pilihan_ganda",
      poin: 30,
      pertanyaan: "Jika seorang siswa meminta komputer menghasilkan 3 bait puisi tentang keindahan Gunung Sindoro, teknologi yang bekerja adalah...",
      opsi: ["Generative AI berbasis teks", "AI Tradisional pemindai barcode", "Sensor pengukur suhu udara", "Program kalkulator digital"],
      jawaban: 0,
      pembahasan: "Menghasilkan puisi baru berdasarkan instruksi adalah kapabilitas Generative AI teks."
    },

    // --- Kategori 3: Ragam Karya & Modalitas GenAI ---
    {
      id: "KAI-012",
      kategori: "Ragam Karya & Modalitas GenAI",
      tingkat: "mudah",
      tipe: "pilihan_ganda",
      poin: 10,
      pertanyaan: "Manakah contoh aplikasi Generative AI yang populer untuk menghasilkan teks dan menjawab pertanyaan?",
      opsi: ["ChatGPT & Google Gemini", "VLC Media Player", "Microsoft Excel 2003", "WinRAR Archiver"],
      jawaban: 0,
      pembahasan: "ChatGPT dan Google Gemini adalah LLM/Generative AI teks populer."
    },
    {
      id: "KAI-013",
      kategori: "Ragam Karya & Modalitas GenAI",
      tingkat: "mudah",
      tipe: "pilihan_ganda",
      poin: 10,
      pertanyaan: "Aplikasi yang dirancang khusus untuk menghasilkan gambar/ilustrasi baru dari deskripsi teks adalah...",
      opsi: ["Midjourney dan DALL-E", "Adobe Acrobat PDF Reader", "Google Chrome Browser", "Notepad Windows"],
      jawaban: 0,
      pembahasan: "Midjourney dan DALL-E adalah AI pembuat gambar (text-to-image)."
    },
    {
      id: "KAI-014",
      kategori: "Ragam Karya & Modalitas GenAI",
      tingkat: "mudah",
      tipe: "pilihan_ganda",
      poin: 10,
      pertanyaan: "Aplikasi Suno AI dan ElevenLabs adalah contoh Generative AI dalam bidang...",
      opsi: ["Musik dan Suara / Audio", "Pengukur kecepatan lari", "Penyiram tanaman otomatis", "Pengatur suhu ruangan pendingin"],
      jawaban: 0,
      pembahasan: "Suno AI menghasilkan musik/lagu, sedangkan ElevenLabs menghasilkan suara bicara (voice cloning/synthesis)."
    },
    {
      id: "KAI-015",
      kategori: "Ragam Karya & Modalitas GenAI",
      tingkat: "sedang",
      tipe: "pilihan_ganda",
      poin: 20,
      pertanyaan: "Bentuk konten apa saja yang DAPAT dihasilkan oleh Generative AI modern?",
      opsi: ["Teks, Gambar, Musik, Suara, dan Video", "Hanya teks hitam putih di layar monitor", "Hanya angka-angka pada tabel matematika", "Hanya berkas program instalasi Windows (.exe)"],
      jawaban: 0,
      pembahasan: "GenAI saat ini bersifat multimodal: teks, visual, audio, kode program, hingga video bergerak."
    },
    {
      id: "KAI-016",
      kategori: "Ragam Karya & Modalitas GenAI",
      tingkat: "sedang",
      tipe: "pilihan_ganda",
      poin: 20,
      pertanyaan: "Teknologi Generative AI yang bisa menuliskan baris kode program (koding) Python atau JavaScript disebut...",
      opsi: ["AI Code Generator (contoh: GitHub Copilot)", "Antivirus otomatis", "Webcam resolusi tinggi", "Kabel konektor HDMI"],
      jawaban: 0,
      pembahasan: "AI Code Generator membantu programmer menghasilkan fungsi dan kode program komputer baru."
    },
    {
      id: "KAI-017",
      kategori: "Ragam Karya & Modalitas GenAI",
      tingkat: "sulit",
      tipe: "pilihan_ganda",
      poin: 30,
      pertanyaan: "Fitur 'Magic Media' di Canva memungkinkan pengguna membuat desain unik dengan cara...",
      opsi: ["Mengetikkan teks perintah (prompt) lalu AI merender gambar yang belum pernah ada", "Mengambil foto orang lain di internet secara diam-diam", "Memindai foto dengan scanner kantor", "Memotret layar komputer dengan kamera handphone"],
      jawaban: 0,
      pembahasan: "Canva Magic Media memanfaatkan model Text-to-Image generatif untuk menciptakan aset visual baru."
    },

    // --- Kategori 4: Cara Kerja & Prompting ---
    {
      id: "KAI-018",
      kategori: "Cara Kerja & Prompting",
      tingkat: "mudah",
      tipe: "pilihan_ganda",
      poin: 10,
      pertanyaan: "Apa yang dimaksud dengan 'Prompt' dalam penggunaan Generative AI?",
      opsi: ["Instruksi atau perintah berupa teks/suara yang kita berikan kepada AI", "Nama jenis kabel penghubung komputer", "Kata sandi rahasia untuk login ke Wi-Fi sekolah", "Tombol darurat untuk mematikan komputer"],
      jawaban: 0,
      pembahasan: "Prompt adalah teks atau instruksi masukan yang memandu AI menghasilkan respon yang diinginkan."
    },
    {
      id: "KAI-019",
      kategori: "Cara Kerja & Prompting",
      tingkat: "mudah",
      tipe: "pilihan_ganda",
      poin: 10,
      pertanyaan: "Urutan 3 tahapan utama bagaimana Generative AI bekerja adalah...",
      opsi: ["Pelatihan Data (Training) ➔ Masukan Perintah (Prompt) ➔ Pembuatan Karya (Generate)", "Download Game ➔ Instalasi Game ➔ Menghapus Game", "Membeli Komputer ➔ Membuka Kardus ➔ Menjual Komputer", "Mengetik Tugas ➔ Mematikan Layar ➔ Mencabut Kabel Listrik"],
      jawaban: 0,
      pembahasan: "Alur kerja GenAI: Training (belajar dari data), Prompt (menerima arahan), Generate (menciptakan output)."
    },
    {
      id: "KAI-020",
      kategori: "Cara Kerja & Prompting",
      tingkat: "mudah",
      tipe: "pilihan_ganda",
      poin: 10,
      pertanyaan: "Pada tahap 'Training' (Pelatihan), apa yang dilakukan oleh sistem AI?",
      opsi: ["Mempelajari pola dari jutaan data buku, gambar, dan artikel", "Mencuci komponen komputer dengan detergen", "Mengirimkan pesan promosi ke semua kontak siswa", "Menghapus semua file di harddisk"],
      jawaban: 0,
      pembahasan: "Tahap training melatih model mengenali pola bahasa, visual, dan hubungan konsep dari data masif."
    },
    {
      id: "KAI-021",
      kategori: "Cara Kerja & Prompting",
      tingkat: "sedang",
      tipe: "pilihan_ganda",
      poin: 20,
      pertanyaan: "Manakah prompt berikut yang paling efektif untuk meminta AI membuat ringkasan materi pelajaran?",
      opsi: ["'Rangkumkan materi daur air menjadi 3 poin penting dengan bahasa sederhana untuk siswa kelas 7'", "'Hei AI tolong kerjakan sekarang juga'", "'Buat IPA cepat'", "'Apakah kamu tahu tentang air?'"],
      jawaban: 0,
      pembahasan: "Prompt yang baik memiliki tujuan jelas, batasan (3 poin), target pembaca (kelas 7), dan instruksi terarah."
    },
    {
      id: "KAI-022",
      kategori: "Cara Kerja & Prompting",
      tingkat: "sedang",
      tipe: "pilihan_ganda",
      poin: 20,
      pertanyaan: "Ketika AI melukis gambar kucing astronot di bulan, dari mana AI mendapatkan gambar tersebut?",
      opsi: ["AI menyusun piksel baru berdasarkan kombinasi pola kucing, helm astronot, dan permukaan bulan yang telah dipelajari", "AI mencuri satu foto langsung dari museum NASA tanpa diubah", "AI memotret kucing sungguhan di luar angkasa menggunakan satelit", "AI menjiplak gambar dari buku gambar siswa"],
      jawaban: 0,
      pembahasan: "AI mensintesis kombinasi pola fitur (kucing + helm + bulan) menjadi piksel-piksel baru secara probabilistik."
    },
    {
      id: "KAI-023",
      kategori: "Cara Kerja & Prompting",
      tingkat: "sedang",
      tipe: "pilihan_ganda",
      poin: 20,
      pertanyaan: "Jika hasil jawaban AI terlalu panjang dan sulit dipahami, langkah tepat yang harus dilakukan siswa adalah...",
      opsi: ["Memberikan prompt lanjutan: 'Sederhanakan penjelasan di atas menjadi 3 kalimat mudah dipahami'", "Mematikan layar papan interaktif dengan paksa", "Menangis dan tidak mau belajar koding lagi", "Menyalin seluruh teks rumit tersebut ke buku catatan"],
      jawaban: 0,
      pembahasan: "Prompt engineering bersifat interaktif; kita bisa memandu AI menyederhanakan hasil sesuai kebutuhan."
    },
    {
      id: "KAI-024",
      kategori: "Cara Kerja & Prompting",
      tingkat: "sulit",
      tipe: "pilihan_ganda",
      poin: 30,
      pertanyaan: "Dalam istilah teknis AI Teks (LLM), satuan potongan kata atau karakter yang diproses oleh AI disebut...",
      opsi: ["Token", "Megabyte", "Kilowatt", "Folder"],
      jawaban: 0,
      pembahasan: "Model bahasa besar (LLM) memecah kalimat menjadi unit terkecil berupa 'token' untuk diproses."
    },

    // --- Kategori 5: Etika, Batasan & Sikap Bijak ---
    {
      id: "KAI-025",
      kategori: "Etika, Batasan & Sikap Bijak",
      tingkat: "mudah",
      tipe: "pilihan_ganda",
      poin: 10,
      pertanyaan: "Apa yang dimaksud dengan istilah 'Halusinasi AI' (AI Hallucination)?",
      opsi: ["Saat AI memberikan jawaban yang terdengar sangat meyakinkan tetapi faktanya salah atau mengada-ada", "Saat komputer mengeluarkan suara dengungan kipas yang keras", "Saat layar monitor bergoyang karena gempa bumi", "Saat AI menolak menjawab karena baterai habis"],
      jawaban: 0,
      pembahasan: "Halusinasi AI adalah fenomena ketika AI mengarang informasi yang tidak faktual dengan gaya bahasa percaya diri."
    },
    {
      id: "KAI-026",
      kategori: "Etika, Batasan & Sikap Bijak",
      tingkat: "mudah",
      tipe: "pilihan_ganda",
      poin: 10,
      pertanyaan: "Tindakan bijak pertama kali ketika kamu menerima jawaban berupa data fakta dari AI adalah...",
      opsi: ["Melakukan Cross-Check (memeriksa kebenaran di buku pelajaran atau sumber terpercaya)", "Langsung mempercayai 100% tanpa membaca lagi", "Menyebarkannya langsung ke grup WhatsApp keluarga sebagai fakta mutlak", "Mencetak sebanyak 100 lembar untuk dibagikan ke teman"],
      jawaban: 0,
      pembahasan: "Siswa cerdas selalu melakukan verifikasi silang (cross-check) terhadap data buatan AI."
    },
    {
      id: "KAI-027",
      kategori: "Etika, Batasan & Sikap Bijak",
      tingkat: "mudah",
      tipe: "pilihan_ganda",
      poin: 10,
      pertanyaan: "Apa bahaya dari teknologi 'Deepfake' yang dihasilkan oleh Generative AI?",
      opsi: ["Bisa digunakan untuk membuat video atau suara tiruan palsu orang lain demi menyebarkan hoaks atau penipuan", "Bisa membuat baterai HP menjadi kembung", "Bisa menghapus kuota internet dalam 1 detik", "Bisa mengubah warna casing ponsel"],
      jawaban: 0,
      pembahasan: "Deepfake dapat meniru wajah dan suara seseorang secara realistis sehingga rawan disalahgunakan untuk hoaks."
    },
    {
      id: "KAI-028",
      kategori: "Etika, Batasan & Sikap Bijak",
      tingkat: "sedang",
      tipe: "pilihan_ganda",
      poin: 20,
      pertanyaan: "Bolehkah seorang siswa menyalin bulat-bulat karangan AI lalu mengumpulkannya seolah-olah karyanya sendiri?",
      opsi: ["Tidak boleh, karena itu tindakan plagiarisme dan tidak mengasah kemampuan berpikir kritis diri sendiri", "Boleh, asalkan guru tidak sedang berada di ruang kelas", "Sangat dianjurkan agar siswa tidak perlu belajar lagi", "Boleh jika menggunakan kuota internet pribadi"],
      jawaban: 0,
      pembahasan: "Menyalin 100% tanpa analisis adalah plagiarisme dan menghambat proses belajar mandiri siswa."
    },
    {
      id: "KAI-029",
      kategori: "Etika, Batasan & Sikap Bijak",
      tingkat: "sedang",
      tipe: "pilihan_ganda",
      poin: 20,
      pertanyaan: "Mengapa kita TIDAK BOLEH memasukkan informasi rahasia atau data pribadi (seperti NIK, alamat rumah, password) ke prompt AI publik?",
      opsi: ["Karena data tersebut dapat tersimpan di server dan berisiko bocor atau digunakan untuk melatih sistem", "Karena AI akan langsung memarahi pengguna dengan suara alarm", "Karena AI akan mengirim paket tagihan ke rumah siswa", "Karena huruf pada keyboard akan terkunci otomatis"],
      jawaban: 0,
      pembahasan: "Privasi data sangat penting; jangan pernah membagikan data identitas pribadi sensitif ke sistem AI daring."
    },
    {
      id: "KAI-030",
      kategori: "Etika, Batasan & Sikap Bijak",
      tingkat: "sedang",
      tipe: "pilihan_ganda",
      poin: 20,
      pertanyaan: "Cara terbaik memanfaatkan Generative AI dalam mengerjakan tugas proyek sekolah adalah...",
      opsi: ["Sebagai mitra diskusi (brainstorming) ide, mencari sudut pandang baru, dan merapikan alur tulisan", "Menyuruh AI menulis semuanya dari awal sampai akhir lalu tidur siang", "Meminta AI membuatkan surat izin sakit palsu", "Menyuruh AI meretas akun media sosial sekolah"],
      jawaban: 0,
      pembahasan: "AI paling bermanfaat sebagai asisten berpikir kritis dan pencetus ide awal (copilot belajar)."
    },
    {
      id: "KAI-031",
      kategori: "Etika, Batasan & Sikap Bijak",
      tingkat: "sulit",
      tipe: "pilihan_ganda",
      poin: 30,
      pertanyaan: "Isu hak cipta (copyright) pada Generative AI muncul karena...",
      opsi: ["AI dilatih menggunakan jutaan karya seni dan tulisan manusia tanpa selalu meminta izin pemilik aslinya", "AI hanya bisa dibeli menggunakan mata uang luar negeri", "Pembuat AI menolak menjual komputernya ke sekolah", "Karya AI hanya boleh disimpan di flashdisk khusus"],
      jawaban: 0,
      pembahasan: "Kontroversi hak cipta terjadi karena data training AI mengambil karya seniman/penulis di internet."
    },
    {
      id: "KAI-032",
      kategori: "Etika, Batasan & Sikap Bijak",
      tingkat: "sulit",
      tipe: "pilihan_ganda",
      poin: 30,
      pertanyaan: "Tanda-tanda visual yang sering terlihat pada gambar buatan AI yang belum sempurna antara lain...",
      opsi: ["Jumlah jari tangan yang aneh (misal 6 jari), mata asimetris janggal, atau teks tulisan latar belakang tidak terbaca", "Gambar selalu berwarna hitam polos tanpa obyek apapun", "Gambar selalu berbentuk segitiga sama sisi", "Gambar hanya berdurasi 3 detik lalu hilang"],
      jawaban: 0,
      pembahasan: "Model visual AI sering mengalami artefak pada anatomi jari tangan, tekstur gigi, dan teks latar belakang."
    },

    // --- Kategori 6: Studi Kasus & Konteks Siswa SMP ---
    {
      id: "KAI-033",
      kategori: "Studi Kasus & Konteks Siswa",
      tingkat: "mudah",
      tipe: "pilihan_ganda",
      poin: 10,
      pertanyaan: "Siswa SMP di Wonosobo ingin membuat poster promosi wisata Telaga Warna. Cara bijak memakai AI adalah...",
      opsi: ["Meminta ide slogan dan konsep ilustrasi dari AI, lalu mendesainnya secara kreatif", "Mengambil karya orang lain dan menghapus watermarknya", "Membuat poster dengan foto palsu telaga yang tidak ada di Wonosobo", "Membiarkan AI membuat poster tanpa mengecek tulisan namanya"],
      jawaban: 0,
      pembahasan: "AI membantu menemukan slogan menarik dan inspirasi komposisi warna poster wisata lokal."
    },
    {
      id: "KAI-034",
      kategori: "Studi Kasus & Konteks Siswa",
      tingkat: "mudah",
      tipe: "pilihan_ganda",
      poin: 10,
      pertanyaan: "Di pasar Kertek Wonosobo ada penjual Carica khas Dieng. Jika pedagang ingin membuat lirik jingle lagu promosi unik, alat AI apa yang cocok?",
      opsi: ["Generative AI pembuat musik (seperti Suno AI)", "Aplikasi kalkulator timbangan", "Sensor parkir otomatis mobil", "Sistem absensi sidik jari"],
      jawaban: 0,
      pembahasan: "AI musik generatif seperti Suno dapat menghasilkan melodi dan lirik jingle promosi khas daerah."
    },
    {
      id: "KAI-035",
      kategori: "Studi Kasus & Konteks Siswa",
      tingkat: "sedang",
      tipe: "pilihan_ganda",
      poin: 20,
      pertanyaan: "Aji melihat video di internet yang menampilkan tokoh terkenal berpidato hal aneh dengan gerak bibir sedikit kaku. Sikap kritis Aji adalah...",
      opsi: ["Mencurigai video tersebut sebagai manipulasi Deepfake AI dan mengecek ke situs berita resmi", "Langsung membagikan ke grup kelas dengan judul heboh", "Mempercayai seutuhnya karena ada wajah tokoh tersebut", "Menyimpan video itu di flashdisk dan membolos sekolah"],
      jawaban: 0,
      pembahasan: "Gerak bibir tidak sinkron dan ekspresi kaku adalah ciri khas deepfake; wajib dicek di portal berita terpercaya."
    },
    {
      id: "KAI-036",
      kategori: "Studi Kasus & Konteks Siswa",
      tingkat: "sedang",
      tipe: "pilihan_ganda",
      poin: 20,
      pertanyaan: "Dalam pembelajaran informatika Fase D SMP, tujuan utama mempelajari AI Generatif adalah...",
      opsi: ["Memahami konsep, cara kerja, potensi, serta etika penggunaan teknologi secara cerdas", "Agar siswa tidak perlu belajar membaca buku selamanya", "Supaya siswa bisa meretas akun game teman", "Agar siswa bisa membuat robot perang di rumah"],
      jawaban: 0,
      pembahasan: "Kurikulum Fase D membekali siswa dengan pemahaman konsep, literasi digital kritis, dan etika teknologi."
    },
    {
      id: "KAI-037",
      kategori: "Studi Kasus & Konteks Siswa",
      tingkat: "mudah",
      tipe: "pilihan_ganda",
      poin: 10,
      pertanyaan: "Ketika kamu bertanya pada ChatGPT: 'Siapakah bupati Wonosobo saat ini?', apakah jawabannya selalu akurat?",
      opsi: ["Belum tentu, tergantung batas waktu data pelatihan AI dan potensi halusinasi", "Pasti 100% akurat karena AI adalah tuhan teknologi", "Pasti salah semua karena AI membenci kota Wonosobo", "Akurat hanya jika ditanyakan pada malam hari"],
      jawaban: 0,
      pembahasan: "Data pejabat daerah lokal terkini perlu dicek di web resmi Pemkab karena data training AI memiliki cut-off."
    },
    {
      id: "KAI-038",
      kategori: "Cara Kerja & Prompting",
      tingkat: "mudah",
      tipe: "pilihan_ganda",
      poin: 10,
      pertanyaan: "Apa yang terjadi jika kita memberikan prompt yang sangat samar seperti 'buatkan cerita bagus'?",
      opsi: ["AI akan menghasilkan cerita yang sangat umum dan belum tentu sesuai harapan kita", "Komputer sekolah akan meledak seketika", "AI akan menolak merespon selamanya", "Layar monitor akan berubah menjadi transparan"],
      jawaban: 0,
      pembahasan: "Prompt yang ambigu menghasilkan output acak/generik. Berikan konteks tokoh, alur, dan tema yang spesifik."
    },
    {
      id: "KAI-039",
      kategori: "AI Tradisional vs GenAI",
      tingkat: "sedang",
      tipe: "pilihan_ganda",
      poin: 20,
      pertanyaan: "Ketika aplikasi Google Maps menghitung rute tercepat menghindari macet dari Kertek menuju Alun-alun Wonosobo, sistem menggunakan...",
      opsi: ["Algoritma pencarian rute & analisis data lalu lintas (AI Tradisional/Optimasi)", "Generative AI pembuat video kartun", "Model bahasa pembuat cerpen", "Deepfake peniru suara burung"],
      jawaban: 0,
      pembahasan: "Navigasi rute tercepat adalah komputasi optimasi dan analisis data historis (AI tradisional)."
    },
    {
      id: "KAI-040",
      kategori: "Ragam Karya & Modalitas GenAI",
      tingkat: "mudah",
      tipe: "pilihan_ganda",
      poin: 10,
      pertanyaan: "AI yang mampu memproses beberapa jenis format sekaligus (misal menerima foto lalu menjawab dengan teks) disebut model...",
      opsi: ["Multimodal", "Monokrom", "Mikroprosesor", "Multiplex"],
      jawaban: 0,
      pembahasan: "Multimodal berarti model AI sanggup memahami dan menghubungkan lebih dari satu modalitas (teks, gambar, audio)."
    },
    {
      id: "KAI-041",
      kategori: "Etika, Batasan & Sikap Bijak",
      tingkat: "sedang",
      tipe: "pilihan_ganda",
      poin: 20,
      pertanyaan: "Di masa depan, keahlian manusia yang TIDAK DAPAT digantikan oleh Generative AI adalah...",
      opsi: ["Empati, nurani moral, pemikiran kritis mendalam, dan kepedulian tulus", "Kecepatan mengetik teks panjang di layar", "Kemampuan menyimpan ribuan file di flashdisk", "Kecepatan menghitung perkalian matematika"],
      jawaban: 0,
      pembahasan: "Empati kemanusiaan, moralitas, cinta kasih, dan kebijaksanaan adalah keunikan sejati manusia."
    },
    {
      id: "KAI-042",
      kategori: "Konsep Dasar AI & GenAI",
      tingkat: "mudah",
      tipe: "pilihan_ganda",
      poin: 10,
      pertanyaan: "Bahan bakar utama yang membuat sistem Generative AI menjadi pintar dan terampil adalah...",
      opsi: ["Data pelatihan yang berkualitas dan berukuran besar", "Bensin dan minyak pelumas mesin", "Kertas folio bergaris", "Tinta spidol papan tulis"],
      jawaban: 0,
      pembahasan: "Data masif adalah fondasi utama pembelajaran bagi algoritma kecerdasan artifisial."
    },
    {
      id: "KAI-043",
      kategori: "Cara Kerja & Prompting",
      tingkat: "sulit",
      tipe: "pilihan_ganda",
      poin: 30,
      pertanyaan: "Teknik memberikan contoh contoh jawaban di dalam instruksi prompt agar AI memahami gaya jawaban yang diinginkan disebut...",
      opsi: ["Few-shot Prompting", "Zero-step Running", "Hard-disk Partitioning", "Quick Formatting"],
      jawaban: 0,
      pembahasan: "Few-shot prompting adalah teknik memberikan satu atau beberapa sampel masukan-keluaran di dalam prompt."
    },
    {
      id: "KAI-044",
      kategori: "Etika, Batasan & Sikap Bijak",
      tingkat: "mudah",
      tipe: "pilihan_ganda",
      poin: 10,
      pertanyaan: "Slogan yang paling tepat untuk generasi muda dalam menghadapi era Generative AI adalah...",
      opsi: ["Gunakan AI sebagai asisten belajar, kendali tetap di tangan pikiranmu!", "Biarkan AI berpikir menggantikan seluruh otak kita", "Tolak semua teknologi dan jangan pernah menyentuh komputer", "Gunakan AI hanya untuk membuat tugas bohong"],
      jawaban: 0,
      pembahasan: "AI adalah copilot (asisten), pengemudi utamanya adalah akal budi dan kreativitas manusia sendiri."
    },
    {
      id: "KAI-045",
      kategori: "Studi Kasus & Konteks Siswa",
      tingkat: "sedang",
      tipe: "pilihan_ganda",
      poin: 20,
      pertanyaan: "Bagaimana cara siswa kelas 7 menggunakan Generative AI untuk belajar koding Scratch atau Python?",
      opsi: ["Meminta AI menjelaskan arti kode yang error dan memberi saran perbaikan baris per baris", "Menyuruh AI membuat game lalu mengaku membuatnya sendiri tanpa paham kodenya", "Menghapus aplikasi koding dari laptop sekolah", "Mengunggah foto guru tanpa izin"],
      jawaban: 0,
      pembahasan: "AI sangat efektif menerangkan pesan error koding dan menjelaskan logika algoritma secara interaktif."
    },
    {
      id: "KAI-046",
      kategori: "Ragam Karya & Modalitas GenAI",
      tingkat: "sedang",
      tipe: "pilihan_ganda",
      poin: 20,
      pertanyaan: "Teknologi video generatif seperti OpenAI Sora dapat membuat video pemandangan hanya dari...",
      opsi: ["Deskripsi kalimat prompt teks pengguna", "Sambungan antena TV analog", "Gulungan pita kaset video VHS lama", "Kertas karton yang dilipat-lipat"],
      jawaban: 0,
      pembahasan: "OpenAI Sora adalah model Text-to-Video yang memproduksi klip video realistis dari teks prompt."
    },
    {
      id: "KAI-047",
      kategori: "Konsep Dasar AI & GenAI",
      tingkat: "mudah",
      tipe: "pilihan_ganda",
      poin: 10,
      pertanyaan: "Jika kamu mengetik 'Tuliskan pantun jenaka anak SMP', AI menyusun kata-kata tersebut berdasarkan...",
      opsi: ["Prediksi probabilitas kata berikutnya yang paling sesuai dengan pola pantun", "Mengacak huruf tanpa aturan apapun", "Membaca pikiran pengguna melalui layar kaca", "Menghubungi penulis pantun lewat telepon"],
      jawaban: 0,
      pembahasan: "Model bahasa besar (LLM) bekerja memprediksi probabilitas kata berikutnya berdasarkan pola konteks."
    },
    {
      id: "KAI-048",
      kategori: "Etika, Batasan & Sikap Bijak",
      tingkat: "sulit",
      tipe: "pilihan_ganda",
      poin: 30,
      pertanyaan: "Mengapa penting bagi siswa untuk tetap giat melatih kemampuan menulis dan berpikir kritis di era AI?",
      opsi: ["Agar otak tetap terasah tajam, mandiri, dan mampu menilai kualitas maupun kebenaran output AI", "Hanya agar mendapat nilai bagus saat ulangan hafalan", "Karena komputer akan punah dalam waktu 2 tahun", "Supaya guru tidak marah di ruang guru"],
      jawaban: 0,
      pembahasan: "Berpikir kritis memungkinkan kita memimpin, memvalidasi, dan mengarahkan teknologi, bukan diarahkan oleh teknologi."
    }
  ]
};

/**
 * Pengelola Antrean Soal per Mode Game
 * Menggunakan Fisher-Yates shuffle dan tidak mengulang sebelum 1 putaran habis
 */
export class BankSoalManager {
  private modeQueues: Map<string, Soal[]> = new Map();

  constructor() {
    this.resetAll();
  }

  public resetMode(mode: string): void {
    const list = [...BANK_SOAL.soal];
    this.shuffle(list);
    this.modeQueues.set(mode, list);
  }

  public resetAll(): void {
    ['maze', 'tug_of_war', 'quiz_rush', 'general'].forEach(m => this.resetMode(m));
  }

  public getNextSoal(mode: string): Soal {
    let queue = this.modeQueues.get(mode);
    if (!queue || queue.length === 0) {
      this.resetMode(mode);
      queue = this.modeQueues.get(mode)!;
    }
    return queue.pop()!;
  }

  public getTotalSoal(): number {
    return BANK_SOAL.soal.length;
  }

  private shuffle<T>(array: T[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
}
