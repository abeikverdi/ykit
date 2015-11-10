var express = require('express');
var passport = require('passport');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
var router = express.Router();

var env = {
  PARSE_APP_ID: process.env.PARSE_APP_ID,
  PARSE_JS_KEY: process.env.PARSE_JS_KEY
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { env: env });
});

router.get('/login',
  function(req, res){
    res.render('login', { env: env });
  });

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

router.get('/callback',
  passport.authenticate('auth0', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect(req.session.returnTo || '/user');
  });

/* GET user profile. */
router.get('/user', ensureLoggedIn, function(req, res, next) { 
  res.render('user', { user: req.user });
});

router.get('/researcher',  function(req, res, next) {
  res.render('researcher');
});

router.get('/create-research', function(req, res){
    res.render('create-research', { env: env });
  });
module.exports = router;
