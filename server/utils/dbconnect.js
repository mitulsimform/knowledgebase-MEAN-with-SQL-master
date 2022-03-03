var mysql = require('mysql');
var pool;

var dbConnect = function () {
    if (pool) {
        return pool;
    }
    pool = mysql.createPool({
        connectionLimit: 100,
        waitForConnections: false,
        host: 'localhost',
        user: process.env.USERNAME,
        password: process.env.PASSWORD,
        database: 'knowledgebase',
        dateStrings: true,
        acquireTimeout: 99999999
    });
    return pool;
};

module.exports.dbConnect = dbConnect;

var executeQuery = function (req, res, strQuery, qryParams, callback) {
    var queryParams = qryParams;
    var strQuery = strQuery;

    if (typeof pool == "undefined") {
        pool = dbConnect();
    }

    pool.getConnection(function (err, connection) {
        if (err) {
            console.log(strQuery);
            console.log(err);

        } else {
            var q = connection.query(strQuery, queryParams, function (error, results, fields) {
                // console.log('results', results);
                // console.log('fields', fields);
                // console.log('error', error)
                connection.release();
                if (error) {
                    console.log(q.sql);
                    console.log(error);
                    console.log(results);
                    console.log(strQuery);
                }
                callback(req, res, error, results, fields);
            });
        }
    });
};
module.exports.executeQuery = executeQuery;