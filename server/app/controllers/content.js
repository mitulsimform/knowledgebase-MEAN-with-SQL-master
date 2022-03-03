const contentModel = require('../model/mangoos_model/content');
const sendResponse = require('../../utils/sendresponse');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId
const AWS = require('aws-sdk');

const IAM_USER_KEY = process.env.IAM_USER_KEY;
const IAM_USER_SECRET = process.env.IAM_USER_SECRET;
const BUCKET_NAME = process.env.BUCKET_NAME
var CreateContent = function (req, res) {
    console.log(req.body)
    console.log(req.files)
    try {
        const file = req.files;
        let s3bucket = new AWS.S3({
            accessKeyId: IAM_USER_KEY,
            secretAccessKey: IAM_USER_SECRET,
            Bucket: BUCKET_NAME
        });
        s3bucket.createBucket(function () {
            //Where you want to store your file
            var ResponseData = [];

            file.map((item) => {
                var params = {
                    Bucket: BUCKET_NAME,
                    Key: item.originalname,
                    Body: item.buffer,
                    ACL: 'public-read'
                };
                s3bucket.upload(params, function (err, data) {
                    if (err) {
                        res.json({ "error": true, "Message": err });
                    } else {
                        ResponseData.push(data);
                        if (ResponseData.length == file.length) {
                            let contentData = {
                                name: req.body.name,
                                user_id: req.userData.id,
                                description: req.body.description,
                                files: ResponseData,
                                category_id: req.body.category_id
                            }
                            console.log('contentData', contentData)
                            contentModel.create(contentData, function (err, data) {
                                if (err) return sendResponse.sendJsonResponse(req, res, 500, data, '0', "Something went")
                                sendResponse.sendJsonResponse(req, res, 200, contentData, '1', "Content created SuceesFully")
                            });
                        }
                    }
                });
            });
        });
    } catch (error) {
        csendResponse.sendJsonResponse(req, res, 500, data, '0', "Something went")
    }
};

exports.CreateContent = CreateContent;

var DeleteContent = function (req, res) {
    try {
        contentModel.deleteOne({ _id: ObjectId(req.body.id) }, function (err, data) {
            if (err) return sendResponse.sendJsonResponse(req, res, 500, {}, '0', "Something went")
            sendResponse.sendJsonResponse(req, res, 200, {}, '1', "Suceess")
        });
    } catch (error) {
        console.log(error)
        sendResponse.sendJsonResponse(req, res, 500, {}, '0', "Something went")
    }
};

exports.DeleteContent = DeleteContent;

var GetContent = function (req, res) {
    try {
        console.log('1query', req.query)
        let query = {}
        if (req.query && req.query.category_id) {
            query.category_id = req.query.category_id
        }
        if (req.query && req.query.name) {
            query.$text = { $search: req.query.name }
        }
        contentModel.find(query, function (err, data) {
            if (err) return sendResponse.sendJsonResponse(req, res, 500, data, '0', "Something went")
            sendResponse.sendJsonResponse(req, res, 200, data, '1', "Suceess")
        }).sort({ createdAt: -1 });
    } catch (error) {
        sendResponse.sendJsonResponse(req, res, 500, data, '0', "Something went")
    }
};

exports.GetContent = GetContent;


var GetContentById = function (req, res) {
    try {
        contentModel.findOne({ _id: ObjectId(req.query.id) }, function (err, data) {
            if (err) return sendResponse.sendJsonResponse(req, res, 500, {}, '0', "Something went")
            sendResponse.sendJsonResponse(req, res, 200, data, '1', "Suceess")
        });
    } catch (error) {
        sendResponse.sendJsonResponse(req, res, 500, {}, '0', "Something went")
    }
};

exports.GetContentById = GetContentById;