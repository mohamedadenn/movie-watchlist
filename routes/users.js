var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

// Google OAuth Login 
router.get('/auth/google', passport.authenticate(
    'google', { scope: ['profile', 'email'] }
));

// // Google OAuth callback route
router.get('/auth/google/callback', passport.authenticate(
    'google', {
        successRedirect: '/',
        failureRedirect: '/users'
    }
));

// OAuth logout route
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;