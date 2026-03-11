import React, { useState } from 'react';
// 2. Path CSS diperbaiki agar lebih sesuai standar
import './Diskon2.css'; 

// 1. Nama komponen diubah menjadi PascalCase dan disamakan dengan nama file
const Diskon2 = () => {
  const [totalPrice, setTotalPrice] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [result, setResult] = useState(null);

  // Fungsi untuk menangani proses kalkulasi
  const handleCalculate = (e) => {
    e.preventDefault();

    // Validasi input
    if (!totalPrice || !customerName || totalPrice <= 0) {
      alert('Harap isi harga total dan nama pelanggan dengan benar.');
      return;
    }

    // --- LOGIKA BARU DIMULAI DI SINI ---

    // 1. Definisikan huruf vokal
    const vowels = 'aiueo';
    let vowelCount = 0;

    // 2. Hitung jumlah huruf vokal di nama (abaikan huruf besar/kecil)
    for (const char of customerName.toLowerCase()) {
      if (vowels.includes(char)) {
        vowelCount++;
      }
    }

    // 3. Tentukan persentase diskon (1% per vokal, maksimal 10%)
    let discountPercentage = Math.min(vowelCount, 10);

    // --- LOGIKA BARU SELESAI ---

    const discountAmount = (totalPrice * discountPercentage) / 100;
    const finalPrice = totalPrice - discountAmount;

    // Simpan hasil ke dalam state
    setResult({
      nameLength: customerName.replace(/\s/g, '').length, // Panjang nama tetap dihitung tanpa spasi
      vowelCount: vowelCount, // Kita bisa tampilkan ini juga jika mau
      discount: discountPercentage,
      finalPrice: finalPrice,
    });
  };

  return (
    <div className="calculator-container">
      <h1>Program Diskon Berdasarkan Panjang Nama 2</h1>

      <form onSubmit={handleCalculate} className="calculator-form">
        <div className="form-group">
          <label htmlFor="totalPrice">Harga Total Pembelian (Rp)</label>
          <input
            type="number"
            id="totalPrice"
            value={totalPrice}
            onChange={(e) => setTotalPrice(e.target.value)}
            placeholder="Contoh: 100000"
          />
        </div>

        <div className="form-group">
          <label htmlFor="customerName">Nama Pelanggan</label>
          <input
            type="text"
            id="customerName"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Contoh: Budi Jan"
          />
        </div>

        <button type="submit">Hitung Diskon</button>
      </form>

      {result && (
        <div className="result-container">
          <h2>Hasil Perhitungan</h2>
          <p>
            Panjang Nama: <strong>{result.nameLength} karakter</strong>
          </p>
          <p>
            Total Diskon: <strong>{result.discount}%</strong>
            <span className="info-text"> (dari {result.vowelCount} huruf vokal)</span>
          </p>
          <p className="final-price">
            Harga Setelah Diskon:
            <strong>
              {result.finalPrice.toLocaleString('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0,
              })}
            </strong>
          </p>
        </div>
      )}
    </div>
  );
};

// 3. Cara export component diperbaiki
export default Diskon2;