document.addEventListener("DOMContentLoaded", function () {
  const pageIndicators = [
    document.getElementById("page1"),
    document.getElementById("page2"),
    document.getElementById("page3"),
  ];

  const openModalBtn = document.getElementById("clickBtn");
  const modal = document.getElementById("modal");
  const nextModalBtn = document.getElementById("nextBtn");
  const dynamicContent = document.getElementById("dynamicContent");


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
  if (currentIndex === 2) {
    modal.style.display = "none";
    location.reload();
  } else {
    currentIndex = (currentIndex + 1) % 3;
    updateDynamicContent();
  }
});

// Update dynamic content
function updateDynamicContent() {
  let htmlFile = "";
  switch (currentIndex) {
    case 0:
      htmlFile = "screen_1.html";
      break;
    case 1:
      htmlFile = "screen_2.html";
      break;
    case 2:
      htmlFile = "screen_3.html";
      break;
  }

  fetch(`../html/${htmlFile}`)
    .then((response) => response.text())
    .then((data) => {
      dynamicContent.innerHTML = data;
    })
    .catch((error) => {
      console.error("Error loading dynamic content:", error);
    });

  // Update page indicators
  pageIndicators.forEach((indicator, index) => {
    if (index === currentIndex) {
      indicator.classList.add("page-indicator-active");
    } else {
      indicator.classList.remove("page-indicator-active");
    }
  });
}

});
