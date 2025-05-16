const express = require('express');
const router = express.Router();
const database = require('../config/database');

router.get('/', (req, res) => {
  res.render('home', { title: 'Beranda' });
});

router.get('/galeri/:kategori', (req, res) => {
  const kategori = req.params.kategori;
  const sql = `SELECT objek.* FROM objek JOIN catgori
               ON objek.kategori_id = catgori.id
               WHERE catgori.kategori = ?`;

  database.query(sql, [kategori], (err, results) => {
    if (err) throw err;
    res.render('galeri', { data: results, kategori });
  });
});

module.exports = router;