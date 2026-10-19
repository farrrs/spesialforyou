
document.addEventListener("DOMContentLoaded", () => {
  // MUSIK LATAR
  const music = document.getElementById("bg-music");

  if (music) {
    music.volume = 0.4;

    const startMusic = () => {
      music.play().catch(() => {});
    };

    music.play().catch(() => {
      document.addEventListener("pointerdown", startMusic, { once: true });
      document.addEventListener("keydown", startMusic, { once: true });
    });
  }

  // CAROUSEL FOTO
  const track = document.querySelector(".carousel-track");
  const images = track
    ? Array.from(track.querySelectorAll("img"))
    : [];

  const dotsContainer = document.querySelector(".carousel-dots");

  let currentIndex = 0;
  let autoSlide = null;
  let startX = 0;

  function visibleCount() {
    return window.matchMedia("(max-width: 650px)").matches ? 1 : 3;
  }

  function updateCarousel() {
    if (!track || !images.length) return;

    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    const itemWidth = images[0].getBoundingClientRect().width + gap;
    const count = visibleCount();
    const maxStart = Math.max(0, images.length - count);

    const startIndex = Math.min(
      Math.max(0, currentIndex - Math.floor(count / 2)),
      maxStart
    );

    track.style.transform =
      `translateX(${-startIndex * itemWidth}px)`;

    images.forEach((img, index) => {
      img.classList.toggle("active", index === currentIndex);
    });

    if (dotsContainer) {
      dotsContainer.querySelectorAll(".dot").forEach((dot, index) => {
        dot.classList.toggle("active", index === currentIndex);
      });
    }
  }

  function goToSlide(index) {
    if (!images.length) return;

    currentIndex = (index + images.length) % images.length;

    updateCarousel();
    resetAutoSlide();
  }

  function moveSlide(step) {
    goToSlide(currentIndex + step);
  }

  function startAutoSlide() {
    if (images.length > 1) {
      autoSlide = setInterval(() => moveSlide(1), 4000);
    }
  }

  function resetAutoSlide() {
    clearInterval(autoSlide);
    startAutoSlide();
  }

  if (track && images.length) {
    images.forEach((image, index) => {
      const dot = document.createElement("button");

      dot.type = "button";
      dot.className = "dot";
      dot.setAttribute("aria-label", `Lihat foto ${index + 1}`);

      dot.addEventListener("click", () => goToSlide(index));

      dotsContainer?.appendChild(dot);
    });

    track.addEventListener("touchstart", event => {
      startX = event.touches[0].clientX;
    }, { passive: true });

    track.addEventListener("touchend", event => {
      const delta = startX - event.changedTouches[0].clientX;

      if (Math.abs(delta) > 45) {
        moveSlide(delta > 0 ? 1 : -1);
      }
    }, { passive: true });

    track.addEventListener("pointerdown", event => {
      startX = event.clientX;
    });

    track.addEventListener("pointerup", event => {
      if (event.pointerType === "mouse") {
        const delta = startX - event.clientX;

        if (Math.abs(delta) > 45) {
          moveSlide(delta > 0 ? 1 : -1);
        }
      }
    });

    window.addEventListener("resize", updateCarousel);

    updateCarousel();
    startAutoSlide();
  }

  // POPUP VIDEO
  window.showVideo = function() {
    const popup = document.getElementById("video-popup");
    const video = document.getElementById("surprise-video");

    if (!popup) return;

    popup.classList.add("show");
    popup.setAttribute("aria-hidden", "false");

    if (video) {
      video.play().catch(() => {});
    }
  };

  window.closeVideo = function() {
    const popup = document.getElementById("video-popup");
    const video = document.getElementById("surprise-video");

    popup?.classList.remove("show");
    popup?.setAttribute("aria-hidden", "true");

    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  // CONFETTI ULANG TAHUN
  const birthdayPopup = document.getElementById("birthday-popup");
  const canvas = document.getElementById("confetti-canvas");
  const ctx = canvas?.getContext("2d");

  let pieces = [];
  let frameId = null;

  function resizeCanvas() {
    if (!canvas) return;

    const ratio = window.devicePixelRatio || 1;

    canvas.width = Math.floor(window.innerWidth * ratio);
    canvas.height = Math.floor(window.innerHeight * ratio);

    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    ctx?.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  function createPiece() {
    const colors = [
      "#f47da7",
      "#d6b8ff",
      "#ffd5e4",
      "#f5c96a",
      "#b5e7d0"
    ];

    return {
      x: Math.random() * window.innerWidth,
      y: -Math.random() * window.innerHeight,
      size: 4 + Math.random() * 5,
      speed: 2 + Math.random() * 3,
      drift: (Math.random() - 0.5) * 2,
      rotation: Math.random() * 6.28,
      color: colors[Math.floor(Math.random() * colors.length)]
    };
  }

  function renderConfetti() {
    if (!ctx || !canvas) return;

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    pieces.forEach(piece => {
      piece.y += piece.speed;
      piece.x += piece.drift;
      piece.rotation += 0.04;

      ctx.save();
      ctx.translate(piece.x, piece.y);
      ctx.rotate(piece.rotation);
      ctx.fillStyle = piece.color;

      ctx.fillRect(
        -piece.size / 2,
        -piece.size / 2,
        piece.size,
        piece.size * 1.5
      );

      ctx.restore();

      if (piece.y > window.innerHeight + 20) {
        piece.y = -15;
        piece.x = Math.random() * window.innerWidth;
      }
    });

    frameId = requestAnimationFrame(renderConfetti);
  }

  window.startConfetti = function() {
    if (!ctx || frameId) return;

    pieces = Array.from({ length: 120 }, createPiece);
    renderConfetti();
  };

  window.stopConfetti = function() {
    if (frameId) {
      cancelAnimationFrame(frameId);
    }

    frameId = null;
    pieces = [];

    if (ctx && canvas) {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }
  };

  window.showBirthdayMsg = function() {
    birthdayPopup?.classList.add("show");
    birthdayPopup?.setAttribute("aria-hidden", "false");

    window.startConfetti();
  };

  window.closePopup = function() {
    birthdayPopup?.classList.remove("show");
    birthdayPopup?.setAttribute("aria-hidden", "true");

    window.stopConfetti();
  };

  // TUTUP POPUP DENGAN KLIK AREA LUAR
  [
    birthdayPopup,
    document.getElementById("video-popup")
  ].forEach(popup => {
    popup?.addEventListener("click", event => {
      if (event.target === popup) {
        if (popup.id === "video-popup") {
          window.closeVideo();
        } else {
          window.closePopup();
        }
      }
    });
  });

  // TUTUP POPUP DENGAN TOMBOL ESC
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      window.closeVideo();
      window.closePopup();
    }
  });

  // PINDAH KE PAGE 3
  window.goToPage3 = function() {
    window.location.href = "scrapbok.html";
  };
});

