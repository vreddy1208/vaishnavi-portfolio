document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const toggleBtn = document.getElementById("themeToggle");
  const sections = document.querySelectorAll(".section");
  const navLinks = document.querySelectorAll("nav a");
  const footer = document.querySelector(".footer");
  const form = document.getElementById("queryForm");
  const messageBox = document.getElementById("formMessage");
  const hero = document.querySelector(".hero");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  if (toggleBtn) {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      body.classList.add("dark");
      toggleBtn.textContent = "☀️";
    }

    toggleBtn.addEventListener("click", () => {
      body.classList.toggle("dark");
      const isDark = body.classList.contains("dark");
      toggleBtn.textContent = isDark ? "☀️" : "🌙";
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
  }
  if (sections.length) {
    const sectionObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.15 }
    );

    sections.forEach(section => sectionObserver.observe(section));
  }
  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
      const offset = section.offsetTop - 160;
      if (window.scrollY >= offset) {
        current = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${current}`
      );
    });
  });
  if (hero) {
    window.addEventListener("scroll", () => {
      hero.style.backgroundPosition = `center ${window.scrollY * 0.25}px`;
    });
  }
  if (form && messageBox) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      messageBox.textContent = "Your query has been submitted successfully!";
      messageBox.style.color = "green";
      form.reset();
    });
  }
  if (footer) {
    const footerObserver = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          footer.classList.add("show");
        }
      },
      { threshold: 0.3 }
    );

    footerObserver.observe(footer);
  }
  document.querySelectorAll(".hobby-card img, .gallery-item img").forEach(img => {
    img.addEventListener("click", () => {
      if (!lightbox || !lightboxImg) return;
      lightboxImg.src = img.src;
      lightbox.style.display = "flex";
    });
  });

  if (lightbox) {
    lightbox.addEventListener("click", () => {
      lightbox.style.display = "none";
    });
  }
});
