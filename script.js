const lines = [
  "Hallo! Ich heiße",
  "Marija Pusticki,",
  "herzlich willkommen in",
  "meinem Portfolio :)"
];

const container = document.getElementById("typewriter");
let lineIndex = 0;
let charIndex = 0;

function typeLine() {
  if (lineIndex < lines.length) {
    const line = lines[lineIndex];
    const current = container.querySelectorAll("div")[lineIndex];

    if (!current) {
      const newLine = document.createElement("div");
      container.appendChild(newLine);
    }

    container.querySelectorAll("div")[lineIndex].textContent += line[charIndex] || '';

    charIndex++;

    if (charIndex < line.length) {
      setTimeout(typeLine, 60);
    } else {
      lineIndex++;
      charIndex = 0;
      setTimeout(typeLine, 300);
    }
  }
}

typeLine();
let startX = 0;

lightbox.addEventListener('touchstart', (e) => {
  startX = e.changedTouches[0].clientX;
}, false);

lightbox.addEventListener('touchend', (e) => {
  const endX = e.changedTouches[0].clientX;
  const deltaX = endX - startX;

  if (deltaX > 50) {
    // swipe right → prikaži prethodnu
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    showImage(currentIndex);
  } else if (deltaX < -50) {
    // swipe left → prikaži sljedeću
    currentIndex = (currentIndex + 1) % galleryImages.length;
    showImage(currentIndex);
  }
}, false);
