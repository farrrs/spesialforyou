
/* ========================================
   OUR LITTLE SCRAPBOOK
   Vintage × Dreamy Pink
======================================== */

/*
  DATA HALAMAN SCRAPBOOK

  Tambahkan atau ganti isi pesan di bagian ini.
  Saat ini tersedia 5 contoh halaman.
*/

const pages = [
  {
    title: "My Favorite Person ♡",
    text: "you will always be my favorite person, no matter how many people i meet in this world. i'm so lucky to have you.",
  },
  {
    title: "The Day You Were Born 🎂",
    text: "terima kasih sudah lahir ke dunia ini, sayang. kehadiran kamu mungkin sederhana buat dunia, tapi berarti banget buat aku.",
    sticker: "img/2.gif"
  },
  {
    title: "My Little Happiness 🌷",
    text: "sometimes, all i need is a little conversation with you to make my whole day better. you have no idea how much you mean to me.",
    sticker: "img/3.gif"
  },
  {
    title: "A Wish for You ✨",
    text: "semoga dunia selalu baik sama kamu, semoga langkah kamu dimudahkan, dan semoga semua doa yang kamu simpan bisa jadi kenyataan.",
    sticker: "img/4.gif"
  },
  {
    title: "Lucky to Have You 🫶🏻",
    text: "dari sekian banyak orang yang bisa aku temui, aku bersyukur banget karena akhirnya aku bisa kenal kamu dan punya cerita sama kamu.",
    sticker: "img/5.gif"
  },
  {
    title: "Sweet Eighteen 🎀",
    text: "happy 18th birthday, my girl! semoga umur baru ini membawa lebih banyak kebahagiaan, pengalaman indah, dan alasan buat kamu tersenyum.",
    sticker: "img/1.gif"
  },
  {
    title: "My Kind of Home 🏡",
    text: "home isn't always a place. sometimes, it's a person who makes you feel safe, understood, and loved. and for me, that person is you.",
    sticker: "img/2.gif"
  },
  {
    title: "Little Things About You 💗",
    text: "aku suka cara kamu ketawa, cara kamu cerita, cara kamu ngambek, bahkan hal-hal kecil yang mungkin nggak kamu sadari. semuanya punya tempat tersendiri di hati aku.",
    sticker: "img/3.gif"
  },
  {
    title: "My Favorite Smile 😊",
    text: "i hope you never forget how beautiful your smile is. semoga kamu selalu punya alasan buat tersenyum, bahkan di hari-hari yang berat.",
    sticker: "img/4.gif"
  },
  {
    title: "Be Proud of Yourself 🤍",
    text: "jangan lupa bangga sama diri kamu sendiri, yaa. kamu udah berusaha sejauh ini, dan aku harap kamu tahu kalau kamu lebih hebat dari yang kamu kira.",
    sticker: "img/5.gif"
  },
  {
    title: "Through My Eyes 💌",
    text: "if only you could see yourself through my eyes, you'd understand why i think you're so special and why i'm so grateful to have you.",
    sticker: "img/1.gif"
  },
  {
    title: "Our Little Story 📸",
    text: "aku nggak tahu bakal ada berapa banyak cerita yang kita punya nanti, tapi aku harap kita masih bisa bikin banyak kenangan indah buat dikenang bareng.",
    sticker: "img/2.gif"
  },
  {
    title: "Growing Together 🌱",
    text: "semoga kita bisa terus tumbuh bersama, belajar dari kesalahan, saling memahami, dan jadi dua orang yang lebih baik tanpa harus kehilangan diri sendiri.",
    sticker: "img/3.gif"
  },
  {
    title: "The Love You Deserve 🩷",
    text: "you deserve a love that makes you feel safe, appreciated, and understood. aku harap aku bisa terus belajar buat memberikan itu ke kamu.",
    sticker: "img/4.gif"
  },
  {
    title: "A Thousand Little Memories 🎞️",
    text: "if i could keep every happy moment with you in a little box, i'd probably need a thousand boxes by now. and i'd still want more.",
    sticker: "img/5.gif"
  },
  {
    title: "My Birthday Prayer 🌙",
    text: "di umur kamu yang ke-18 ini, aku berdoa semoga kamu selalu sehat, bahagia, dikelilingi orang-orang tulus, dan dimudahkan dalam meraih semua impian kamu.",
    sticker: "img/1.gif"
  },
  {
    title: "You Are Enough 🌸",
    text: "kamu nggak harus selalu sempurna buat jadi seseorang yang berharga. jadi diri kamu sendiri aja, karena kamu yang sekarang pun udah punya banyak hal yang indah.",
    sticker: "img/2.gif"
  },
  {
    title: "If You Miss Me 🫂",
    text: "whenever you miss me, just remember that somewhere, someone is smiling at the thought of you. and yes, that someone is me.",
    sticker: "img/3.gif"
  },
  {
    title: "I'm Glad I Met You ❤️",
    text: "aku nggak tahu gimana cerita hidup aku kalau kita nggak pernah ketemu, tapi aku bersyukur banget karena ternyata aku punya kesempatan buat mengenal dan menyayangi kamu.",
    sticker: "img/4.gif"
  },
  {
    title: "Until the Last Page ♡",
    text: "this scrapbook has its last page, but my wishes for your happiness will never end. happy birthday, my love. here's to more memories, more laughter, and more beautiful days with you.",
    sticker: "img/5.gif"
  },
  
];


