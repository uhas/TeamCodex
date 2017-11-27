var mongoose=require('mongoose');

var churchloginschema=mongoose.Schema({
  PID:{type: String, unique: true },
  username:{type: String, unique: true},
  Firstname:{type: String},
  Lastname:{type: String},
  Email:{type:String},
  Phone:{type:String},
  Password:{type:String, unique: true},
  skills:{type:String},
  ministries:{type:String}
});

// var churchdata= new churchloginschema({
//   username : "sandeep",
//   password: "1234"
// });


module.exports=mongoose.model('Chuchlogin', churchloginschema);
