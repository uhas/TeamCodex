var churchmodel = require('../model/churchmodel');
var ministrymodel = require('../model/ministrymodel.js');
var skillsmodel = require('../model/skillsmodel.js');
var session = require('client-sessions');
var express = require('express');
var http = require('http');
var bcrypt = require('bcrypt');
var router = express.Router();
var current;

//****** ROUTES FOR DIFFERENT PAGES (USING GET REQUESTS)********/

//*Redirects to the index page 
router.get('/', function (req, res) {
  res.render('index');
});
//*Redirects to the ADMIN Main page 
router.get('/admin', function (req, res) {
  res.render('admin');
});
//*Redirects to the Adimins Ministry view page 
router.get('/adminViewMinistry', function (req, res) {
  res.render('adminViewMinistry');
});
//*Redirects to the Adimins Inactive Ministry view page 
router.get('/adminInactiveMinistries', function (req, res) {
  res.render('adminInactiveMinistries');
});
//*Redirects to the Adimins Delete Ministry view page 
router.get('/adminDeleteMinistry', function (req, res) {
  res.render('adminDeleteMinistry');
});
//*Redirects to the Adimins skill view page 
router.get('/adminViewSkills', function (req, res) {
  res.render('adminViewSkills');
});
//*Redirects to the Adimins Delete skills view page 
router.get('/adminDeleteSkills', function (req, res) {
  res.render('adminDeleteSkills');
});
//*Redirects to the Adimins Delete users page 
router.get('/adminDeleteUser', function (req, res) {
  res.render('adminDeleteUser');
});
//*Redirects to contact page 
router.get('/contact', function (req, res) {
  res.render('contact');
});
//*Redirects to the ministry survey page 
router.get('/ministrySurvey', function (req, res) {
  res.render('ministrySurvey');
});
//*Redirects to the ministry survey page (???----Currently is not being used-----???)
router.get('/manageUser', function (req, res) {
  res.render('manageUser');
});
//*Redirects to the Events page (???----Currently is not being used-----???)
router.get('/events', function (req, res) {
  res.render('events');
});
//*Redirects to the ministry page
router.get('/ministry', function (req, res) {
  res.render('ministry');
});
    // router.get('/skillSurvey',function(req,res){
    //   res.render('skillSurvey');
    // });
    //Redirects to the ministry2 page (???----Currently is not being used-----???)
router.get('/ministry2', function (req, res) {
  res.render('ministry2');
});
//*Redirects to the ministry3 page (???----Currently is not being used-----???)
router.get('/ministry3', function (req, res) {
  res.render('ministry3');
});
//*Redirects to ADMINS Create newUser page
router.get('/newuser', function (req, res) {
  res.render('newuser');
});
//*Redirects to ADMINS Create Ministry page
router.get('/newministry', function (req, res) {
  res.render('newministry');
});
//*Redirects to Password reset page (???----Currently is not connected-----???)
router.get('/passwordreset', function (req, res) {
  res.render('Passwordreset');
});
//*Redirects to Ministry lead User page (???----Currently is not connected[may not need it anyway!!]-----???)
router.get('/Min_Lead', function (req, res) {
  res.render('Min_Lead');
});
//*Redirects to ADMINS Create New Skill page
router.get('/newskill', function (req, res) {
  res.render('newskill');
});
//*Redirects to Login Page
router.get('/login', function (req, res) {
  res.render('login', {
    errorMessage: ""
  });
});
//*Redirects to parishioner page with the given ID
router.get('/parishioner/:id', function (req, res) {
  console.log('call for parishioner');
  let id = req.params.id;

  res.render('parishioner', {
    user: current
  });
});
//*Redirects to minsitries page which gets all the ministrys from database
router.get("/allministries", function (req, res) {
  ministrymodel.find({}, ["minisrtyname"], function (err, results) {
    console.log("minsitries", results);
    res.render("ministries", { ministrylist: results });
  });
});

//*Redirects to minsitry page which gets a specific ministry with a specific id
router.get("/ministry/:id", function (req, res) {
  ministrymodel.findOne({ _id: req.params.id }, function (err, result) {
    if (!err) {
      res.render("ministry", { ministry: result });
    }
  });
});
//*Redirects to skills page which gets all the skills from database
router.get("/allskills", function (req, res) {
  skillsmodel.find({}, ["Skill_Name", "Skill_Category"], function (err, results) {
    console.log("skills", results);
    res.render("skillSurvey", { skillslist: results });
  });
});

