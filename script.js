const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxDesc = document.getElementById('lightbox-desc');
const closeBtn = document.querySelector('.close');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
const galleryImages = document.querySelectorAll('.gallery-item img');

let currentIndex = 0;

function showImage(index) {
  lightbox.style.display = 'flex';
  const selectedImg = galleryImages[index];
  lightboxImg.src = selectedImg.src;

  const desc = selectedImg.getAttribute('data-description') || selectedImg.nextElementSibling?.innerText || '';
  lightboxDesc.textContent = desc;
  currentIndex = index;
}

galleryImages.forEach((img, index) => {
  img.addEventListener('click', () => {
    showImage(index);
  });
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
});

// Touch/swipe support
let startX = 0;

lightbox.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
}, false);

lightbox.addEventListener('touchend', (e) => {
  let endX = e.changedTouches[0].clientX;
  if (endX - startX > 50) {
    prevBtn.click();
  } else if (startX - endX > 50) {
    nextBtn.click();
  }
}, false);
