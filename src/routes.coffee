""" Transpiled from 'src/controllers.coffee' to 'controllers.js'
"""
# 3rd party imports
router = require('express').Router()
# Module imports
game = require('./app').game

eureca = require('./app').eureca

# Index route
router.get '/', (req, res) ->
  res.redirect '/start'


# Start routes
router.get '/start', (req, res) ->
  res.render 'start'
router.post '/start', (req, res) ->
  target_username = req.body.username
  if target_username
    req.session.username = target_username
    res.redirect '/play'
  else
    res.render 'start'


# Play routes
router.get '/play', (req, res) ->
  res.render 'play'
router.post '/play', (req, res) ->
  res.send {
    player_data: {
      username: req.session.username
      x: 300
      y: 300
    }
    game_data: {}
  }
  eureca.printhere('stuff');


# Export the router that was just made
module.exports = router
