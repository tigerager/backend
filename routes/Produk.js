const express = require('express');
const router = express.Router();
const { Produk } = require('../models');
const multer = require('multer');
const path = require('path');



router.get('/', async (req, res)=>{
    const getAllProduk = await Produk.findAll();
    res.json(getAllProduk);
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/Gambar')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage
});

router.post('/registerProduk', upload.single('gambar'), async (req, res) => {
    const {tipe_produk, nama_produk, jumlah} = req.body;
        try{
            await Produk.create({
                nama_produk: nama_produk,
                tipe_produk: tipe_produk,
                jumlah: jumlah,
                gambar: req.file.filename,
            });
            res.json("SUCCESS");
        }
        catch (err){
            res.json(err);
        }
})

module.exports = router;