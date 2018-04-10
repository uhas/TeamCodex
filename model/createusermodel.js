var mongoose=require('mongoose');

var churchloginschema=mongoose.Schema({
    PID:{type: String, unique: true },
    Firstname:{type: String},
    Lastname:{type: String},
    Address:{type: String},
    Email:{type:String},
    Phone:{type:String},
    password:{type:String},
    skills:{type:String},
    ministries:{type:String}
});

// var churchdata= new churchloginschema({
//   username : "sandeep",
//   password: "1234"
// });


module.exports=mongoose.model('Chuchlogin', churchloginschema);

