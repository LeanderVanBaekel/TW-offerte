var express = require('express');
var path = require('path');
var jsonQuery = require('json-query');
var bodyParser = require('body-parser');
var multer  = require('multer');
var session = require('express-session');
var FileStore = require('session-file-store')(session);

var app = express();

app.set('port', (process.env.PORT || 5000));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'heeel moeilijk wachtwoord', // CHANGE THIS!!!
  store: new FileStore(),
  saveUninitialized: true,
  resave: false
}));

app.use(bodyParser.urlencoded({extended: true}));

app.use(multer({
  dest: './uploads/'
}));


var homeRouter = require('./routes/home');
app.use('/', homeRouter);

var offerteRouter = require('./routes/offerte');
app.use('/offerte', offerteRouter);


var accountRouter = require('./routes/accounts');
app.use('/accounts', accountRouter);




app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});