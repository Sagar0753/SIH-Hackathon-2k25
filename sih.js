(function () {
  // === Sidebar Navigation Switch ===
  const links = document.querySelectorAll(".sidebar a");
  const sections = document.querySelectorAll("main.section");

  links.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      links.forEach(l => l.classList.remove("active"));
      link.classList.add("active");

      const target = link.dataset.target;
      sections.forEach(sec => sec.style.display = "none");
      document.querySelector("." + target).style.display = "block";
    });
  });

  // === File Upload ===
  const dropAreaEl = document.getElementById("dropArea");
  const fileEl = document.getElementById("fileUpload");
  const browseBtnEl = document.getElementById("browseBtn");
  const detailsEl = document.getElementById("fileDetails");
  const uploadBtnEl = document.getElementById("uploadBtn");
  const msgEl = document.getElementById("uploadMsg");

  if (dropAreaEl && fileEl && browseBtnEl && detailsEl && uploadBtnEl && msgEl) {
    browseBtnEl.addEventListener("click", () => fileEl.click());
    fileEl.addEventListener("change", () => {
      const f = fileEl.files[0];
      if (f) {
        detailsEl.textContent = `Selected: ${f.name} (${(f.size/1024).toFixed(2)} KB)`;
        browseBtnEl.hidden = true; uploadBtnEl.hidden = false; msgEl.textContent="";
      }
    });
    dropAreaEl.addEventListener("dragover", e => { e.preventDefault(); dropAreaEl.classList.add("dragover"); });
    dropAreaEl.addEventListener("dragleave", () => dropAreaEl.classList.remove("dragover"));
    dropAreaEl.addEventListener("drop", e => {
      e.preventDefault(); dropAreaEl.classList.remove("dragover");
      const f = e.dataTransfer.files[0];
      if (f) {
        fileEl.files = e.dataTransfer.files;
        detailsEl.textContent = `Selected: ${f.name} (${(f.size/1024).toFixed(2)} KB)`;
        browseBtnEl.hidden = true; uploadBtnEl.hidden = false; msgEl.textContent="";
      }
    });
    uploadBtnEl.addEventListener("click", () => {
      const f = fileEl.files[0];
      if (!f) return;
      uploadBtnEl.disabled = true; uploadBtnEl.textContent="Uploading...";
      setTimeout(() => {
        uploadBtnEl.disabled=false; uploadBtnEl.hidden=true;
        uploadBtnEl.textContent="Upload"; browseBtnEl.hidden=false;
        fileEl.value="";
        msgEl.innerHTML = `<span style="color:green;">File "${f.name}" uploaded successfully!</span>`;
        document.getElementById("visualizationBox").innerHTML = `
          <h4>Sample Visualization</h4>
          <p>Preview of <b>${f.name}</b></p>
          <div style="height:200px;background:#eef4ff;display:flex;align-items:center;justify-content:center;border-radius:8px;">
            <span style="color:#123e9c;">[Chart will render here]</span>
          </div>`;
      }, 1000);
    });
  }

  
  // === Dashboard Charts ===
  if (window.Chart) {
    new Chart(document.getElementById("tempChart"), {
      type: "line",
      data: {
        labels:["Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
        datasets:[{ label:"Ocean Temperature (°C)", data:[22,24,26,27,28,27,26,25,24,23,22,25],
          borderColor:"#0066cc", backgroundColor:"rgba(0,102,204,0.1)", fill:true, tension:0.4 }]
      }
    });

    new Chart(document.getElementById("speciesChart"), {
      type:"bar",
      data:{
        labels:["Arabian Sea","Bay of Bengal","Indian Ocean","Pacific","Atlantic"],
        datasets:[{ label:"Species Count", data:[520,660,870,410,250],
          backgroundColor:["#3b82f6","#10b981","#f97316","#8b5cf6","#ef4444"] }]
      },
      options:{ plugins:{ legend:{ display:false } } }
    });

    // === Ocean Parameters Charts ===
    new Chart(document.getElementById("salinityChart"), {
      type:"line",
      data:{
        labels:["Feb","Mar","Apr","May","Jun","Jul","Aug"],
        datasets:[{ label:"Salinity (PSU)", data:[34,33.8,34.5,35,34.2,33.7,34.1],
          borderColor:"#10b981", backgroundColor:"rgba(16,185,129,0.2)", fill:true }]
      }
    });

    new Chart(document.getElementById("phChart"), {
      type:"bar",
      data:{
        labels:["Surface","Mid Depth","Deep"],
        datasets:[{ label:"pH Levels", data:[8.1,7.9,7.6], backgroundColor:["#f59e0b","#6366f1","#3b82f6"] }]
      }
    });

    // === Fish Taxonomy Charts ===
    new Chart(document.getElementById("fishChart"), {
      type:"pie",
      data:{
        labels:["Clupeidae","Scombridae","Carangidae","Engraulidae","Others"],
        datasets:[{ data:[250,180,140,100,90],
          backgroundColor:["#ef4444","#3b82f6","#10b981","#f59e0b","#8b5cf6"] }]
      }
    });

    new Chart(document.getElementById("habitatChart"), {
      type:"bar",
      data:{
        labels:["Reef","Open Ocean","Deep Sea","Coastal"],
        datasets:[{ label:"Population", data:[320,450,210,380], backgroundColor:"#06b6d4" }]
      }
    });

    // === DNA/eDNA Charts ===
    new Chart(document.getElementById("dnaChart"), {
      type:"line",
      data:{
        labels:["Jan","Feb","Mar","Apr","May","Jun"],
        datasets:[{ label:"DNA Samples", data:[1200,1350,1400,1600,1550,1700],
          borderColor:"#8b5cf6", backgroundColor:"rgba(139,92,246,0.2)", fill:true }]
      }
    });

    new Chart(document.getElementById("ednaChart"), {
      type:"doughnut",
      data:{
        labels:["Region A","Region B","Region C","Region D"],
        datasets:[{ data:[400,350,500,280],
          backgroundColor:["#3b82f6","#10b981","#f97316","#ef4444"] }]
      }
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
