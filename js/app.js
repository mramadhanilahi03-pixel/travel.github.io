/* LOGIN */
function login(e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === "rama" && password === "123") {
    location.href = "dashboard.html";
  } else {
    alert("Username atau password salah!");
  }
}

/* GLOBAL VARIABLE */
let strukTextGlobal = "";
let pesawatSelected = null;

/* OPEN BOOKING MODAL */
function openBookingModal(id) {
  pesawatSelected = pesawatData.find(p => p.id == id);
  
  document.getElementById("pesawatNama").innerText = pesawatSelected.nama;
  document.getElementById("pesawatRute").innerText = pesawatSelected.rute;
  document.getElementById("pesawatHarga").innerText = pesawatSelected.harga.toLocaleString();
  
  const bookingModal = new bootstrap.Modal(document.getElementById("bookingModal"));
  bookingModal.show();
}

/* BOOKING FROM DASHBOARD */
function bookingDashboard(e) {
  e.preventDefault();

  const nama = document.getElementById("namaPenumpang").value;
  const jumlah = parseInt(document.getElementById("jumlahTiket").value);

  const pesawat = pesawatSelected;
  const total = pesawat.harga * jumlah;

  const kodeBooking = "BK" + Math.floor(Math.random() * 100000);
  const tanggal = new Date().toLocaleString("id-ID");

  strukTextGlobal = `
==============================
      E-TICKET PESAWAT
==============================
Kode Booking : ${kodeBooking}
Tanggal      : ${tanggal}

Maskapai     : ${pesawat.nama}
Rute         : ${pesawat.rute}
Kelas        : ${pesawat.kelas}

Waktu        : ${pesawat.waktu}

Nama Penumpang:
- ${nama}

Jumlah Tiket : ${jumlah}
Harga Tiket  : Rp ${pesawat.harga.toLocaleString()}
------------------------------
TOTAL BAYAR  : Rp ${total.toLocaleString()}
------------------------------

Silakan check-in minimal
2 jam sebelum keberangkatan.
Terima kasih telah memesan.
==============================
`;

  document.getElementById("strukArea").innerText = strukTextGlobal;

  // Tutup booking modal
  const bookingModal = bootstrap.Modal.getInstance(document.getElementById("bookingModal"));
  bookingModal.hide();

  // Buka struk modal
  const strukModal = new bootstrap.Modal(document.getElementById("strukModal"));
  strukModal.show();

  // Reset form
  document.getElementById("namaPenumpang").value = "";
  document.getElementById("jumlahTiket").value = "";
}

/* BOOKING FROM DETAIL PAGE */
function book(e) {
  e.preventDefault();

  const nama = document.getElementById("penumpang").value;
  const jumlah = parseInt(document.getElementById("jumlah").value);

  const pesawat = window.pesawatAktif; // dari detail.js
  const total = pesawat.harga * jumlah;

  const kodeBooking = "BK" + Math.floor(Math.random() * 100000);
  const tanggal = new Date().toLocaleString("id-ID");

  strukTextGlobal = `
==============================
      E-TICKET PESAWAT
==============================
Kode Booking : ${kodeBooking}
Tanggal      : ${tanggal}

Maskapai     : ${pesawat.nama}
Rute         : ${pesawat.rute}
Kelas        : ${pesawat.kelas}

Waktu        : ${pesawat.waktu}

Nama Penumpang:
- ${nama}

Jumlah Tiket : ${jumlah}
Harga Tiket  : Rp ${pesawat.harga.toLocaleString()}
------------------------------
TOTAL BAYAR  : Rp ${total.toLocaleString()}
------------------------------

Silakan check-in minimal
2 jam sebelum keberangkatan.
Terima kasih telah memesan.
==============================
`;

  document.getElementById("strukArea").innerText = strukTextGlobal;

  const modal = new bootstrap.Modal(document.getElementById("strukModal"));
  modal.show();
}

/* DOWNLOAD PDF */
function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();

  pdf.setFont("Courier");
  pdf.setFontSize(10);

  const lines = pdf.splitTextToSize(strukTextGlobal, 180);
  pdf.text(lines, 10, 10);

  pdf.save("e-ticket-booking.pdf");
}

/* RENDER PROMO */
function renderPromo() {
  const promo = document.getElementById("promoList");
  if (!promo) return;

  promo.innerHTML = "";
  pesawatData.filter(p => p.status === 'Tersedia').forEach(p => {
    promo.innerHTML += `
    <div class="col-md-4 fade-in">
      <div class="card border-success shadow">
        <div class="card-body text-center">
          <h5>${p.nama}</h5>
          <p><del>Rp ${p.harga.toLocaleString()}</del></p>
          <h5 class="text-success">Rp ${(p.harga * 0.75).toLocaleString()}</h5>
          <a class="btn btn-success btn-sm" href="detail.html?id=${p.id}">Pesan</a>
        </div>
      </div>
    </div>`;
  });
}

/* INIT - RENDER PROMO AT DASHBOARD */
document.addEventListener("DOMContentLoaded", () => {
  renderPromo();
});

