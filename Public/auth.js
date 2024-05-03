const jwtSecret = 'your_jwt_secret';
const jwt = require('jsonwebtoken'),
passport = require('passport');
const { model } = require('mongoose');//
const bcrypt = require('bcrypt');
const cors = require('cors');
require('./passport.js');
const User = require('./model.js').User;//

//Produce JWT Token//
let generateJWTToken = (user) => {
    return jwt.sign(user, jwtSecret, { 
        subject: user.Username, 
        expiresIn: '7d',
        algorithm: 'HS256'
    });
   };

//
module.exports = (router) => {
    router.use(cors());
    router.post('/login', passport.authenticate('local', { session: false}), 
    (req,res) => { if(!req.user) {
        return res.status(400).json({
            message:"Something is not right with code",
            user: req.user
        });
     } 
    
      let token = generateJWTToken(req.user.toJSON());
      return res.json({user: req.user, token});
  }); 
       
}