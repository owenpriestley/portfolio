var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

// API BUSINESS

const contentRoutes = require('./content_routes');
module.exports = function(app, db) {
  contentRoutes(app, db);

// Other route groups could go here in the future

};
