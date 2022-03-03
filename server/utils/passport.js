var GoogleStrategy = require('passport-google-oauth20').Strategy;
var LocalStrategy = require('passport-local').Strategy;
const moment = require("moment");
const bcrypt = require('bcrypt');
const { uuid } = require('uuidv4');
var dbconnect = require('../utils/dbconnect');
// load up the user model
// const { User } = require("./../models/index");

module.exports = function (passport) {
    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // deserialize the cookieUserId to user in the database
    passport.deserializeUser((id, done) => {
        User.findByPk(id)
            .then(user => {
                done(null, user);
            })
            .catch(e => {
                done(new Error("Failed to deserialize an user"));
            });
    });

    // GOOGLE
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENTID,
        clientSecret: process.env.GOOGLE_CLIENTSECRET,
        callbackURL: process.env.GOOGLE_CALLBACKURL,
        passReqToCallback: process.env.GOOGLE_PASSREQUESTCALLBACK
    },
        function (request, accessToken, refreshToken, params, profile, done) {
            process.nextTick(function () {

                modifyUserData(accessToken, refreshToken, params, profile, done);

            });
        }
    ));


    // LOCAL
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
        function (req, email, password, done) {

            let strQuery = 'SELECT * FROM `users` WHERE `email` = ?';
            let insertParams = [email]
            dbconnect.executeQuery(null, null, strQuery, insertParams, async function (req, res, error, Users, fields) {
                if (error) {
                    done(error)
                } else {
                    if (Users.length === 0) {
                        return done(null, false, {
                            message: 'Email does not exist'
                        });
                    } else {
                        if (Users[0].signup_type === "google") {
                            return done(null, false, {
                                message: "you have already signed in " + user.signup_type + " with this email"
                            });
                        }
                        const match = await bcrypt.compare(password, Users[0].password);

                        if (!match) {
                            return done(null, false, {
                                message: 'Incorrect password.'
                            });
                        }

                        return done(null, Users[0]);
                    }
                }
            });
        }
    ))
};

const modifyUserData = (accessToken, refreshToken, params, profile, done) => {

    let social_id, name;
    const { given_name, sub } = profile._json;
    social_id = sub
    name = given_name

    let strQuery = 'SELECT * FROM `users` WHERE `social_id` = ?';
    let insertParams = [social_id]
    dbconnect.executeQuery(null, null, strQuery, insertParams, function (req, res, error, Users, fields) {
        if (error) {
            done(error)
        } else {
            if (Users.length === 0) {
                let userObj = {
                    name: name,
                    email: profile._json.email,
                    password: null,
                    social_id: social_id,
                    activate: true,
                    uuid: uuid(),
                    auth: JSON.stringify({ accessToken: accessToken, expires_in: params.expires_in, token_type: params.token_type, refreshToken: refreshToken }),
                    access_token: accessToken,
                    signup_type: profile.provider,
                    created_at: new Date(),
                    updated_at: new Date()
                }
                var strQuery = "INSERT INTO users SET ?";
                dbconnect.executeQuery(req, res, strQuery, userObj, function (req, res, error, userData, fields) {
                    if (error) {
                        done(error)
                    } else {
                        let selectQuery = 'SELECT * FROM users WHERE email = ?';
                        let queryParam = [profile._json.email];
                        dbconnect.executeQuery(req, res, selectQuery, queryParam, function (req, res, error, results, fields) {
                            if (error) {
                                done(error)
                                // 
                            } else {
                                done(null, results[0])
                            }
                        });
                    }
                });
            } else {
                done(null, Users[0])
            }
        }
    });

}


