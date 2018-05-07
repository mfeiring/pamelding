const express = require('express')
const path = require('path')
const bodyParser = require('body-parser');
const mongodb = require('mongodb');

const PORT = process.env.PORT || 5000
const ObjectID = mongodb.ObjectID;
const ATTENDING = 'attending';
let db;

const app = express();
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.get('/', (req, res) => res.render('public/index'))

mongodb.MongoClient.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/test', function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = client.db();
  console.log("Database connection ready");

  // Initialize the app.
  const server = app.listen(process.env.PORT || 8080, function () {
    const port = server.address().port;
    console.log("App now running on port", port);
  });
});

// express()
//   .use(express.static(path.join(__dirname, 'public')))
//   .use(bodyParser.json())
//   .get('/', (req, res) => res.render('public/index'))
//   .listen(PORT, () => console.log(`Listening on ${ PORT }`))


 app.get('/api/attending', function(req, res) {
   db.collection(ATTENDING).find({}).toArray(function(err, docs) {
     if (err) {
       handleError(res, err.message, 'Failed to get contacts.');
     } else {
       res.status(200).json(docs);
     }
   });
 });

 app.post('/api/attending', function(req, res) {
   const newAttendee = req.body;

   if (!req.body.name && !req.body.email) {
     handleError(res, 'Invalid user input', 'Must provide a name.', 400);
   }

   db.collection(ATTENDING).insertOne(newAttendee, function(err, doc) {
     if (err) {
       handleError(res, err.message, 'Failed to add attendee.');
     } else {
       res.status(201).json(doc.ops[0]);
     }
   });
 });
