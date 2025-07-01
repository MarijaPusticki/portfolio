const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
const galleryImages = document.querySelectorAll('.gallery-item img');
const lightboxDesc = document.getElementById('lightbox-desc');

let currentIndex = 0;

// Prikaži sliku u lightboxu
function showImage(index) {
  lightbox.style.display = 'flex';
  const selectedImg = galleryImages[index];
  lightboxImg.src = selectedImg.src;
  lightboxDesc.textContent = selectedImg.getAttribute('data-description') || '';
  currentIndex = index;
}

// Klik na sliku u galeriji
galleryImages.forEach((img, index) => {
  img.addEventListener('click', () => showImage(index));
});

// Zatvori lightbox gumbom
closeBtn.addEventListener('click', () => {
  closeLightbox();
});

// Strelice (next, prev)
nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % galleryImages.length;
  showImage(currentIndex);
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  showImage(currentIndex);
});

// Zatvaranje klikom izvan slike ili na opis
function closeLightbox() {
  lightbox.style.display = 'none';
}

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox || e.target === lightboxDesc) {
    closeLightbox();
  }
});

// Navigacija tastaturom
document.addEventListener("keydown", function (e) {
  if (lightbox.style.display === "flex") {
    if (e.key === "ArrowLeft") {
      currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
      showImage(currentIndex);
    } else if (e.key === "ArrowRight") {
      currentIndex = (currentIndex + 1) % galleryImages.length;
      showImage(currentIndex);
    } else if (e.key === "Escape") {
      closeLightbox();
    }
  }
});

// Swipe podrška za mobilne
let startX = 0;

lightbox.addEventListener("touchstart", function(e) {
  startX = e.touches[0].clientX;
});

lightbox.addEventListener("touchend", function(e) {
  let endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    showImage(currentIndex);
  } else if (endX - startX > 50) {
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    showImage(currentIndex);
  }
});

// Zatvori lightbox kad klikneš na bilo koji link
document.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    closeLightbox();
  });
});
