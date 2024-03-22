const jwtSecret = 'your_jet_secret';
const jwt = require('jsonwebtoken'),
passport = require('passport');
require('./passport');

let generateJWTToken = (use) => {
    return jwt.sign(user, jwtSecret, { 
        subject: user.Username, 
        espiresIn: '7d',
        algorithm: 'HS256'
    });
   }

module.exports = (router) => {
    router.post('/login', (req,res) => {
        passport.authenticate('local', { session: false},
        (error, user, info) => {
            if (error || !user) {
                return res.status(400).json({
                    message: 'Something is not right',
                    user:user
                });
               } 
           req.login(user,{ sesssion:false}, (error) => {
             if (error){
                res.send(error);
             }
             let token = generateJWTToken(user.toJSON());
             return res.json({user, token});
           }); 
         })
       });
      }