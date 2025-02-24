document.addEventListener("DOMContentLoaded", function () {
  const openModalBtn = document.getElementById("clickBtn");
  const modal = document.getElementById("modal");
  const nextModalBtn = document.getElementById("nextBtn");
  const dynamicContent = document.getElementById("dynamicContent");
  const pageIndicators = [
    document.getElementById("page1"),
    document.getElementById("page2"),
    document.getElementById("page3"),
  ];
});

let currentIndex = 0; //Set Current page index to 0 at the begining

// Open model on click
openModalBtn?.addEventListener("click", () => {
  if (modal) {
    modal.style.display = "flex";
    updateDynamicContent();
  }
});

// Next button click
nextModalBtn?.addEventListener("click", () => {
  if (currentIndex == 2) {
    modal.style.display = "none";
    location.reload();
  } else {
    currentIndex = (currentIndex + 1) % 3;
    updateDynamicContent();
  }
});

// Update dynamic content
