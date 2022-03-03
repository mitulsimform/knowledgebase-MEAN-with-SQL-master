var sendJsonResponse = function (req, res, statusCode, data, error, flagMsg) {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify({
        "data": data,
        "error": error,
        "flagMsg": flagMsg
    }));
    res.end();
};

module.exports.sendJsonResponse = sendJsonResponse;