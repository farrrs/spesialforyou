
document.addEventListener("DOMContentLoaded", () => {
  const envelopeBtn = document.getElementById("envelopeBtn");
  const finalMessage = document.getElementById("finalMessage");

  const popSound = document.getElementById("popSound");
  const bgMusic = document.getElementById("bgMusic");
  const musicBtn = document.getElementById("musicBtn");

  const response = document.getElementById("response");
  const sendBtn = document.getElementById("sendBtn");
  const charCount = document.getElementById("charCount");

  const heartContainer = document.getElementById("backgroundHearts");
  const toast = document.getElementById("toast");

  let toastTimer;
  let surpriseOpened = false;

  // Notifikasi kecil
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 2800);
  }

  // Efek suara pop
  function playPopSound() {
    if (!popSound) return;

    popSound.currentTime = 0;

    popSound.play().catch(() => {
      // Website tetap berjalan jika audio gagal diputar.
    });
  }

  // Confetti
  function createConfetti() {
    const symbols = ["♡", "♥", "✦", "✿"];
    const colors = [
      "#e8a6b7",
      "#c77f9a",
      "#f4c8d6",
      "#f7d9a8"
    ];

    for (let i = 0; i < 45; i++) {
      const item = document.createElement("span");

      item.className = "confetti";
      item.textContent =
        symbols[Math.floor(Math.random() * symbols.length)];

      item.style.left = `${Math.random() * 100}%`;
      item.style.color =
        colors[Math.floor(Math.random() * colors.length)];

      item.style.fontSize = `${12 + Math.random() * 18}px`;
      item.style.animationDelay = `${Math.random() * 0.9}s`;

      document.body.appendChild(item);

      item.addEventListener("animationend", () => {
        item.remove();
      });
    }
  }

  // Membuka surat terakhir
  envelopeBtn.addEventListener("click", () => {
    if (surpriseOpened) {
      finalMessage.hidden = !finalMessage.hidden;

      envelopeBtn.setAttribute(
        "aria-expanded",
        String(!finalMessage.hidden)
      );

      if (finalMessage.hidden) {
        envelopeBtn.querySelector(".envelope-text").textContent =
          "Buka surat terakhir, sayang";
      } else {
        envelopeBtn.querySelector(".envelope-text").textContent =
          "Tutup surat terakhir";
        finalMessage.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
      }

      return;
    }

    surpriseOpened = true;
    finalMessage.hidden = false;

    envelopeBtn.classList.add("opened");
    envelopeBtn.setAttribute("aria-expanded", "true");

    envelopeBtn.querySelector(".envelope-icon").textContent = "💝";
    envelopeBtn.querySelector(".envelope-text").textContent =
      "Tutup surat terakhir";

    playPopSound();
    createConfetti();

    showToast("Satu pesan terakhir, dari hatiku untuk kamu ♡");

    setTimeout(() => {
      finalMessage.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }, 150);
  });

  // Musik latar: browser biasanya perlu interaksi pengguna
  musicBtn.addEventListener("click", async () => {
    if (bgMusic.paused) {
      try {
        await bgMusic.play();
        if (bgMusic.play) {
    // Set volume kecil (0.1 = 10%)
    bgMusic.volume = 0.1;
  }
      } catch (error) {
        showToast(
          "i love youu sayangggg 🤍"
        );
      }
    } else {
      bgMusic.pause();
    }
  });

  function updateMusicButton() {
    if (bgMusic.paused) {
      musicBtn.textContent = "▶ Putar";
      musicBtn.setAttribute("aria-pressed", "false");
    } else {
      musicBtn.textContent = "Ⅱ Jeda";
      musicBtn.setAttribute("aria-pressed", "true");
    }
  }

  bgMusic.addEventListener("play", updateMusicButton);
  bgMusic.addEventListener("pause", updateMusicButton);
  bgMusic.addEventListener("ended", updateMusicButton);

  // Penghitung karakter
  response.addEventListener("input", () => {
    charCount.textContent = `${response.value.length}/3000`;
  });

  // Mengirim pesan ke WhatsApp
  sendBtn.addEventListener("click", () => {
    const message = response.value.trim();

    if (!message) {
      showToast("Tulis pesan buat aku dulu ya, sayanggg 🤍");
      response.focus();
      return;
    }

    // Format nomor: kode negara tanpa tanda + atau spasi.
    // Ganti jika ingin memakai nomor WhatsApp lain.
    const phoneNumber = "6285330929161";

    const whatsappURL =
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    const whatsappWindow = window.open(
      whatsappURL,
      "_blank",
      "noopener,noreferrer"
    );

    if (!whatsappWindow) {
      showToast("Izinkan pop-up browser untuk membuka WhatsApp ya.");
    }
  });

  // Hati melayang
  function createHeart() {
    if (!heartContainer) return;

    const heart = document.createElement("span");

    heart.className = "floating-heart";
    heart.textContent = Math.random() > 0.5 ? "♡" : "♥";

    heart.style.left = `${Math.random() * 100}%`;
    heart.style.fontSize = `${12 + Math.random() * 18}px`;
    heart.style.animationDuration = `${7 + Math.random() * 7}s`;

    heartContainer.appendChild(heart);

    heart.addEventListener("animationend", () => {
      heart.remove();
    });
  }

  createHeart();
  setInterval(createHeart, 1000);

  updateMusicButton();
});
