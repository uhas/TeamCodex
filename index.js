// var cool = require('cool-ascii-faces')
var express = require('express');
var app = express();
var pg = require('pg');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/ministries', function(request, response) {
  response.render('pages/ministries');
});
app.get('/admin', function(request, response) {
  response.render('pages/admin');
});

app.get('/newministry', function(request, response) {
  response.render('pages/newministry');
});

app.get('/events', function(request, response) {
  response.render('pages/events');
});

app.get('/parishioner', function(request, response) {
  response.render('pages/parishioner');
});

app.get('/ministry', function(request, response) {
  response.render('pages/ministry');
});

app.get('/contact', function(request, response) {
  response.render('pages/contact');
});

app.get('/login', function(request, response) {
  response.render('pages/login');
});

app.get('/new', function(request, response) {
  response.render('pages/new');
});

app.get('/tests', function(request, response) {
  response.render('pages/tests');
});

app.get('/ministrySurvey', function(request,response){
	response.render('pages/ministrySurvey');
});

app.get('/skillSurvey', function(request,response){
	response.render('pages/skillSurvey');
});
app.get('/Min_Lead', function(request,response){
	response.render('pages/Min_Lead');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

app.get('/ministry2', function(request,response){
	response.render('pages/ministry2');
});

app.get('/newuser', function(request,response){
	response.render('pages/newuser');
});


app.get('/ministry3', function(request,response){
	response.render('pages/ministry3');
});

app.get('/Passwordreset', function(request,response){
	response.render('pages/Passwordreset');
});


// app.get('/cool',function(request, response){
//   response.send(cool());
// })

// app.get('/times', function(request, response) {
//   var result = ''
//   var times = process.env.TIMES || 5
//   for (i=0; i < times; i++)
//     result += i + ' ';
// response.send(result);
// });
