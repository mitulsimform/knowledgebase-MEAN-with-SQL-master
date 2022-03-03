var dbconnect = require('../../utils/dbconnect');

var CreateCategory = function (req, res, callback) {
    console.log(req.userData)
    var insertParams = {
        name: req.body.name,
        user_id: req.userData.id,
        created_at: new Date(),
        updated_at: new Date()
    };
    var strQuery = "INSERT INTO categories SET ?";
    dbconnect.executeQuery(req, res, strQuery, insertParams, function (req, res, error, results, fields) {
        console.log('fields', fields)
        if (error) {
            callback(error, 201, results, "0", "Error Occured")
        } else {
            let selectQuery = 'SELECT * FROM categories WHERE id = ?';
            let queryParam = [results.insertId];
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
exports.CreateCategory = CreateCategory;

var GetCategories = function (req, res, callback) {
    let selectQuery = 'SELECT * FROM categories';
    dbconnect.executeQuery(req, res, selectQuery, [], function (req, res, error, results, fields) {
        if (error) {
            callback(error, 201, {}, "0", "Error Occured")
        } else {
            callback(error, 200, results, "1", "Success")
        }
    });

};
exports.GetCategories = GetCategories;

var UpdateCategories = function (req, res, callback) {
    var strQuery = 'UPDATE categories SET name = ? ,updated_at = ? WHERE id = ?';
    let categoryData = [req.body.name, new Date(), req.body.id]
    dbconnect.executeQuery(req, res, strQuery, categoryData, function (req, res, error, results, fields) {
        if (error) {
            callback(error, 201, [], "0", "Error Occured")
        } else {
            console.log('results', results)
            let selectQuery = 'SELECT * FROM categories WHERE name = ?';
            let queryParam = [req.body.name];
            dbconnect.executeQuery(req, res, selectQuery, queryParam, function (req, res, error, results, fields) {
                if (error) {
                    callback(error, 201, results, "0", "Error Occured")
                } else {
                    callback(error, 200, results[0], "1", "Success")
                }
            });
        }
    });

};
exports.UpdateCategories = UpdateCategories;

var DeleteCategory = function (req, res, callback) {
    let selectQuery = 'DELETE FROM categories WHERE id = ?';
    dbconnect.executeQuery(req, res, selectQuery, req.body.id, function (req, res, error, results, fields) {
        if (error) {
            callback(error, 201, {}, "0", "Error Occured")
        } else {
            callback(error, 200, {}, "1", "Success")
        }
    });

};
exports.DeleteCategory = DeleteCategory;