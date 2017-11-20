var  churchmodel=require('../model/churchmodel');
var express=require('express');
var router=express.Router();
var current;


  router.get('/',function(req,res){
    res.render('index');
  });
  // router.get('/parishioner',function(req,res){
  //   res.render('parishioner');
  // });
  router.get('/admin',function(req,res){
    res.render('admin');
  });
  router.get('/adminViewMinistry',function(req,res){
    res.render('adminViewMinistry');
  });
  router.get('/adminDeleteMinistry',function(req,res){
    res.render('adminDeleteMinistry');
  });
  router.get('/adminViewSkills',function(req,res){
    res.render('adminViewSkills');
  });
  router.get('/adminDeleteSkills',function(req,res){
    res.render('adminDeleteSkills');
  });
  router.get('/adminDeleteUser',function(req,res){
    res.render('adminDeleteUser');
  });
  router.get('/contact',function(req,res){
    res.render('contact');
  });
  router.get('/ministries',function(req,res){
    res.render('ministries');
  });
  router.get('/ministrySurvey',function(req,res){
    res.render('ministrySurvey');
  });
   router.get('/manageUser',function(req,res){
    res.render('manageUser');
  });
  router.get('/events',function(req,res){
    res.render('events');
  });
  router.get('/ministry',function(req,res){
    res.render('ministry');
  });
  router.get('/skillSurvey',function(req,res){
    res.render('skillSurvey');
  });
  router.get('/ministry2',function(req,res){
    res.render('ministry2');
    });
    router.get('/admin',function(req,res){
      res.render('admin');
});
router.get('/newuser',function(req,res){
  res.render('newuser');
});

router.get('/newministry',function(req,res){
  res.render('newministry');
});
router.get('/passwordreset',function(req,res){
  res.render('Passwordreset');
});
router.get('/ministry3',function(req,res){
  res.render('ministry3');
});
router.get('/Min_Lead',function(req,res){
  res.render('Min_Lead');
});
router.get('/Min_Lead',function(req,res){
  res.render('Min_Lead');
});
router.get('/newskill',function(req,res){
  res.render('newskill');
});

  router.get('/login', function(req,res){
    res.render('login',{
      errorMessage: ""
    });
  });


  router.post("/newuser", function(req,res){
    console.log(req.body);
    var user = new churchmodel();
    user.PID = req.body.pid;
    user.username  = req.body.username;
    user.Firstname  = req.body.fname;
    user.Lastname = req.body.lname;
    user.Email =  req.body.email;
    user.Password = req.body.password;

   
    user.save(function(err, result){
         if(!err){
         res.log("User created successfully"); }
         else{
         console.log(err);
     }
     });

 });




  router.post('/login', function(req,res){
    console.log('hello');
  console.log(req.body.uname);
  var username=req.body.uname;
current=username;
  var password=req.body.psw;

    churchmodel.find({username:username, password:password}, function(err,results){
      if(!results.length){
    // $("#abc").html("incorrect password");
        res.render('login',{
          errorMessage: "Please Enter Valid Entries"
        });


      } else if(docs.length>0){
        res.render("/parishioner", {tasks: results});
      }
    });
  });

  router.get('/parishioner', function(req,res){
    // console.log('call for parishioner');


    res.render('parishioner',{
      user:current
    });
  });

// var churchdata= new churchmodel({
//   username : "bhavishya",
//   password: "abcd"
// });
//
// churchdata.save(function(err,result){
//   if(err){
//     console.log(err);
//   } else{
//     console.log("success");
//     res.send("sandeep has been added");
//   }
// });



module.exports=router ;
