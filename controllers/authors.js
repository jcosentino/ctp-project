var express = require('express');
var router = express.Router();
var models = require('../models');

// middleware that is specific to this router (We did not cover this in class)
// It applies to all routes defined in this controller
router.use(function timeLog(req, res, next) {
  console.log('Authors Controller :: Time: ', Date.now());
  next();
});


// define the root authors route
router.get('/', function(req, res) {
  models.Author.findAll({})
    .then(function (authors) {
      if (authors != null) {
        res.send('Authors List: <br /><pre>' + JSON.stringify(authors, null, 4) + '</pre>');
      } else {
        res.send('No Authors found');
      }
    });
});