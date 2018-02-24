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
var bcrypt = require('bcrypt');
// var categoryfun = require('../views/pages/newskill.ejs')findCat();
var router=express.Router();
var current;
var Users = require('../model/ChurchParishionermodule');//For Sessions

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
  router.get('/Ministrytest',function(req,res){
    res.render('Ministrytest');
    });

  router.get('/ministry2',function(req,res){
    res.render('ministry2');
    });
    router.get('/admin',function(req,res){
      res.render('admin');
});
router.get('/newuser', function(req,res){
  res.render('newuser',{
    errorMessage1: ""
  });
});

router.get('/newministry', function(req,res){
  res.render('newministry',{
    errorMessage2: ""
  });
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
router.get('/chart',function(req,res){
  res.render('chart')
});

router.get('/newskill', function(req,res){
  res.render('newskill',{
    errorMessage3: ""
  });
});
router.get('/adminprofile',function(req,res){
  res.render('adminprofile');
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
            res.render('newuser',{
              errorMessage1: "User created successfully"
            });
          }
           
          else{
          console.log(err);
              }
            });
        }
   });
 });


//post method for login 

  router.post('/login', function(req,res){
    let id = req.params.id;
  var username=req.body.uname;
current=username;
  var password=req.body.psw;

    churchmodel.find({Email:username, Password:password},[], function(err,results){
      if(!results.length){
    // $("#abc").html("incorrect password");
   // req.session.user = user;
        res.render('login',{
          errorMessage: "Please Enter Valid Entries"
        });


      } else
      {
        // let id = req.params.id;
        res.render("parishioner", {parishioner: results});
        console.log("details are"+results);
        // return next();
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
            errorMessage2: "Ministry created successfully"
            });
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
          res.render('newskill',{
            errorMessage3: "Skill created successfully"
            });
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




router.get("/ministriessurvey", function(req,res){
  ministrymodel.find({}, ["minisrtyname"] , function(err, results){
    console.log("minsitries", results);
    res.render("ministrySurvey", {ministrylist: results});
  });
});

router.get("/inactiveministries", function(req,res){
  ministrymodel.find({}, ["minisrtyname"] , function(err, results){
    console.log("minsitries", results);
    res.render("adminInactiveMinistries", {ministrylist: results});
  });
});






//code to test surveypages viewministries

// router.post('/ministrytest',function(req,res){
//   // var parsed = JSON.parse(survey);
//   // console.log('Survey data:', parsed);
//   var mlist = req.body.ministry;
//   for(var i =0; i<mlist.length;i++){  console.log(mlist[i]);}

//   console.log(req.body.ministry);
//   // res.render("/skillSurvey")
//   // res.render('Ministrytest');
// });

//get method for delete skills
router.get("/deleteskills", function(req,res){
  skillsmodel.find({}, ["Skill_Name","Skill_Category"] , function(err, results){
      console.log("skills", results);
      res.render("adminDeleteSkills", {skillslist: results});
  });
});

router.post("/deleteskillsAdmin",function(req,res){
  var skillslist = req.body.scheckBox14;
  console.log(req.body.scheckBox14);
  // for(var i =0; i<skillslist.length;i++){  console.log(skillslist[i]);}
  for(var i =0; i<skillslist.length;i++){ 
    var myquery = { Skill_Name: skillslist[i] };
    skillsmodel.remove(myquery, function(err, obj) {
      if (err) throw err;
      console.log(obj.result.n + " document(s) deleted");
      // db.close();
  
  });  
  
  }

  console.log(req.body.scheckBox14);
console.log("still need to work/delete skills");
res.redirect('back');
});

router.post("/minsurvey",function(req,res){
  var mlist = req.body.ministry;
  for(var i =0; i<mlist.length;i++){  console.log(mlist[i]);}

  console.log(req.body.ministry);
console.log("still need to work//ministry survey");
res.redirect('back')
});

router.post("/updateskills",function(req,res){
  var skillslist = req.body.scheckBox14;
  for(var i =0; i<skillslist.length;i++){ 
    console.log(skillslist[i]);
  }

  console.log(req.body.scheckBox14);
console.log("still need to work//Skillsurvey");
});


//get method for skillsviewadmin
router.get("/skillsviewadmin", function(req,res){
  skillsmodel.find({}, ["Skill_Name","Skill_Category"] , function(err, results){
      console.log("skills", results);
      res.render("adminViewSkills", {skillslist: results});
  });
});


//post method for updateskills
router.post("/updateskills",function(req,res){
  var skillslist = req.body.scheckBox14;
  for(var i =0; i<skillslist.length;i++){ 
    console.log(skillslist[i]);
  }

  console.log(req.body.scheckBox14);
console.log("still need to work//Skillsurvey");
});


//post method for updateministries

router.post("/updateministries",function(req,res){
  var mlist = req.body.inacministry;
  for(var i =0; i<mlist.length;i++){ 
    console.log(mlist[i]);
  }

  console.log(req.body.inacministry);
console.log("still need to work//Skillsurvey");
});


//For Sessions***********************************************************************
//rout for creating a using sessionss
router.get('/SessionAdminCreatUser', function(req,res){
  res.render('SessionAdminCreatUser',{
    errorMessage1: ""
  });
});


//post request for creating user using sessions
router.post('/SessionAdminCreatUser', function (req, res, next) {
  // confirm that user typed same password twice
  if (req.body.password !== req.body.repassword) {
    var err = new Error('Passwords do not match.');
    err.status = 400;
    res.send("passwords dont match");
    return next(err);
  }

  if (req.body.pid&&
//    req.body.username&&
    req.body.fname&&
    req.body.lname&&
    req.body.email&&
    req.body.password&&
    req.body.repassword ) {

    var usersData = {
      PID: req.body.pid,
      username: req.body.username,
      Firstname: req.body.fname,
      Lastname: req.body.lname,
      Email: req.body.email,
      password: req.body.password,
    }

    Users.create(usersData, function (error, users) {
      if (error) {
        return next(error);
      } else {
        console.log("User created successfully");
        res.render('SessionAdminCreatUser',{
          errorMessage1: "User created successfully"
        });
      }
    });

  }
  else {
    var err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
})


//rout for sessionLogin Page***********************************************
router.get('/SessionLogin',function(req,res){

  res.render('SessionLogin',{
    errorMessage: ""
  });


});

//POST route for checking user data before login
router.post('/SessionLogin', function (req, res, next) {
if (req.body.uname && req.body.psw) //if both email and pasword gields are present
 {
    
  Users.authenticate(req.body.uname, req.body.psw, function (error, users) {
      if (error || !users) {

        res.render('SessionLogin',{
          errorMessage: "Please Enter Valid Entries"
        });
        // var err = new Error('Wrong email or password.');
        // err.status = 401;
        // return next(err);
      }
      else {

        req.session.userId = users._id;
      //  return res.redirect('/profile');

        res.render("sessionParishioner", {parishioner: users});// sessions code here was ' return res.redirect('/profile');'
        console.log("details are"+users);
      }
    });
  }
  else {
    var err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
})


router.get('/sessionParishioner',function(req,res){


  User.findById(req.session.userId)
    .exec(function (error, users) {
      if (error) {
        return next(error);
      } else {
        if (users === null) {
          var err = new Error('Not authorized! Go back!');
          err.status = 400;
          return next(err);
        } else {
          res.render('parishioner',{
            user:current
          });
        }
      }
    });
});


router.get('/logout', function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/SessionLogin');
      }
    });
  }
});
// End for sessions
//session internal test code
function requiresLogin(req, res, next) {
  if (req.session && req.session.userId) {
    return next();
  } else {
    var err = new Error('You must be logged in to view this page.');
    err.status = 401;
    return next(res.render('SessionLogin',{
      errorMessage: "You need to be logged in to access this page"
    })
  );
  }
}

router.get('/req',requiresLogin, function(req, res, next) {

  res.render('requireslog');
});

module.exports=router ;
