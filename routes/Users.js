const express = require('express');
const Router = express.Router();
const {Users} = require('../models');
const bcrypt = require('bcryptjs');
const {sign} = require('jsonwebtoken');

Router.get('/', async (req, res) => {
    const getAllUser = await Users.findAll();
    res.json(getAllUser);
    
})

Router.post('/register', async (req, res) => {
    const {username, password} = req.body;
    bcrypt.hash(password, 10).then(async (hash) => {
        await Users.create({
            username: username,
            password: hash,
        });
        res.json("SUCCESS");
    }).catch(err => res.json(err));
})

Router.post('/login',  async (req, res) => {
    const {username, password} = req.body;
    const user = await Users.findOne({where: {username: username}});
    if(!user) {
        res.json("User Doesn't Exist");
    }
    else{
    bcrypt.compare(password, user.password).then((match)=>{
        if(!match){
            res.json("Wrong username and password combination");
        }
        else{
            const accessToken = sign({username: user.username, id: user.id}, "tokenrahasia");
            res.send({token: accessToken, id: user.id});
        }
    });
}
});

Router.get('/logout', async (req, res)=>{
    res.clearCookie("accessToken");
    res.json("Berhasil logout")
})

Router.get('/setTokenhttponly/:id', async (req, res)=>{
    const id = req.params.id;
    const user = await Users.findOne({where: {id: id}});
    const accessToken = sign({username: user.username, id: user.id}, "tokenrahasia");
    res.cookie(
        'accessToken', accessToken, {
        httpOnly: true,
        maxAge: 60000,
        expires: 60000
    }
    ).send()
   
    
})

Router.get('/cek', async (req, res)=>{
    if(req.cookies.accessToken){
        res.json(req.cookies.accessToken)
    }else{
        res.json("tidak ada")
    }
})

module.exports = Router;