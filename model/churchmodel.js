var mongoose=require('mongoose');

var churchloginschema=mongoose.Schema({
  PID:{type: String, unique: true },
  Firstname:{type: String},
  Lastname:{type: String},
  Email:{type:String},
  Phone:{type:String},
  Address:{type:String},
  Password:{type:String},
  usertype:{type:String},
  skills:[String],
  ministries:[String]
});

// var churchdata= new churchloginschema({
//   username : "sandeep",
//   password: "1234"
// });


module.exports=mongoose.model('Chuchlogin', churchloginschema);
