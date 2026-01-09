document.addEventListener("DOMContentLoaded", () => {

  const list = document.getElementById("listPesawat");
  const filterKelas = document.getElementById("filterKelas");
  const filterStatus = document.getElementById("filterStatus");

  function renderPesawat(data) {
    list.innerHTML = "";

    if (data.length === 0) {
      list.innerHTML = `
        <div class="text-center">
          <p class="text-muted">Tidak ada pesawat sesuai filter</p>
        </div>`;
      return;
    }

    data.forEach(p => {
      list.innerHTML += `
      <div class="col-md-4 mb-4">
        <div class="card shadow h-100 fade-in">
          <img src="${p.gambar}" class="card-img-top">
          <div class="card-body">
            <h5>${p.nama}</h5>
            <p>Kelas: ${p.kelas}</p>
            <p>Harga: Rp ${p.harga.toLocaleString()}</p>
            <span class="badge bg-${p.status === 'Tersedia' ? 'success' : 'danger'}">
              ${p.status}
            </span>
          </div>
          <div class="card-footer bg-white">
            <a href="detail.html?id=${p.id}"
               class="btn btn-primary w-100 ${p.status !== 'Tersedia' ? 'disabled' : ''}">
              Booking
            </a>
          </div>
        </div>
      </div>`;
    });
  }

  function applyFilter() {
    let data = pesawatData;

    if (filterKelas.value) {
      data = data.filter(p => p.kelas === filterKelas.value);
    }

    if (filterStatus.value) {
      data = data.filter(p => p.status === filterStatus.value);
    }

    renderPesawat(data);
  }

  // Event listener
  filterKelas.addEventListener("change", applyFilter);
  filterStatus.addEventListener("change", applyFilter);

  // render awal
  renderPesawat(pesawatData);
});
