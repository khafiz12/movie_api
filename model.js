//require mongoose to tranlate mongodb data to javascript//
const mongoose = require ('mongoose');
//require bcrypt module to hash User username and password// 
const bcrypt = require('bcrypt');
//const { __esModule } = require("uuid");// Not sure why this was auto added. 
// this is the model used for movies collection// 
let movieSchema = mongoose.Schema({ 
     title:{type: String, required: true},

     description:{ type: String, required: true},

     genre: {
        name: String,
        description: String
     },

     director:{
        name: String,
        bio: String
     },

     imageurl: String,

     featured: Boolean
  });

  //this is the model used for users collection//
  let userSchema = mongoose.Schema({ 

    Username:{type: String, required: true},

    Password:{type: String, required: true},

    Email: {type: String, required: true},

    Birthday: Date,

    Favoritemovies:[{type: mongoose.Schema.Types.ObjectId, ref:'movie' }] 

  });

  userSchema.statics.hashPassword = (password) => {
   return bcrypt.hashSync(password, 10);
  };

  userSchema.methods.validatePassword = function (password) {
   return bcrypt.compareSync(password, this.Password);
  };

  let Movie = mongoose.model('Movie', movieSchema);

  let User = mongoose.model('User', userSchema);

   module.exports.Movie = Movie;
   module.exports.User = User;
