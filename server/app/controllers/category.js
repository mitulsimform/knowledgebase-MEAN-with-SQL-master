const categoryModel = require('../model/category');
const sendResponse = require('../../utils/sendresponse');

var CreateCategory = function (req, res) {
    categoryModel.CreateCategory(req, res, function (err, statusCode, data, error, flagMsg) {
        sendResponse.sendJsonResponse(req, res, statusCode, data, error, flagMsg)
    });
};
exports.CreateCategory = CreateCategory;

var GetCategories = function (req, res) {
    categoryModel.GetCategories(req, res, function (err, statusCode, data, error, flagMsg) {
        sendResponse.sendJsonResponse(req, res, statusCode, data, error, flagMsg)
    });
};
exports.GetCategories = GetCategories;

var DeleteCategory = function (req, res) {
    categoryModel.DeleteCategory(req, res, function (err, statusCode, data, error, flagMsg) {
        sendResponse.sendJsonResponse(req, res, statusCode, data, error, flagMsg)
    });
};
exports.DeleteCategory = DeleteCategory;

var UpdateCategories = function (req, res) {
    categoryModel.UpdateCategories(req, res, function (err, statusCode, data, error, flagMsg) {
        sendResponse.sendJsonResponse(req, res, statusCode, data, error, flagMsg)
    });
};
exports.UpdateCategories = UpdateCategories;