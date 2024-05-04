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
    router.post('/login', (req,res) => { 
        passport.authenticate('local', { session: false },
        (error, user, info) => {
            if (error) {
                console.error('Error during authentication:', error);
                return res.status(500).json({ message: 'Internal server error'});
               } 
            if(!user){ 
              console.error('User not found');
              return res.status(401).json({ message: 'Unauthorized'});  
            }
           req.login(user,{ session:false}, (error) => {
             if (error){ 
                console.error('Error during login:', error);
                return res.status(500).json({ message:'Internal server error'});
             }
             let token = generateJWTToken(user.toJSON());
             return res.json({user, token});
           }); 
         }) (req,res);
       });
      };