// temp.js - safe, self-contained upload handler
(function () {
  if (window.__AIQUATIC_UPLOAD_INIT) return;
  window.__AIQUATIC_UPLOAD_INIT = true;
function parseCSVData(csv) {
  const lines = csv.trim().split('\n');
  const labels = [];
  const values = [];

  for (let i = 1; i < lines.length; i++) {
    const [label, value] = lines[i].split(',');
    labels.push(label);
    values.push(Number(value));
  }

  return { labels, values };
}
let myChart; // global chart reference

function renderChart(labels, values) {
  const ctx = document.getElementById('myChart').getContext('2d');

  // Destroy previous chart if it exists
  if (myChart) {
    myChart.destroy();
  }

  myChart = new Chart(ctx, {
    type: 'bar', // Change to 'pie' or 'line' if needed
    data: {
      labels: labels,
      datasets: [{
        label: 'Values',
        data: values,
        backgroundColor: [
          '#4e79a7', '#f28e2b', '#e15759', '#76b7b2', '#59a14f',
          '#edc948', '#b07aa1', '#ff9da7', '#9c755f', '#bab0ab'
        ],
        borderRadius: 8,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true
        }
      }
    }
  });

  document.getElementById('chartSection').style.display = 'block';
}

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
