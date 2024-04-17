const { verify } = require('jsonwebtoken');

const validateToken = (req, res, next) => {
    const accessToken = req.headers.token;

    if(!accessToken) return res.json("User not logged in");

    try{
        const validToken = verify(accessToken, "tokenrahasia");
        if(validToken){
            return next();
        }
    }catch (err){
        return res.json(err);
    }
}

module.exports = {validateToken}