var mongoose=require('mongoose');

var churchloginschema=mongoose.Schema({
  username:{
    type: String
  },
  password:{
    type:String
  }
});

// var churchdata= new churchloginschema({
//   username : "sandeep",
//   password: "1234"
// });


module.exports=mongoose.model('Chuchlogin', churchloginschema);
