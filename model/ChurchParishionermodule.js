//created for sessions
var mongoose=require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = mongoose.Schema({
    PID: {
        type: String,
         unique: true 
    },
    // username:{
    //     type: String, 
    //     unique: true
    // },
    Firstname:{
        type: String
    },
    Lastname:{
        type: String
    },
    Address:{
        type: String
    },
    Email:{
        type:String
    },
    Phone:{
        type:String
    },
    password:{
        type:String
    },
    skills:{
        type:String
    },
    ministries:{
        type:String
    }
});


//authenticate input against database
UserSchema.statics.authenticate = function (email, password, callback) {
    Users.findOne({ Email: email })
      .exec(function (err, users) {
        if (err) {
          return callback(err)
        } else if (!users) {
          var err = new Error('User not found.');
          err.status = 401;
          return callback(err);
        }

        if(users.password==password)
        {

            return callback(null, users);
        }
        else {
            return callback();
         }
        // bcrypt.compare(password, users.password, function (err, result) {
        //   if (result === true) {
        //     return callback(null, users);
        //   } else {
        //     return callback();
        //   }
        // })
      });
  }



var Users = mongoose.model('users', UserSchema);
module.exports = Users;