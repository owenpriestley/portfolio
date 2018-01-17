var express = require('express')
  , logger = require('morgan')
  , app = express()
  , homepage = require('pug').compileFile(__dirname + '/source/templates/homepage.pug')

// API BUSINESS
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./config/db');

//tell server to use body-parser //
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/js/', express.static(__dirname + '/node_modules/'));

const port = process.env.PORT || 3000;

// connect to MongoDB //
MongoClient.connect(db.url, (err, database) => {
    if (err) return console.log(err)
    require('./routes')(app, database);
    console.log('Mongo Success')
//    app.listen(port, () => {
//        console.log('Stayin alive on port ' + port);
})


app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.static(__dirname + '/public'))

app.get('/', function (req, res, next) {
  try {
    var html = homepage({ title: 'Home' })
    res.send(html)
  } catch (e) {
    next(e)
  }
})

app.get('/', function (req, res, next) {
  try {
    var html = citizensadvice({ title: 'Citizens Advice' })
    res.send(html)
  } catch (e) {
    next(e)
  }
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Time to party on http://localhost:' + (process.env.PORT || 3000))
})