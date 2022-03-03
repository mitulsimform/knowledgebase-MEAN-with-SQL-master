const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../app/controllers/user');
const sendResponse = require('../utils/sendresponse');

router.get('/google/callback', function (req, res) {
    console.log("Callback")
    passport.authenticate("google", function (err, user) {
        console.log('err', user)
        if (err) {
            res.redirect(process.env.FRONTEND_URL + '/account/google-authentication?success=false');
        }
        console.log(user.auth)
        let authentication = JSON.parse(user.auth)
        if (user) {
            res.redirect(process.env.FRONTEND_URL + '/account/google-authentication?token=' + authentication.accessToken);
        }
    })(req, res);
});

router.get('/google',
    passport.authenticate('google',
        {
            scope: [
                'https://www.googleapis.com/auth/plus.login',
                'https://www.googleapis.com/auth/userinfo.profile',
                'https://www.googleapis.com/auth/userinfo.email'
            ]
            , accessType: 'offline'
        }));

router.post('/login', function (req, res) {
    passport.authenticate("local", function (err, user, info) {
        if (err) {
            sendResponse.sendJsonResponse(req, res, 500, {}, err, 'Something ent wrong')
        }

        if (user) {
            user.auth = JSON.parse(user.auth)
            sendResponse.sendJsonResponse(req, res, 200, user, null, "Login successfully")
        } else {
            sendResponse.sendJsonResponse(req, res, 401, {}, null, "Invalid User Name or password")
        }
    })(req, res);
});

router.post('/register', User.CreateUser);
router.get('/get-user-by-token', User.GetUserById);

module.exports = router;
