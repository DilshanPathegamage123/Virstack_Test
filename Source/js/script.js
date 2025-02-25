let pageIndicators;
let openModalBtn;
let modal;
let nextModalBtn;
let dynamicContent;

document.addEventListener("DOMContentLoaded", function () {
  pageIndicators = [
    document.getElementById("page1"),
    document.getElementById("page2"),
    document.getElementById("page3"),
  ];

  openModalBtn = document.getElementById("clickBtn");
  modal = document.getElementById("modal");
  nextModalBtn = document.getElementById("nextBtn");
  dynamicContent = document.getElementById("dynamicContent");

  // Open modal click
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
});

let currentIndex = 0; // Set Current page index to 0 at the beginning

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

  dynamicContent.innerHTML = "<p>Loading...</p>"; 

  if (typeof htmlFile === "string" && htmlFile.includes(".html")) {
    fetch(`../html/${htmlFile}`)
      .then((response) => response.text())

      .then((data) => {
        dynamicContent.innerHTML = data;
        if (currentIndex === 0) Screen1();
        else if (currentIndex === 1) displayTemplateContent();
      })
      .catch((error) => {
        console.error("Error loading dynamic content:", error);
        dynamicContent.innerHTML =
          "<p>Error loading content. Please try again.</p>"; 
      });
  }

  // update next button text
  nextBtn.textContent = currentIndex === 2 ? "Create Job" : "Next";

  // Update page indicators
  pageIndicators.forEach((indicator, index) => {
    if (index === currentIndex) {
      indicator.classList.add("page-indicator-active");
    } else {
      indicator.classList.remove("page-indicator-active");
    }
  });
}

////////////////////////// Screen 1
function Screen1() {
  // Table Data
  const data = [
    {
      organization: "Bank of America",
      code: "SAFW",
      handler: "Savannah Nguyen",
    },
    { organization: "Google", code: "GOGL", handler: "Michael Johnson" },
    { organization: "Apple Inc", code: "APLQ", handler: "Emily Roberts" },
    { organization: "Microsoft", code: "MSFT", handler: "David Thompson" },
    { organization: "Amazon", code: "AMZN", handler: "Jessica Andersa" },
    { organization: "Facebook", code: "FBLK", handler: "Christopher" },
    { organization: "Netflix", code: "NFLX", handler: "Isabella" },
    { organization: "Twitter", code: "TWTR", handler: "Mason" },
    { organization: "Snapchat", code: "SNAP", handler: "Olivia" },
    { organization: "LinkedIn", code: "LNKD", handler: "Benjamin" },
    { organization: "Salesforce", code: "CRM", handler: "Jack" },
    { organization: "Stripe", code: "STRP", handler: "Grace" },
    { organization: "Pinterest", code: "PINS", handler: "Henry" },
    { organization: "Spotify", code: "SPTF", handler: "Emma" },
    { organization: "IBM", code: "IBM", handler: "Oliver" },
    { organization: "Adobe", code: "ADBE", handler: "Charlotte" },
    { organization: "Tesla", code: "TSLA", handler: "Liam" },
    { organization: "Uber", code: "UBER", handler: "Mia" },
    { organization: "Airbnb", code: "ABNB", handler: "Lucas" },
    { organization: "Slack", code: "WORK", handler: "Amos" },
    { organization: "Zoom", code: "ZM", handler: "Lily" },
    { organization: "PayPal", code: "PYPL", handler: "Ethan" },
    { organization: "Square", code: "SQ", handler: "Ava" },
  ];

  const rowsPerPage = 5;
  let currentPage = 1; // only for pagination inside screen 1
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const tableBody = document.getElementById("tableBody");
  const keywordInput = document.getElementById("keyword");
  const clearBtn = document.getElementById("clearBtn");
  const pageNo = document.getElementById("pageNo");
  const firstBtn = document.getElementById("firstBtn");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const lastBtn = document.getElementById("lastBtn");

  // Store checked states
  const checkedRows = {};

  // Render table of screen 1 and pagination
  function renderTable(data, page = 1) {
    tableBody.innerHTML = "";
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedData = data.slice(start, end);

    paginatedData.forEach((item) => {
      const row = document.createElement("div");
      row.classList.add("table-row");
      const isChecked = checkedRows[item.code] || false; // Restore checked state
      row.innerHTML = `
        <span><input type="checkbox" class="row-checkbox" data-code="${
          item.code
        }" ${isChecked ? "checked" : ""}></span>
        <span>${item.organization}</span>
        <span>${item.code}</span>
        <span>${item.handler}</span>
      `;
      tableBody.appendChild(row);
    });

    //event listeners for checkboxes
    document.querySelectorAll(".row-checkbox").forEach((checkbox) => {
      checkbox.addEventListener("change", (event) => {
        const code = event.target.getAttribute("data-code");
        checkedRows[code] = event.target.checked; // Save checked state
      });
    });

    pageNo.textContent = `${start + 1}-${Math.min(end, data.length)} of ${
      data.length
    }`;
  }

  // Search according to keyword
  function filterData(keyword) {
    return data.filter((item) =>
      item.organization.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  keywordInput.addEventListener("input", () => {
    const keyword = keywordInput.value;
    const filteredData = filterData(keyword);
    currentPage = 1; // Reset to first page on new search
    renderTable(filteredData, currentPage);

    // Show or hide the clear button
    if (keyword) {
      clearBtn.classList.add("show");
    } else {
      clearBtn.classList.remove("show");
    }
  });

  //clear search
  clearBtn.addEventListener("click", () => {
    keywordInput.value = "";
    currentPage = 1; // Reset to first page on clear
    renderTable(data);
  });

  //click on first, prev, next, last buttons to navigate
  firstBtn.addEventListener("click", () => {
    currentPage = 1;
    renderTable(data, currentPage);
  });

  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderTable(data, currentPage);
    }
  });

  nextBtn.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderTable(data, currentPage);
    }
  });

  lastBtn.addEventListener("click", () => {
    currentPage = totalPages;
    renderTable(data, currentPage);
  });

  // Initial render
  renderTable(data);
}

//////////////////////// Screen 2

function displayTemplateContent() {
  const templateDropdown = document.getElementById("templateDropdownMenu");
  const template1Content = document.getElementById("template1Content");

  if (templateDropdown && template1Content) {
    template1Content.classList.add("hidden-content");

    templateDropdown.addEventListener("change", function () {
      console.log("Selected value:", this.value);

      if (this.value === "temp1") {
        template1Content.classList.remove("hidden-content");
        template1Content.classList.add("visible-div");
      } else {
        template1Content.classList.add("hidden-content");
        template1Content.classList.remove("visible-div");
      }
    });
  } else {
    console.error("Dropdown or template1content not found.");
  }
}
