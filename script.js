// GANTI DENGAN NOMOR WHATSAPP PENJUAL
// Gunakan kode negara 62, tanpa tanda + atau angka 0 di depan.
const nomorWhatsApp = "6282283756725";

let keranjang = [];

function tambah(nama, harga) {
    const produk = keranjang.find(item => item.nama === nama);

    if (produk) {
        produk.jumlah++;
    } else {
        keranjang.push({
            nama: nama,
            harga: harga,
            jumlah: 1
        });
    }

    tampilkanKeranjang();
}

function ubahJumlah(index, perubahan) {
    keranjang[index].jumlah += perubahan;

    if (keranjang[index].jumlah <= 0) {
        keranjang.splice(index, 1);
    }

    tampilkanKeranjang();
}

function hapus(index) {
    keranjang.splice(index, 1);
    tampilkanKeranjang();
}

function formatRupiah(angka) {
    return "Rp" + angka.toLocaleString("id-ID");
}

function tampilkanKeranjang() {
    const daftar = document.getElementById("daftar-keranjang");
    const totalElement = document.getElementById("total");

    daftar.innerHTML = "";
    let total = 0;

    if (keranjang.length === 0) {
        daftar.innerHTML =
            '<p class="empty">Keranjang masih kosong.</p>';
    }

    keranjang.forEach((item, index) => {
        total += item.harga * item.jumlah;

        daftar.innerHTML += `
            <div class="cart-item">
                <div>
                    <strong>${item.nama}</strong><br>
                    <small>${formatRupiah(item.harga)} x ${item.jumlah}</small>
                </div>

                <div class="item-actions">
                    <button class="qty-btn"
                        onclick="ubahJumlah(${index}, -1)">-</button>

                    <strong>${item.jumlah}</strong>

                    <button class="qty-btn"
                        onclick="ubahJumlah(${index}, 1)">+</button>

                    <button class="remove-btn"
                        onclick="hapus(${index})">X</button>
                </div>
            </div>
        `;
    });

    totalElement.innerText = formatRupiah(total);
}

function checkout() {
    if (keranjang.length === 0) {
        alert("Keranjang belanja masih kosong!");
        return;
    }

    const nama = document.getElementById("nama").value.trim();
    const alamat = document.getElementById("alamat").value.trim();
    const catatan = document.getElementById("catatan").value.trim();

    if (!nama || !alamat) {
        alert("Silakan isi nama dan alamat terlebih dahulu!");
        return;
    }

    let total = 0;

    let pesan = `Halo NYAM CAMPUS! Saya ingin memesan makanan.\n\n`;
    pesan += `Nama: ${nama}\n`;
    pesan += `Alamat: ${alamat}\n\n`;
    pesan += `DAFTAR PESANAN:\n`;

    keranjang.forEach(item => {
        const subtotal = item.harga * item.jumlah;
        total += subtotal;

        pesan += `- ${item.nama} (${item.jumlah}x) = ${formatRupiah(subtotal)}\n`;
    });

    pesan += `\nTOTAL: ${formatRupiah(total)}\n`;

    if (catatan) {
        pesan += `Catatan: ${catatan}\n`;
    }

    pesan += `\nMohon konfirmasi pesanan saya. Terima kasih!`;

    const url = `https://wa.me/${nomorWhatsApp}?text=${encodeURIComponent(pesan)}`;

    window.open(url, "_blank");
}

// Tampilan awal
tampilkanKeranjang();