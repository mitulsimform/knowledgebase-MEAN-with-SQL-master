var dbconnect = require('../../utils/dbconnect');
const bcrypt = require('bcrypt');
const { uuid } = require('uuidv4');
var CreateUser = function (req, res, callback) {
    let saltRounds = 10;
    var hashPassword = bcrypt.hashSync(req.body.password.toString(), saltRounds);
    var insertParams = {
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
        access_token: '',
        social_id: '',
        uuid: uuid(),
        signup_type: 'local',
        activate: true,
        created_at: new Date(),
        updated_at: new Date()
    };
    var strQuery = "INSERT INTO users SET ?";
    dbconnect.executeQuery(req, res, strQuery, insertParams, function (req, res, error, results, fields) {
        console.log('results', results)
        console.log('fields', fields)
        if (error) {
            callback(error, 201, results, "0", "Error Occured")
        } else {
            let selectQuery = 'SELECT * FROM users WHERE email = ?';
            let queryParam = [req.body.email];
            dbconnect.executeQuery(req, res, selectQuery, queryParam, function (req, res, error, results, fields) {

                if (error) {
                    callback(error, 201, {}, "0", "Error Occured")
                    // 
                } else {
                    callback(error, 200, results[0], "1", "Success")
                }
            });
        }
    });
};
exports.CreateUser = CreateUser;

var UpdateUser = function (req, res, userData, callback) {
    let id = userData.id;
    delete userData.id;
    let userKeys = Object.keys(userData);
    let userValues = Object.values(userData);
    userValues.push(id)
    let queryGenerate = '';
    userKeys.forEach((element, index) => {
        console.log('index', index)
        queryGenerate = queryGenerate + element + ' = ?'
        if (index < userKeys.length - 1) {
            queryGenerate = queryGenerate + ','
        }
    })
    var strQuery = 'UPDATE users SET ' + queryGenerate + ' WHERE id = ?';
    console.log('strQuery', strQuery)
    dbconnect.executeQuery(req, res, strQuery, userValues, function (req, res, error, results, fields) {
        if (error) {
            callback(error, 201, [], "0", "Error Occured")
            // 
        } else {
            let selectQuery = 'SELECT name,auth,email FROM users WHERE email = ?';
            let queryParam = [req.body.email];
            dbconnect.executeQuery(req, res, selectQuery, queryParam, function (req, res, error, results, fields) {
                if (error) {
                    callback(error, 201, results, "0", "Error Occured")
                    // 
                } else {
                    callback(error, 200, results[0], "1", "Success")
                }
            });
        }
    });
};

exports.UpdateUser = UpdateUser;



var GetUserById = function (req, res, callback) {

    let selectQuery = 'SELECT name,email FROM users WHERE access_token = ?';
    const token = req.headers.authorization.split(" ")[1];
    let queryParam = [token];
    dbconnect.executeQuery(req, res, selectQuery, queryParam, function (req, res, error, results, fields) {
        if (error) {
            callback(error, 201, results, "0", "Error Occured")
            // 
        } else {
            callback(error, 200, results[0], "1", "Success")
        }
    });

};

exports.GetUserById = GetUserById;