/* ========================================
   ELEMENTS
======================================== */

const pageContent = document.getElementById("pageContent");
const currentPageDisplay = document.getElementById("currentPage");
const totalPagesDisplay = document.getElementById("totalPages");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const pageDots = document.getElementById("pageDots");
const progressBar = document.getElementById("progressBar");

const musicBtn = document.getElementById("musicBtn");
const backgroundMusic = document.getElementById("backgroundMusic");

const backgroundHearts = document.getElementById("backgroundHearts");
const toast = document.getElementById("toast");


/* ========================================
   STATE
======================================== */

let currentIndex = 0;
let toastTimeout;


/* ========================================
   INITIALIZATION
======================================== */

function initScrapbook() {
  if (!pageContent || !prevBtn || !nextBtn) {
    console.error("Elemen scrapbook tidak ditemukan.");
    return;
  }

  totalPagesDisplay.textContent = pages.length;

  createPageDots();
  renderPage(0);
  updateNavigation();
  startFloatingHearts();
}


/* ========================================
   CREATE PAGE DOTS
======================================== */

function createPageDots() {
  if (!pageDots) return;

  pageDots.innerHTML = "";

  pages.forEach((page, index) => {
    const dot = document.createElement("button");

    dot.type = "button";
    dot.className = "page-dot";
    dot.setAttribute("aria-label", `Buka halaman ${index + 1}`);
    dot.title = `Halaman ${index + 1}`;

    dot.addEventListener("click", () => {
      renderPage(index);
    });

    pageDots.appendChild(dot);
  });
}


/* ========================================
   RENDER PAGE
======================================== */

function renderPage(index) {
  if (index < 0 || index >= pages.length) return;

  currentIndex = index;

  const page = pages[currentIndex];

  pageContent.classList.remove("changing");

  // Restart animasi halaman
  void pageContent.offsetWidth;

  pageContent.classList.add("changing");

  // Membuat elemen dengan aman
  pageContent.innerHTML = "";

  const title = document.createElement("h2");
  title.className = "page-title";
  title.textContent = page.title;

  const text = document.createElement("p");
  text.className = "page-text";
  text.textContent = page.text;

  pageContent.appendChild(title);
  pageContent.appendChild(text);

  // Tambahkan stiker jika tersedia
  if (page.sticker) {
    const sticker = document.createElement("img");

    sticker.className = "page-sticker";
    sticker.src = page.sticker;
    sticker.alt = "Scrapbook sticker";
    sticker.loading = "lazy";

    sticker.onerror = () => {
      sticker.remove();
    };

    pageContent.appendChild(sticker);
  }

  updateNavigation();

  // Kembali ke bagian atas halaman
  pageContent.scrollTop = 0;
}


