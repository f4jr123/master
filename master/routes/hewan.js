var express = require("express");
var router = express.Router();
var connection = require("../config/database.js");

// Menampilkan Data Hewan
router.get("/", function (req, res, next) {
  connection.query("SELECT * FROM hewan ORDER BY id DESC", function (err, rows) {
    if (err) {
      req.flash("error", err);
      res.render("hewan/index", { data: [] });
    } else {
      res.render("hewan/index", {
        data: rows,
      });
    }
  });
});

// Halaman Tambah Data
router.get("/create", function (req, res, next) {
  res.render("hewan/create");
});

// Proses Tambah Data
router.post("/store", function (req, res, next) {
  try {
    let { objek, kategori_id, image, audio } = req.body;
    let Data = { objek, kategori_id, image, audio };

    connection.query("INSERT INTO hewan SET ?", Data, function (err, result) {
      if (err) {
        req.flash("error", "Gagal menyimpan data");
      } else {
        req.flash("success", "Berhasil menyimpan data");
      }
      res.redirect("/hewan");
    });
  } catch (err) {
    req.flash("error", "Terjadi kesalahan saat menyimpan");
    res.redirect("/hewan");
  }
});

// Halaman Edit Data
router.get("/edit/(:id)", function (req, res, next) {
  let id = req.params.id;
  connection.query("SELECT * FROM hewan WHERE id = ?", [id], function (err, rows) {
    if (err || rows.length === 0) {
      req.flash("error", "Data tidak ditemukan");
      res.redirect("/hewan");
    } else {
      res.render("hewan/edit", {
        id: rows[0].id,
        objek: rows[0].objek,
        kategori_id: rows[0].kategori_id,
        image: rows[0].image,
        audio: rows[0].audio,
      });
    }
  });
});

// Proses Edit Data
router.post("/update/(:id)", function (req, res, next) {
  let id = req.params.id;
  let { objek, kategori_id, image, audio } = req.body;
  let Data = { objek, kategori_id, image, audio };

  connection.query("UPDATE hewan SET ? WHERE id = ?", [Data, id], function (err) {
    if (err) {
      req.flash("error", "Gagal memperbarui data");
    } else {
      req.flash("success", "Berhasil memperbarui data");
    }
    res.redirect("/hewan");
  });
});

// Proses Hapus Data
router.get("/delete/(:id)", function (req, res, next) {
  let id = req.params.id;
  connection.query("DELETE FROM hewan WHERE id = ?", [id], function (err) {
    if (err) {
      req.flash("error", "Gagal menghapus data");
    } else {
      req.flash("success", "Data berhasil dihapus");
    }
    res.redirect("/hewan");
  });
});

module.exports = router;
