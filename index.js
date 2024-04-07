const express = require('express');
const app = express();
const db = require('./models');
const cors = require('cors');


app.use(express.json());
app.use(cors());

//showing image
app.use(express.static('public/Gambar'));

const produkRoute = require('./routes/Produk');
app.use('/produks', produkRoute);


db.sequelize.sync().then(()=>{
    app.listen(3001, ()=>{
        console.log("Server berjalan pada port 3001");
    })
});