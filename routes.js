// Generated by CoffeeScript 1.10.0
(function() {
  " Transpiled from 'src/controllers.coffee' to 'controllers.js'";
  var eureca, game, router;

  router = require('express').Router();

  eureca = require('./app').eureca;

  game = require('./app').game;

  router.get('/', function(req, res) {
    return res.redirect('/start');
  });

  router.get('/start', function(req, res) {
    return res.render('start');
  });

  router.post('/start', function(req, res) {
    var target_username;
    target_username = req.body.username;
    if (!game.usernameExists(target_username)) {
      res.cookie('username', target_username, {
        maxAge: 900000,
        httpOnly: false
      });
      return res.redirect('/play');
    } else {
      return res.render('start');
    }
  });

  router.get('/play', function(req, res) {
    return res.render('play');
  });

  module.exports = router;

}).call(this);