const express = require('express');
const database = require('../config/database');
const router = express.Router();
const upload = require('../config/multer');

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
    console.log(results);
    res.render('galeri', { data: results, kategori,
    loggedIn: req.session.user ? true : false
  });
  });
});
router.get('/login',(req,res) => {
  res.render('login');
});

router.post('/login', (req, res) => {
  const { username, pasword } = req.body;
  const query = 'SELECT * FROM users WHERE username = ? AND pasword = ?';
  database.query(query, [username, pasword], (err, results) => {
    if (err) throw err;
    console.log('Results:', results); // Debug
    if (results.length > 0) {
      req.session.user = results[0];
      res.redirect('/admin');
    } else {
      res.send('Login gagal');
    }
  });
});

router.get('/admin', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  const query = 'SELECT * FROM objek';
  database.query(query, (err, results) => {
    if (err) throw err;
    res.render('admin', { data: results });
  });
});

router.get('/admin/tambah', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  const query = 'SELECT * FROM catgori';
  database.query(query, (err, results) => {
    if (err) throw err;
    res.render('tambah', { catgori: results });
  });
});

router.post('/admin/tambah', upload.fields([{ name: 'image' }, { name: 'audio' }]), (req, res) => {
  const { nama,deskripsi, kategori_id } = req.body;
  const image = req.files['image'][0].filename;
  const audio = req.files['audio'][0].filename;
  const query = 'INSERT INTO objek (nama, image, audio, kategori_id) VALUES (?, ?, ?, ?)';
  database.query(query, [nama, image, audio, kategori_id], (err) => {
    if (err) throw err;
    res.redirect('/admin');
  });
});
router.post('/admin/delete/:id', (req , res)=>{
  const id = req.params.id;
  const query = 'DELETE FROM objek WHERE id=?';
  database.query(query, [id],(err)=>{
    if (err) throw err;
    res.redirect('/admin');
  });
});
router.post('/admin/edit/;id',(req, res)=>{
  const id = req.params.id;
  database.query(database.query, [id],(err)=>{
    if(err) throw err;
    res.redirect('/admin');
  });
});

module.exports = router;