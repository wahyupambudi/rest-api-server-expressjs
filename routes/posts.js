const express = require("express");
const router = express.Router();

// import database
const koneksi = require("../config/database");

// Halaman Index Data
router.get("/", function (req, res) {
  koneksi.query(
    "SELECT kd_brg as kode_barang, nm_brg as nama_barang, spek_brg as spesifikasi_barang, jml_brg as jumlah_barang, kondisi_brg as kondisi_barang, tgl_buy_brg as tanggal_beli_barang, harga_brg as harga_barang, img_brg as image_barang FROM tb_barang ORDER BY kd_brg ASC",
    function (err, rows) {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Internal Server Error",
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "List Data Barang",
          data: rows,
        });
      }
    }
  );
});

module.exports = router;
