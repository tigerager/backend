const express = require('express');
const app = express();
const db = require('./models');
const cors = require('cors');
//const session = require('express-session');
const {validateToken} = require('./middlewares/AuthMiddleware');
const cookieParser = require('cookie-parser');
app.use(cookieParser('tokenrahasia'));
app.use(express.json());
app.use(cors());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
//showing image
app.use(express.static('public/Gambar'));
// app.use(session({
//     secret: 'tokenrahasia',
//     resave: true,
//     saveUninitialized: true,
//   }));
const produkRoute = require('./routes/Produk');
app.use('/produks', validateToken, produkRoute);
const usersRouter = require('./routes/Users');
app.use('/users', usersRouter);
db.sequelize.sync().then(()=>{
    app.listen(3001, ()=>{
        console.log("Server berjalan pada port 3001");
    })
});