const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const pesawat = pesawatData.find(p => p.id == id);

document.getElementById("nama").innerText = pesawat.nama;
document.getElementById("rute").innerText = pesawat.rute;
document.getElementById("kelas").innerText = pesawat.kelas;
document.getElementById("harga").innerText = pesawat.harga.toLocaleString();

// let hargaGlobal = pesawat.harga;
window.pesawatAktif = pesawat;