// ==========================================================
// Rizky Hidayat — Portfolio scripts
// ==========================================================

// ---------- Language toggle (ID / EN) ----------
const html = document.documentElement;
const langToggle = document.getElementById("langToggle");
const langOpts = langToggle.querySelectorAll(".lang-opt");

function setLang(lang) {
  html.setAttribute("data-lang", lang);
  html.setAttribute("lang", lang);
  langOpts.forEach((o) => o.classList.toggle("active", o.dataset.value === lang));
  try {
    localStorage.setItem("site-lang", lang);
  } catch (e) {
    /* storage unavailable — ignore */
  }
}

// restore saved language (default: id)
let saved = "id";
try {
  saved = localStorage.getItem("site-lang") || "id";
} catch (e) {}
setLang(saved);

langToggle.addEventListener("click", () => {
  setLang(html.getAttribute("data-lang") === "id" ? "en" : "id");
});

// ---------- Sticky navbar & scroll-top button ----------
const nav = document.getElementById("navbar");
const scrollTop = document.getElementById("scrollTop");

window.addEventListener("scroll", () => {
  const y = window.scrollY;
  nav.classList.toggle("sticky", y > 20);
  scrollTop.classList.toggle("show", y > 400);
});

// ---------- Mobile menu ----------
const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");

menuBtn.addEventListener("click", () => {
  const open = menu.classList.toggle("active");
  menuBtn.classList.toggle("open", open);
  document.body.style.overflow = open ? "hidden" : "";
});

menu.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    menu.classList.remove("active");
    menuBtn.classList.remove("open");
    document.body.style.overflow = "";
  })
);

// ---------- Terminal typing animation ----------
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const termBody = document.getElementById("terminalBody");

if (termBody) {
  const rows = Array.from(termBody.children);

  if (reduceMotion) {
    // show everything immediately, fully typed
    rows.forEach((r) => r.classList.remove("t-hidden"));
    termBody.querySelectorAll(".t-cmd").forEach((c) => (c.textContent = c.dataset.type));
  } else {
    const typeCmd = (el) =>
      new Promise((resolve) => {
        const text = el.dataset.type;
        let i = 0;
        const tick = () => {
          el.textContent = text.slice(0, ++i);
          if (i < text.length) setTimeout(tick, 40 + Math.random() * 45);
          else setTimeout(resolve, 260);
        };
        tick();
      });

    (async () => {
      for (const row of rows) {
        row.classList.remove("t-hidden");
        const cmd = row.querySelector(".t-cmd");
        if (cmd) await typeCmd(cmd);
        else await new Promise((r) => setTimeout(r, 320));
      }
    })();
  }
}

// ---------- Lightbox (portfolio page) ----------
const lightbox = document.getElementById("lightbox");
if (lightbox) {
  const lbImg = document.getElementById("lbImg");
  const lbCaption = document.getElementById("lbCaption");
  const lbClose = document.getElementById("lbClose");

  document.querySelectorAll(".g-item").forEach((fig) => {
    fig.addEventListener("click", () => {
      const img = fig.querySelector("img");
      const cap = fig.querySelector("figcaption");
      lbImg.src = img.src;
      lbImg.alt = img.alt;
      // pick the caption text for the active language
      const lang = document.documentElement.getAttribute("data-lang");
      const span = cap ? cap.querySelector(`[lang="${lang}"]`) : null;
      lbCaption.textContent = span ? span.textContent : img.alt;
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    });
  });

  const closeLb = () => {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };
  lbClose.addEventListener("click", closeLb);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLb();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLb();
  });
}

// ---------- Experience pagination (3 per page) ----------
const pagWrap = document.getElementById("expPagination");
if (pagWrap) {
  const jobs = Array.from(document.querySelectorAll(".timeline .job"));
  const perPage = 3;
  const totalPages = Math.ceil(jobs.length / perPage);
  const pgPages = document.getElementById("pgPages");
  const pgPrev = document.getElementById("pgPrev");
  const pgNext = document.getElementById("pgNext");
  let current = 1;

  // build page number buttons
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.className = "pg-num";
    btn.textContent = i;
    btn.setAttribute("aria-label", "Page " + i);
    btn.addEventListener("click", () => goTo(i, true));
    pgPages.appendChild(btn);
  }
  const numBtns = pgPages.querySelectorAll(".pg-num");

  function goTo(page, scroll) {
    current = Math.min(Math.max(page, 1), totalPages);
    jobs.forEach((job, idx) => {
      const onPage = Math.floor(idx / perPage) + 1 === current;
      job.classList.toggle("pg-hidden", !onPage);
    });
    numBtns.forEach((b, i) => b.classList.toggle("active", i + 1 === current));
    pgPrev.disabled = current === 1;
    pgNext.disabled = current === totalPages;
    if (scroll) {
      document.getElementById("experience").scrollIntoView({ behavior: "smooth" });
    }
  }

  pgPrev.addEventListener("click", () => goTo(current - 1, true));
  pgNext.addEventListener("click", () => goTo(current + 1, true));

  if (totalPages <= 1) pagWrap.style.display = "none";
  goTo(1, false);
}

// ---------- Currently Learning progress bars ----------
const learnItems = document.querySelectorAll(".learn-item");
if (learnItems.length) {
  const animate = (item) => {
    const target = parseInt(item.dataset.progress, 10) || 0;
    const fill = item.querySelector(".learn-fill");
    const pct = item.querySelector(".learn-pct");
    fill.style.width = target + "%";
    if (reduceMotion) {
      pct.textContent = target + "%";
      return;
    }
    const start = performance.now();
    const dur = 1600;
    const tick = (now) => {
      const t = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      pct.textContent = Math.round(target * eased) + "%";
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  if ("IntersectionObserver" in window && !reduceMotion) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            animate(e.target);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    learnItems.forEach((i) => io.observe(i));
  } else {
    learnItems.forEach(animate);
  }
}
