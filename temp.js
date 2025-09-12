// temp.js - safe, self-contained upload handler
(function () {
  if (window.__AIQUATIC_UPLOAD_INIT) return;
  window.__AIQUATIC_UPLOAD_INIT = true;

  const dropAreaEl = document.getElementById("dropArea");
  const fileEl = document.getElementById("fileUpload");
  const browseBtnEl = document.getElementById("browseBtn");
  const detailsEl = document.getElementById("fileDetails");
  const uploadBtnEl = document.getElementById("uploadBtn");
  const msgEl = document.getElementById("uploadMsg");

  if (!dropAreaEl || !fileEl || !browseBtnEl || !detailsEl || !uploadBtnEl || !msgEl) {
    return;
  }

  // open file dialog
  browseBtnEl.addEventListener("click", function () {
    fileEl.click();
  });

  // file selected
  fileEl.addEventListener("change", function () {
    const f = fileEl.files && fileEl.files[0];
    if (f) {
      detailsEl.innerHTML = `<span class="file-name">Selected: ${f.name} (${(f.size / 1024).toFixed(2)} KB)</span>`;
      uploadBtnEl.style.display = "inline-block";
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
      uploadBtnEl.style.display = "inline-block";
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
      uploadBtnEl.style.display = "none";
      uploadBtnEl.disabled = false;
      uploadBtnEl.textContent = "Upload";
      msgEl.style.color = "green";
      msgEl.innerHTML = ` <span class="success-text">Your file "<b>${f.name}</b>" (${(f.size / 1024).toFixed(2)} KB) has been uploaded successfully!</span>`;
    }, 900);
  });
})();
