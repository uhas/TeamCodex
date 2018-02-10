var  churchmodel=require('../model/churchmodel');
var  ministrymodel=require('../model/ministrymodel.js');
var skillsmodel = require('../model/skillsmodel.js');
var session = require('client-sessions');
 // using Version 5.4.1
//  var jsdom = require('jsdom').jsdom;
// //  var document = jsdom('<html></html>', {});
//  var window = document.defaultView;
//  var $ = require('jquery')(window);
var express=require('express');
var http = require('http');
const app = express();
var bcrypt = require('bcrypt');
const mongoClient = require('mongodb').MongoClient,
  assert = require('assert');
// const url = 'mongodb://localhost:27017/churchdb';
// mongoClient.connect(url, (err, db) => {
//   assert.equal(null, err);

//   console.log("Connected correctly to server");

//   insertDocuments(db, function () {
//     db.close();
//   });
// });
// var categoryfun = require('../views/pages/newskill.ejs')findCat();
var router=express.Router();
var current;


  router.get('/',function(req,res){
    res.render('index');
  });
  // router.get('/parishioner',function(req,res){
  //   res.render('parishioner');
  // });

//Session
  // routes.use(session({
  //   cookieName: 'session',
  //   secret: 'random_string_goes_here',
  //   duration: 30 * 60 * 1000,
  //   activeDuration: 5 * 60 * 1000,
  // }));


  router.get('/admin',function(req,res){
    res.render('admin');
  });
  router.get('/import',function(req,res){
    res.render('import');
  });
  router.get('/adminViewMinistry',function(req,res){
    res.render('adminViewMinistry');
  });
  router.get('/adminInactiveMinistries',function(req,res){
    res.render('adminInactiveMinistries');
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
  // router.get('/skillSurvey',function(req,res){
  //   res.render('skillSurvey');
  // });
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

//use sessions for tracking logins
// app.use(session({
//   secret: 'work hard',
//   resave: true,
//   saveUninitialized: false
// }));



const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';


router.post("/newuser", function(req,res){
  console.log(req.body);
  var user = new churchmodel();
  Parishionerid = req.body.pid;
   
  var password = req.body.password;
  bcrypt.hash(password, saltRounds, function(err, hash) {
    // Store hash in your password DB.
  });
  

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



 router.post('/import',function(req,res){
  // res.render('admin');
  let filepath=req.body.file;
  res.render('import1')
});
  router.post('/login', function(req,res){
    let id = req.params.id;
  var username=req.body.uname;
current=username;
  var password=req.body.psw;

    churchmodel.find({Email:username, Password:password},[], function(err,results){
      if(!results.length){
    // $("#abc").html("incorrect password");
    req.session.user = user;
        res.render('login',{
          errorMessage: "Please Enter Valid Entries"
        });


      } else
      {
        // let id = req.params.id;
        // res.render("parishioner", {parishioner: results});
        // console.log("details are"+results);
        return next();
      }
    });
  });

  router.get('/parishioner/:id', function(req,res){
    // console.log('call for parishioner');
    let id = req.params.id;

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
          res.render('newministry',{
            Message: "Ministry created successfully"
            })
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







// var cheerio = require('cheerio'),
// $ = cheerio.load('file.ejs'),
// fs = require('fs');



router.post("/newskill", function(req,res){
  // console.log(req.body);
  var skill = new skillsmodel();
  let skillname = req.body.sname;
let skillcat = req.body.cat1;
  console.log(req.body.selectpicker);
  

  skillsmodel.find({Skill_Name:skillname}, function(err,results){
    if(results.length>0){
     
      console.log(req.body.selectpicker);
      

}
    
    else {
      // ministry. = req.body.pid;
      // ministry.ministryid = rand;
      skill.Skill_Name  = req.body.sname;
      skill.Skill_Category  = req.body.cat1;
      // skill.Cat_Id = req.body.mission;
      // skill.skill_Id =  req.body.description;
     

      skill.save(function(err, result){
        if(!err){
          
          console.log("skill created successfully"); 
          res.render('newskill')
          }
        else{
        console.log(err);
            }
          });
      }

  });

  

});

router.get("/allskills", function(req,res){
  skillsmodel.find({}, ["Skill_Name","Skill_Category"] , function(err, results){
      console.log("skills", results);
      res.render("skillSurvey", {skillslist: results});
  });
});


router.get("/deleteskills", function(req,res){
  skillsmodel.find({}, ["Skill_Name","Skill_Category"] , function(err, results){
      console.log("skillses", results);
      res.render("adminDeleteSkills", {skillslist: results});
  });
});

router.get("/ministriessurvey", function(req,res){
  ministrymodel.find({}, ["minisrtyname"] , function(err, results){
    console.log("minsitries", results);
    res.render("ministrySurvey", {ministrylist: results});
  });
});

module.exports=router ;
