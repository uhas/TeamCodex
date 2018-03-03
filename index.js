var http = require('http');
var path = require('path');
var express = require('express');
var ejs=require('ejs');
var mongoose = require('mongoose');
var session = require('express-session');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var cookieParser = require('cookie-parser');
const flash = require('express-flash');
var MongoStore = require('connect-mongo')(session);

var app = express();

var routes=require('./server/routes');


app.locals.pretty = true;
app.set('port', process.env.PORT || 3030);
// app.set('views', __dirname + '/app/server/views');

// my new code
app.set('views', path.join(__dirname, 'views/pages'));

// end of my code
app.set('view engine', 'ejs');


var dbURL = 'mongodb://sandeep:bunty@ds151528.mlab.com:51528/teamcodex';

mongoose.connect(dbURL, { useMongoClient: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'dbURL connection error:'));

// mongoose.connect(dbURL);
// var db = mongoose.connection;
// app.use(session({
//     secret: 'work hard',
//     resave: true,
//     saveUninitialized: false,
//     store: new MongoStore({
//       mongooseConnection: db
//     })
//   }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('stylus').middleware({ src: __dirname + '/app/public' }));
app.use(express.static(__dirname + '/public'));



// var dbURL='mongodb://'+dbHost+':'+dbPort+'/'+dbName;

// require('./app/server/routes')(app);
// require('./app/server/routes');

console.log('before calling routes');
app.use('/', routes);

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});

//use sessions for tracking logins

// app.get('/', function(request, response) {
//   response.render('pages/index');
// });
//
// app.get('/ministries', function(request, response) {
//   response.render('pages/ministries');
// });
// app.get('/admin', function(request, response) {
//   response.render('pages/admin');
// });
//
// app.get('/events', function(request, response) {
//   response.render('pages/events');
// });
//
// app.get('/parishioner', function(request, response) {
//   response.render('pages/parishioner');
// });
//
// app.get('/ministry', function(request, response) {
//   response.render('pages/ministry');
// });
//
// app.get('/contact', function(request, response) {
//   response.render('pages/contact');
// });
//
// app.get('/login', function(request, response) {
//   response.render('pages/login');
// });
//
// app.get('/new', function(request, response) {
//   response.render('pages/new');
// });
//
// app.get('/tests', function(request, response) {
//   response.render('pages/tests');
// });
//
// app.get('/ministrySurvey', function(request,response){
// 	response.render('pages/ministrySurvey');
// });
//
// app.get('/skillSurvey', function(request,response){
// 	response.render('pages/skillSurvey');
// });
// app.get('/Min_Lead', function(request,response){
// 	response.render('pages/Min_Lead');
// });
//
// app.listen(app.get('port'), function() {
//   console.log('Node app is running on port', app.get('port'));
// });
//
// app.get('/ministry2', function(request,response){
// 	response.render('pages/ministry2');
// });
