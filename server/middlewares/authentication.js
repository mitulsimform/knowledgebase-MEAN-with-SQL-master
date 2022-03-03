const jwt = require('jsonwebtoken');
const sendResponse = require('../utils/sendresponse');
var dbconnect = require('../utils/dbconnect');
module.exports = function (req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        let selectQuery = 'SELECT * FROM users WHERE access_token = ?';
        let queryParam = [token];
        dbconnect.executeQuery(req, res, selectQuery, queryParam, function (req, res, error, results, fields) {
            if (results.length === 0) {
                sendResponse.sendJsonResponse(req, res, 403, {}, error, 'Authentication failed.')
            } else {
                if (results[0].signup_type === 'local') {
                    const decode = jwt.verify(token, process.env.JWT_SECRET);
                    req.userData = decode;
                    next();
                } else if (results[0].signup_type === 'google') {
                    req.userData = {
                        email: results[0].email,
                        id: results[0].id,
                        uuid: results[0].uuid
                    }
                    next();
                } else {
                    sendResponse.sendJsonResponse(req, res, 403, {}, error, 'Authentication failed.')
                }
            }
        });

    } catch (error) {
        sendResponse.sendJsonResponse(req, res, 403, {}, error, 'Authentication failed.')
    }
};