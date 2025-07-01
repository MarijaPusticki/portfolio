const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
const galleryImages = document.querySelectorAll('.gallery-item img');
const lightboxDesc = document.getElementById('lightbox-desc');

let currentIndex = 0;

function showImage(index) {
  lightbox.style.display = 'flex';
  const selectedImg = galleryImages[index];
  lightboxImg.src = selectedImg.src;
  lightboxDesc.textContent = selectedImg.getAttribute('data-description') || '';
  currentIndex = index;
}

galleryImages.forEach((img, index) => {
  img.addEventListener('click', () => showImage(index));
});

closeBtn.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % galleryImages.length;
  showImage(currentIndex);
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  showImage(currentIndex);
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = 'none';
  }
  document.addEventListener("keydown", function (e) {
  if (document.getElementById("lightbox").style.display === "flex") {
    if (e.key === "ArrowLeft") {
      showPrev();
    } else if (e.key === "ArrowRight") {
      showNext();
    } else if (e.key === "Escape") {
      closeLightbox();
    }
  }
});
  let startX = 0;

document.getElementById("lightbox").addEventListener("touchstart", function(e) {
  startX = e.touches[0].clientX;
});

document.getElementById("lightbox").addEventListener("touchend", function(e) {
  let endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) {
    showNext(); // swipe left
  } else if (endX - startX > 50) {
    showPrev(); // swipe right
  }
});

  function closeLightbox() {
  lightbox.style.display = 'none';
}

// Zatvaranje klikom na pozadinu (ali ne na sliku ili opis)
lightbox.addEventListener("click", function(e) {
  if (e.target === lightbox || e.target === lightboxDesc) {
    closeLightbox();
  }
});

// Zatvori lightbox kad klikneš na bilo koji link
document.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    closeLightbox();
  });
});
function closeLightbox() {
  lightbox.style.display = 'none';
}

// Klik izvan slike zatvara lightbox
lightbox.addEventListener("click", function(e) {
  if (e.target === lightbox || e.target === lightboxDesc) {
    closeLightbox();
  }
});

// Zatvaranje lightboxa kad korisnik klikne na neki link
document.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    closeLightbox();
  });
});
