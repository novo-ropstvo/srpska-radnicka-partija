// LIGHTBOX – SRP galerija (PRO verzija sa next/prev, swipe i zoom)

document.addEventListener("DOMContentLoaded", () => {
  const items = Array.from(document.querySelectorAll(".gallery-item"));
  const lightbox = document.querySelector(".lightbox");

  if (!items.length || !lightbox) return;

  const imgEl = lightbox.querySelector("img");
  const captionEl = lightbox.querySelector(".lightbox-caption");
  const prevBtn = lightbox.querySelector(".lightbox-prev");
  const nextBtn = lightbox.querySelector(".lightbox-next");
  const closeBtn = lightbox.querySelector(".lightbox-close");
  const backdrop = lightbox.querySelector(".lightbox-backdrop");

  let currentIndex = 0;
  let isZoomed = false;

  let touchStartX = 0;
  let touchEndX = 0;

  // UČITAVANJE SLIKE
  function loadImage(index) {
    const item = items[index];
    const full = item.getAttribute("data-full");
    const caption = item.querySelector(".gallery-caption")?.textContent ?? "";

    imgEl.src = full;
    imgEl.alt = caption;
    captionEl.textContent = caption;

    imgEl.classList.remove("lb-fade");
    void imgEl.offsetWidth;
    imgEl.classList.add("lb-fade");
  }

  // OTVARANJE
  function openLightbox(index) {
    currentIndex = index;
    loadImage(index);
    lightbox.classList.add("open");
  }

  // ZATVARANJE
  function closeLightbox() {
    lightbox.classList.remove("open");
    imgEl.src = "";
    isZoomed = false;
    imgEl.classList.remove("zoom");
  }

  // NEXT / PREV
  function next() {
    currentIndex = (currentIndex + 1) % items.length;
    loadImage(currentIndex);
  }

  function prev() {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    loadImage(currentIndex);
  }

  // CLICK ON GRID
  items.forEach((item, index) => {
    item.addEventListener("click", () => openLightbox(index));
  });

  // EVENT LISTENERS
  nextBtn.addEventListener("click", next);
  prevBtn.addEventListener("click", prev);
  closeBtn.addEventListener("click", closeLightbox);
  backdrop.addEventListener("click", closeLightbox);

  // KEYBOARD
  document.addEventListener("keydown", e => {
    if (!lightbox.classList.contains("open")) return;

    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  });

  // SWIPE – mobile
  imgEl.addEventListener("touchstart", e => {
    touchStartX = e.touches[0].clientX;
  });

  imgEl.addEventListener("touchend", e => {
    touchEndX = e.changedTouches[0].clientX;
    const delta = touchEndX - touchStartX;

    if (Math.abs(delta) > 50) {
      if (delta > 0) prev();
      else next();
    }
  });

  // ZOOM – click
  imgEl.addEventListener("click", () => {
    isZoomed = !isZoomed;
    imgEl.classList.toggle("zoom", isZoomed);
  });
});
