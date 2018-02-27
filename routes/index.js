var express = require('express');
var router = express.Router();
const MessagingResponse = require('twilio').twiml.MessagingResponse;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/question', function(req, res, next) {
  var db = req.db;
  var questions = db.collection("questions");
  questions.findOne({'theChosenOne':true}, (err, result) => { if (err) {
      res.send("Sorry there are no questinos");
    } else {
      res.send(result.question);
    }
  });
});

router.get('/answers', function(req, res, next) {
  var db = req.db;
  var questions = db.collection("questions");
  questions.findOne({'theChosenOne':true}, (err, result) => {
    if (err) {
      res.send("Sorry an error occurred");
    } else {
      var questionId = result._id;
      db.collection("answers").find({"questionId": questionId}).toArray((err, answers) => {
        res.send(answers);
      });
    }
  });
});

router.post('/newquestion', function(req, res, next){
  var db = req.db;
  var questions = db.collection('questions');
  questions.findOne({"theChosenOne": true}, (err, result) => {
    if (err) {
    } else {
      var questionId = result._id;
      questions.find().toArray((err, results) => {
        if (err) {
          res.send("Failed to get a new question");
        } else {
          var len = results.length;
          var q;
          for (i = 0; i < len; i++) {
            if (String( results [i]._id) == questionId) {
              q = i;
              break;
            }
          }

          newquestion = results[(q + 1) % len];
          questions.update({ _id: questionId }, {$set: {'theChosenOne': false}}, (err) => {
            if (err) {
              res.send("Failed to get a new question");
            } else {
              questions.update({ _id: newquestion._id }, {$set: {'theChosenOne': true}}, (err) => {
                res.send(newquestion);
              });
            }
          });
        }
      });
    }
  })
});

router.post('/sms', (req, res) => {
  var db = req.db;
  var collection = db.collection('answers');
  var questions = db.collection("questions");
  var questionId;
  questions.findOne({'theChosenOne':true}, (err, result) => {
    if (err || result == null) {
      const twiml = new MessagingResponse();
      twiml.message('Unfortunately, an error has occured please try again later.');

      res.writeHead(200, {'Content-Type': 'text/xml'});
      res.end(twiml.toString());
    } else if (req.body.Body == "Next55") {
      var db = req.db;
      var questions = db.collection('questions');
      questions.findOne({"theChosenOne": true}, (err, result) => {
        if (err) {
        } else {
          var questionId = result._id;
          questions.find().toArray((err, results) => {
            if (err) {
              res.send("Failed to get a new question");
            } else {
              var len = results.length;
              var q;
              for (i = 0; i < len; i++) {
                if (String( results [i]._id) == questionId) {
                  q = i;
                  break;
                }
              }

              newquestion = results[(q + 1) % len];
              questions.update({ _id: questionId }, {$set: {'theChosenOne': false}}, (err) => {
                if (err) {
                  res.send("Failed to get a new question");
                } else {
                  questions.update({ _id: newquestion._id }, {$set: {'theChosenOne': true}}, (err) => {
                    const twiml = new MessagingResponse();
                    twiml.message('Good news jack the question has been changed');
  
                    res.writeHead(200, {'Content-Type': 'text/xml'});
                    res.end(twiml.toString());
                  });
                }
              });
            }
          });
        }
      })
    } else {
      questionId = result._id;
      var hasPicture = false;
      var mediaUrl = '';

      if (parseInt(req.body.NumMedia) != 0) {
        hasPicture = true;
        mediaUrl = req.body.MediaUrl0;
      }

      var answer = {
        "questionId": questionId,
        "answer": req.body.Body,
        "mediaUrl": mediaUrl,
        "hasPicture": hasPicture
      };
      collection.insert(answer, (err, result) => {
        if (err) {
          const twiml = new MessagingResponse();
          twiml.message('Unfortunately, an error has occured please try again later.');
  
          res.writeHead(200, {'Content-Type': 'text/xml'});
          res.end(twiml.toString());
        } else {
          const twiml = new MessagingResponse();
          twiml.message('Thank you for your submitting your answer! It has been recorded.');
  
          res.writeHead(200, {'Content-Type': 'text/xml'});
          res.end(twiml.toString());
        }
      });
    }
  });
});


module.exports = router;
