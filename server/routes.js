var  churchmodel=require('../model/churchmodel');
var  ministrymodel=require('../model/ministrymodel.js');

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
  // router.get('/ministries',function(req,res){
  //   res.render('ministries');
  // });
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
  Parishionerid = req.body.pid;
   
    

  churchmodel.find({PID:Parishionerid}, function(err,results){
    if(results.length>0){
       
    console.log('parishioner id already exists');
    res.render("newuser");
  }
      
  else {
    user.PID = req.body.pid;
    user.username  = req.body.username;
    user.Firstname  = req.body.fname;
    user.Lastname = req.body.lname;
    user.Email =  req.body.email;
    user.Password = req.body.password;
  
      user.save(function(err, result){
          if(!err){
            console.log("User created successfully");
            res.render("newuser"); }
           
          else{
          console.log(err);
              }
            });
        }
   });
 });




  router.post('/login', function(req,res){
  var username=req.body.uname;
current=username;
  var password=req.body.psw;

    churchmodel.find({username:username, Password:password},["Firstname","Lastname","Email","skills","ministries"], function(err,results){
      if(!results.length){
    // $("#abc").html("incorrect password");
        res.render('login',{
          errorMessage: "Please Enter Valid Entries"
        });


      } else
        res.render("parishioner", {parishioner: results});
        console.log("datails are"+results);
      
    });
  });

  router.get('/parishionerdata', function(req,res){
    // console.log('call for parishioner');


    res.render('parishioner',{
      user:current
    });
  });

router.post("/newministry", function(req,res){
  // console.log(req.body);
  var ministry = new ministrymodel();
  let m_name = req.body.Mname;

 
  

  ministrymodel.find({minisrtyname:m_name}, function(err,results){
    if(results.length>0){
     
      console.log("Ministry already exists");
      

}
    
    else {
      // ministry. = req.body.pid;
      // ministry.ministryid = rand;
      ministry.minisrtyname  = req.body.Mname;
      ministry.lead  = req.body.m_lead;
      ministry.mission = req.body.mission;
      ministry.description =  req.body.description;
     

      ministry.save(function(err, result){
        if(!err){
          
          console.log("Ministry created successfully"); 
          res.render('newministry')
          }
        else{
        console.log(err);
            }
          });
      }

  });

  

});





router.get("/allministries", function(req,res){
  ministrymodel.find({}, ["minisrtyname"] , function(err, results){
      console.log("minsitries", results);
      res.render("ministries", {ministrylist: results});
  });
});


router.get("/ministry/:id", function(req, res){
   ministrymodel.findOne({_id: req.params.id}, function(err,result){
      if(!err){
          res.render("ministry", {ministry:result});
      }
  });
});



module.exports=router ;
