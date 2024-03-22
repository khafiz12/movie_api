const mongoose = require ("mongoose");
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

  let Movie = mongoose.model('Movie', movieSchema);

  let User = mongoose.model('User', userSchema);

   module.exports.Movie = Movie;
   module.exports.User = User;
