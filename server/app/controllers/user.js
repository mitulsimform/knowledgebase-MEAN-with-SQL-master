const userModel = require('../model/user');
const sendResponse = require('../../utils/sendresponse');
const auth = require('../../utils/jwt')

var CreateUser = function (req, res) {
    console.log(req.body)
    userModel.CreateUser(req, res, function (err, statusCode, data, error, flagMsg) {
        if (err) {
            sendResponse.sendJsonResponse(req, res, statusCode, data, error, flagMsg)
        } else {
            var token = auth(data.email, data.id, data.uuid);
            let userData = {
                auth: JSON.stringify({ accessToken: token }),
                access_token: token,
                id: data.id
            }
            userModel.UpdateUser(req, res, userData, function (err, statusCode, data, error, flagMsg) {
                sendResponse.sendJsonResponse(req, res, statusCode, data, error, flagMsg)
            });
        }
    });
};
exports.CreateUser = CreateUser;

var GetUserById = function (req, res) {
    userModel.GetUserById(req, res, function (err, statusCode, data, error, flagMsg) {
        sendResponse.sendJsonResponse(req, res, statusCode, data, error, flagMsg)
    });
};
exports.GetUserById = GetUserById;