/* ========================================
   UPDATE NAVIGATION
======================================== */

function updateNavigation() {
  if (currentPageDisplay) {
    currentPageDisplay.textContent = currentIndex + 1;
  }

  if (totalPagesDisplay) {
    totalPagesDisplay.textContent = pages.length;
  }

  if (prevBtn) {
    prevBtn.disabled = currentIndex === 0;
  }

  if (nextBtn) {
    nextBtn.disabled = currentIndex === pages.length - 1;

    nextBtn.textContent =
      currentIndex === pages.length - 1
        ? "The End ♡"
        : "Next →";
  }

  // Update progress bar
  if (progressBar) {
    const progress =
      pages.length > 0
        ? ((currentIndex + 1) / pages.length) * 100
        : 0;

    progressBar.style.width = `${progress}%`;
  }

  // Update titik halaman
  if (pageDots) {
    const dots = pageDots.querySelectorAll(".page-dot");

    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);

      if (index === currentIndex) {
        dot.setAttribute("aria-current", "page");
      } else {
        dot.removeAttribute("aria-current");
      }
    });
  }
}


/* ========================================
   PREVIOUS & NEXT BUTTONS
======================================== */

if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      renderPage(currentIndex - 1);
    }
  });
}

if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    if (currentIndex < pages.length - 1) {
      renderPage(currentIndex + 1);
    } else {
      showToast("Thank you for reading our little story ♡");
    }
  });
}


/* ========================================
   KEYBOARD NAVIGATION
======================================== */

document.addEventListener("keydown", (event) => {
  // Jangan mengganggu input atau textarea
  if (
    event.target instanceof HTMLInputElement ||
    event.target instanceof HTMLTextAreaElement
  ) {
    return;
  }

  if (event.key === "ArrowRight") {
    if (currentIndex < pages.length - 1) {
      renderPage(currentIndex + 1);
    }
  }

  if (event.key === "ArrowLeft") {
    if (currentIndex > 0) {
      renderPage(currentIndex - 1);
    }
  }
});


/* ========================================
   BACKGROUND MUSIC
======================================== */

if (musicBtn && backgroundMusic) {
  musicBtn.addEventListener("click", async () => {
    if (backgroundMusic.paused) {
      try {
        await backgroundMusic.play();
        if (backgroundMusic.play) {
    // Set volume kecil (0.1 = 10%)
    backgroundMusic.volume = 0.4;
  }

        musicBtn.textContent = "♫ Pause our song";
        showToast("Playing our song ♡");
      } catch (error) {
        console.error("Musik tidak dapat diputar:", error);

        showToast("Periksa lokasi file musik di folder img ♡");
      }
    } else {
      backgroundMusic.pause();
      musicBtn.textContent = "♫ Play our song";
    }
  });

  backgroundMusic.addEventListener("ended", () => {
    musicBtn.textContent = "♫ Play our song";
  });
}


/* ========================================
   FLOATING HEARTS
======================================== */

function startFloatingHearts() {
  if (!backgroundHearts) return;

  const heartSymbols = ["♡", "♥", "ღ", "୨୧"];

  function createHeart() {
    const heart = document.createElement("span");

    heart.className = "floating-heart";

    heart.textContent =
      heartSymbols[
        Math.floor(Math.random() * heartSymbols.length)
      ];

    heart.style.left = `${Math.random() * 100}%`;
    heart.style.fontSize = `${12 + Math.random() * 16}px`;

    const duration = 7 + Math.random() * 7;

    heart.style.animationDuration = `${duration}s`;

    backgroundHearts.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, duration * 1000);
  }

  // Hati pertama
  for (let i = 0; i < 8; i++) {
    setTimeout(createHeart, i * 400);
  }

  // Hati berikutnya
  setInterval(createHeart, 1200);
}


/* ========================================
   TOAST NOTIFICATION
======================================== */

function showToast(message) {
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimeout);

  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}


/* ========================================
   START
======================================== */

initScrapbook();
