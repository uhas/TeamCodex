var mongoose=require('mongoose');

var Skillschema=mongoose.Schema({
    Skill_Name:{
    type: String
  },
  Skill_Category:{
    type: String
  },
  Cat_Id:{
    type:Number
  },
  skill_Id:{
    type:Number
  }

});

// var churchdata= new churchloginschema({
//   username : "sandeep",
//   password: "1234"
// });


module.exports=mongoose.model('Skills', Skillschema);
