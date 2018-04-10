var mongoose=require('mongoose');

var ministryschema=mongoose.Schema({
  ministryid:{
    type: String
  },
  minisrtyname:{
    type: String
  },
  lead:{
    type:String
  },
  mission:{
    type:String
  },
  description:{
    type:String
  },
  status:{
    type:String
  }

});

// var churchdata= new churchloginschema({
//   username : "sandeep",
//   password: "1234"
// });


module.exports=mongoose.model('ministriesdata', ministryschema);