//*Redirects to deletskills page which is used to delet a skill from database
router.get("/deleteskills", function (req, res) {
  skillsmodel.find({}, ["Skill_Name", "Skill_Category"], function (err, results) {
    console.log("skillses", results);
    res.render("adminDeleteSkills", { skillslist: results });
  });
});
//*Redirects to ministry survay page which gets all the ministries from database
router.get("/ministriessurvey", function (req, res) {
  ministrymodel.find({}, ["minisrtyname"], function (err, results) {
    console.log("minsitries", results);
    res.render("ministrySurvey", { ministrylist: results });
  });
});


//****** ROUTES FROM DIFFERENT PAGES TO DATABASE (USING POST REQUESTS)********/
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

//* Sending New users data from newuser page to Database
router.post("/newuser", function (req, res) {
  console.log(req.body);

  var user = new churchmodel();
  Parishionerid = req.body.pid;

  var password = req.body.password;
  bcrypt.hash(password, saltRounds, function (err, hash) {
    // Store hash in your password DB.
  });

  churchmodel.find({ PID: Parishionerid }, function (err, results) {
    if (results.length > 0) {

      console.log('parishioner id already exists');
      res.render("newuser");
    }

    else {
      user.PID = req.body.pid;
      user.username = req.body.username;
      user.Firstname = req.body.fname;
      user.Lastname = req.body.lname;
      user.Email = req.body.email;
      user.Password = req.body.password;

      user.save(function (err, result) {
        if (!err) {
          console.log("User created successfully");
          res.render("newuser");
        }

        else {
          console.log(err);
        }
      });
    }
  });
});

//* Sending Users Login data from login page to Database
router.post('/login', function (req, res) {
  console.log(req.body);
  let id = req.params.id;
  var username = req.body.uname;
  current = username;
  var password = req.body.psw;

  churchmodel.find({ Email: username, Password: password }, [], function (err, results) {
    if (!results.length) {
      // $("#abc").html("incorrect password");
      req.session.user = user;
      res.render('login', {
        errorMessage: "Please Enter Valid Entries"
      });


    } else {
      res.render("parishioner", { parishioner: results });
      // let id = req.params.id;
      // console.log("details are"+results);
      //return next();
    }
  });
});

//* Sending New Ministry data from newministry page to Database
router.post("/newministry", function (req, res) {
  // console.log(req.body);
  var ministry = new ministrymodel();
  let m_name = req.body.Mname;

  ministrymodel.find({ minisrtyname: m_name }, function (err, results) {

    if (results.length > 0) {
      console.log("Ministry already exists");
    }
    else {
      // ministry. = req.body.pid;
      // ministry.ministryid = rand;
      ministry.minisrtyname = req.body.Mname;
      ministry.lead = req.body.m_lead;
      ministry.mission = req.body.mission;
      ministry.description = req.body.description;
      ministry.save(function (err, result) {
        if (!err) {

          console.log("Ministry created successfully");
          res.render('newministry', {
            Message: "Ministry created successfully"
          })
        }
        else {
          console.log(err);
        }
      });
    }
  });
});

            // var cheerio = require('cheerio'),
            // $ = cheerio.load('file.ejs'),
            // fs = require('fs');

//* Sending New skill data from newskill page to Database
router.post("/newskill", function (req, res) {
  console.log(req.body);
  var skill = new skillsmodel();
  let skillname = req.body.sname;
  let skillcat = req.body.cat1;
  console.log(req.body.selectpicker);

  skillsmodel.find({ Skill_Name: skillname }, function (err, results) {
    if (results.length > 0) {

      console.log(req.body.selectpicker);

    }

    else {
      // ministry. = req.body.pid;
      // ministry.ministryid = rand;
      skill.Skill_Name = req.body.sname;
      skill.Skill_Category = req.body.cat1;
      // skill.Cat_Id = req.body.mission;
      // skill.skill_Id =  req.body.description;


      skill.save(function (err, result) {
        if (!err) {

          console.log("skill created successfully");
          res.render('newskill')
        }
        else {
          console.log(err);
        }
      });
    }

  });

});



module.exports = router;
