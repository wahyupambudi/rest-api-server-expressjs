const express = require("express");
const router = express.Router();

// import express validator
const { body, validationResult } = require("express-validator");

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

// POST STORE
router.post(
  "/add",
  [
    // validation
    body("kd_brg").notEmpty(),
    body("nm_brg").notEmpty(),
    body("spek_brg").notEmpty(),
    body("jml_brg").notEmpty(),
    body("kondisi_brg").notEmpty(),
    body("tgl_buy_brg").notEmpty(),
    body("harga_brg").notEmpty(),
    body("img_brg").notEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }

    // define formData
    let formData = {
      kd_brg: req.body.kd_brg,
      nm_brg: req.body.nm_brg,
      spek_brg: req.body.spek_brg,
      jml_brg: req.body.jml_brg,
      kondisi_brg: req.body.kondisi_brg,
      tgl_buy_brg: req.body.tgl_buy_brg,
      harga_brg: req.body.harga_brg,
      img_brg: req.body.img_brg,
    };

    // insert query to database tb_barang
    koneksi.query(
      "INSERT INTO tb_barang SET ?",
      formData,
      function (err, rows) {
        // jika err
        if (err) {
          return res.status(500).json({
            status: false,
            message: "Internal Server Error",
          });
        } else {
          return res.status(201).json({
            status: true,
            message: "Berhasil Tambah Data",
            data: rows[0],
          });
        }
      }
    );
  }
);

module.exports = router;
