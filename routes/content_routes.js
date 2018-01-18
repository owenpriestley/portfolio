// routes/content_routes.js
var ObjectID = require('mongodb').ObjectID;
module.exports = function(app, db) {

// ALLOW CROSS ORIGIN REQUESTS (CORS) //
app.use('https://op-api.now.sh' + '/content' + '/:id', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// FIND SOME CONTENT (GET)
app.get('/content/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('content').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      }
      console.log('attempt')
    });
  });
//Update some content (PUT)
app.put('content/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const content = { category: req.body.category, intro: req.body.intro, title: req.body.title, body: req.body.body, place: req.body.place, orig: req.body.orig };
    db.collection('content').update(details, content, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(content);
      } 
    });
  });
//Delete some content (DELETE)
app.delete('content/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('content').remove(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('Content ' + id + ' deleted!');
      } 
    });
  });

//Add some content (POST)
app.post('/content', (req, res) => {
const content = { category: req.body.category, intro: req.body.intro, title: req.body.title, body: req.body.body, place: req.body.place, orig: req.body.orig  };
db.collection('content').insert(content, (err, result) => {
if (err) { 
   res.send({ 'error': 'An error has occurred' }); 
} else {
     res.send(result.ops[0]);
    }
    });
  });
};




