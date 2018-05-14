const express = require('express')
const path = require('path')
const multer = require('multer');
const mongodb = require('mongodb');
const upload = multer();

const PORT = process.env.PORT || 5000
const ObjectID = mongodb.ObjectID;
const ATTENDING = 'attending';
let db;

const PASSWORD = 'bekkinviterer2018';

const app = express();
app.use(express.static(path.join(__dirname, 'public')))
app.use(upload.array())
app.get('/', (req, res) => res.render('public/index'))
app.use('/attending', express.static(path.join(__dirname, 'public/attending.html')))

mongodb.MongoClient.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/test', (err, client) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  db = client.db();
  console.log("Database connection ready");

  const server = app.listen(process.env.PORT || 8080, function () {
    const port = server.address().port;
    console.log("App now running on port", port);
  });
});

const handleError = (res, reason, message, code) => {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

 app.post('/login', (req, res) => {
   if (req.body.password === PASSWORD) {
     db.collection(ATTENDING).find({}).toArray((err, docs) => {
       if (err) {
         handleError(res, err.message, 'Failed to get contacts.');
       } else {
         res.status(200).json(docs);
       }
     });
   } else {
     handleError(res, 'Unauthorized', 'Invalid password', 401);
   }
 })

 app.post('/api/attending', (req, res) => {
   const newAttendee = req.body;

   if (!req.body.name && !req.body.email) {
     handleError(res, 'Invalid user input', 'Must provide a name.', 400);
   }

   db.collection(ATTENDING).insertOne(newAttendee, (err, doc) => {
     if (err) {
       handleError(res, err.message, 'Failed to add attendee.');
     } else {
       res.status(201).json(doc.ops[0]);
     }
   });
 });