window.showVideo = function () {
  const popup = document.getElementById("video-popup");
  const video = document.getElementById("surprise-video");

  if (!popup || !video) return;

  popup.classList.add("show");
  popup.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  // Coba memutar video; jika browser menolak autoplay,
  // pengunjung tetap bisa menekan tombol play pada video.
  const playPromise = video.play();

  if (playPromise && typeof playPromise.catch === "function") {
    playPromise.catch(() => {});
  }
};

window.closeVideo = function () {
  const popup = document.getElementById("video-popup");
  const video = document.getElementById("surprise-video");

  if (!popup) return;

  popup.classList.remove("show");
  popup.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";

  if (video) {
    video.pause();
    video.currentTime = 0;
  }
};

// Tutup popup dengan tombol Escape
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    window.closeVideo();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const music = document.getElementById("bg-music");
  const popup = document.getElementById("video-popup");
  const video = document.getElementById("surprise-video");

  let musicWasPlaying = false;

  // Musik latar
  if (music) {
    music.volume = 0.1;

    music.play().catch(() => {
      // Jika autoplay diblokir browser,
      // musik akan dicoba diputar setelah interaksi pengguna.
      const startMusic = () => {
        music.play().catch(() => {});
      };

      document.addEventListener("pointerdown", startMusic, {
        once: true
      });
    });
  }

  // Buka video surprise
  window.showVideo = function () {
    if (!popup || !video) return;

    // Simpan status musik sebelum video dibuka
    musicWasPlaying = music ? !music.paused : false;

    // Hentikan musik latar
    if (music) {
      music.pause();
    }

    popup.style.display = "flex";
    document.body.style.overflow = "hidden";

    video.currentTime = 0;
    video.play().catch(() => {});
  };

  // Tutup video surprise
  window.closeVideo = function () {
    if (!popup || !video) return;

    popup.style.display = "none";
    document.body.style.overflow = "";

    // Hentikan dan reset video
    video.pause();
    video.currentTime = 0;

    // Putar kembali musik jika sebelumnya sedang menyala
    if (music && musicWasPlaying) {
      music.play().catch(() => {});
    }

    musicWasPlaying = false;
  };

  // Tutup popup jika area luar video diklik
  if (popup) {
    popup.addEventListener("click", (event) => {
      if (event.target === popup) {
        window.closeVideo();
      }
    });
  }

  // Tutup popup dengan tombol Escape
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && popup?.style.display !== "none") {
      window.closeVideo();
    }
  });
});
