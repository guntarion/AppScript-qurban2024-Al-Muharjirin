/**
 * Menghitung bobot sapi menggunakan Rumus Scheiffer.
 * @param {number} LD - Lingkar dada dalam sentimeter.
 * @param {number} PB - Panjang badan dalam sentimeter.
 * @return {number} - Estimasi bobot sapi dalam kilogram.
 * @customfunction
 */
function hitungBobotSapi(LD, PB) {
  if (typeof LD !== "number" || typeof PB !== "number") {
    throw new Error("Input harus berupa angka.");
  }
  if (LD <= 0 || PB <= 0) {
    throw new Error(
      "Lingkar dada dan panjang badan harus lebih besar dari nol."
    );
  }
  // Rumus Scheiffer: BB = (LD^2 * PB) / 10840
  var BB = (Math.pow(LD, 2) * PB) / 10840;
  return BB;
}

/**
 * Menghitung bobot kambing menggunakan Rumus Frisch.
 * @param {number} LD - Lingkar dada dalam sentimeter.
 * @return {number} - Estimasi bobot kambing dalam kilogram.
 * @customfunction
 */
function hitungBobotKambing(LD) {
  if (typeof LD !== "number") {
    throw new Error("Input harus berupa angka.");
  }
  if (LD <= 70) {
    throw new Error("Lingkar dada harus lebih besar dari 70 cm.");
  }
  // Rumus Frisch: BB = 0.8 * (LD - 70) + 15
  var BB = 0.8 * (LD - 70) + 15;
  return BB;
}
