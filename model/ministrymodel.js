var mongoose=require('mongoose');

var ministryschema=mongoose.Schema({
  ministryid:{
    type: String
  },
  minisrtyname:{
    type: String
  },
  welcomenote:{
    type:String
  },
  mission:{
    type:String
  },
  description:{
    type:String
  }

});

// var churchdata= new churchloginschema({
//   username : "sandeep",
//   password: "1234"
// });


module.exports=mongoose.model('ministrydata', ministryschema);
