
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("unlock-form");
  const passwordInput = document.getElementById("password");
  const cekButton = document.getElementById("cek");
  const nextButton = document.getElementById("nextBtn");
  const message = document.getElementById("message");
  const togglePassword = document.getElementById("toggle-password");
  const buttonText = document.getElementById("button-text");
  const heartsContainer = document.getElementById("floating-hearts");

  // Ubah kata kunci sesuai keinginanmu.
  const secretKey = "cimoyy";

  // Ganti dengan nama file halaman berikutnya yang benar.
  nextButton.href = "page2.html";

  let unlocked = false;

  function showMessage(text, type) {
    message.textContent = text;
    message.className = `message ${type}`;
  }

  function createHearts(amount = 18) {
    const emojis = ["💗", "💕", "💖", "💘", "✨"];

    for (let i = 0; i < amount; i++) {
      const heart = document.createElement("span");

      heart.className = "floating-heart";
      heart.textContent =
        emojis[Math.floor(Math.random() * emojis.length)];

      heart.style.left = `${Math.random() * 100}%`;
      heart.style.fontSize = `${14 + Math.random() * 17}px`;
      heart.style.animationDuration = `${4 + Math.random() * 4}s`;
      heart.style.animationDelay = `${Math.random() * 1.5}s`;

      heartsContainer.appendChild(heart);

      heart.addEventListener("animationend", () => {
        heart.remove();
      }, { once: true });
    }
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (unlocked) return;

    const answer = passwordInput.value.trim().toLowerCase();

    if (answer === secretKey.toLowerCase()) {
      unlocked = true;

      showMessage(
        "YEAYYY CIMOYY HEBATTT! 🥹💗",
        "success"
      );

      nextButton.classList.remove("hidden");
      passwordInput.disabled = true;
      cekButton.disabled = true;
      buttonText.textContent = "Berhasil dibuka! 💖";

      togglePassword.disabled = true;

      createHearts(35);
    } else {
      showMessage(
        "Eits, salahh! Coba lagi, masa lupa panggilan kesayangan?",
        "error"
      );

      passwordInput.classList.remove("shake");

      // Memicu ulang animasi getar.
      void passwordInput.offsetWidth;
      passwordInput.classList.add("shake");

      passwordInput.focus();
      passwordInput.select();
    }
  });

  togglePassword.addEventListener("click", () => {
    const isPassword = passwordInput.type === "password";

    passwordInput.type = isPassword ? "text" : "password";
    togglePassword.textContent = isPassword ? "🙈" : "👁️";

    togglePassword.setAttribute(
      "aria-label",
      isPassword ? "Sembunyikan kata kunci" : "Tampilkan kata kunci"
    );
  });

  // Hati melayang secara berkala.
  createHearts(8);
  window.setInterval(() => createHearts(3), 1800);
});
