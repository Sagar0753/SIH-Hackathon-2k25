(function () {
  if (window.__AIQUATIC_INIT) return;
  window.__AIQUATIC_INIT = true;

  const dropAreaEl = document.getElementById("dropArea");
  const fileEl = document.getElementById("fileUpload");
  const browseBtnEl = document.getElementById("browseBtn");
  const detailsEl = document.getElementById("fileDetails");
  const uploadBtnEl = document.getElementById("uploadBtn");
  const msgEl = document.getElementById("uploadMsg");

  if (dropAreaEl && fileEl && browseBtnEl && detailsEl && uploadBtnEl && msgEl) {
    // open file dialog
    browseBtnEl.addEventListener("click", function () {
      fileEl.click();
    });

    // file selected
    fileEl.addEventListener("change", function () {
      const f = fileEl.files && fileEl.files[0];
      if (f) {
        detailsEl.innerHTML = `<span class="file-name">Selected: ${f.name} (${(f.size / 1024).toFixed(2)} KB)</span>`;
        browseBtnEl.hidden = true;
        uploadBtnEl.hidden = false;
        msgEl.textContent = "";
      }
    });

    // drag over
    dropAreaEl.addEventListener("dragover", function (e) {
      e.preventDefault();
      dropAreaEl.classList.add("dragover");
    });

    dropAreaEl.addEventListener("dragleave", function () {
      dropAreaEl.classList.remove("dragover");
    });

    dropAreaEl.addEventListener("drop", function (e) {
      e.preventDefault();
      dropAreaEl.classList.remove("dragover");
      const files = e.dataTransfer && e.dataTransfer.files;
      if (files && files.length > 0) {
        fileEl.files = files;
        const f = files[0];
        detailsEl.innerHTML = `<span class="file-name">Selected: ${f.name} (${(f.size / 1024).toFixed(2)} KB)</span>`;
        browseBtnEl.hidden = true;
        uploadBtnEl.hidden = false;
        msgEl.textContent = "";
      }
    });

    // simulate upload
    uploadBtnEl.addEventListener("click", function () {
      const f = fileEl.files && fileEl.files[0];
      if (!f) return;
      uploadBtnEl.disabled = true;
      uploadBtnEl.textContent = "Uploading...";
      setTimeout(function () {
        uploadBtnEl.disabled = false;
        uploadBtnEl.hidden = true;
        uploadBtnEl.textContent = "Upload";
        browseBtnEl.hidden = false;
        fileEl.value = "";
        msgEl.style.color = "green";
        msgEl.innerHTML = `<span class="success-text">Your file "<b>${f.name}</b>" (${(f.size / 1024).toFixed(2)} KB) has been uploaded successfully!</span>`;
      }, 900);
    });
  }

  // Sidebar Toggle
  const menuBtn = document.querySelector(".hamburger");
  const sidebar = document.querySelector(".sidebar");

  if (menuBtn && sidebar) {
    menuBtn.addEventListener("click", () => {
      sidebar.classList.toggle("show");
      menuBtn.classList.toggle("open");
    });
  }
  // Search Modal Logic
const searchBtn = document.querySelector(".header-icons button i.fa-search").parentElement;
const searchModal = document.getElementById("searchModal");
const closeBtn = document.querySelector(".close-btn");

if (searchBtn && searchModal && closeBtn) {
  searchBtn.addEventListener("click", () => {
    searchModal.style.display = "flex";
    document.getElementById("searchInput").focus();
  });

  closeBtn.addEventListener("click", () => {
    searchModal.style.display = "none";
  });

  // Close modal if clicked outside
  window.addEventListener("click", (e) => {
    if (e.target === searchModal) {
      searchModal.style.display = "none";
    }
  });
}

})();
