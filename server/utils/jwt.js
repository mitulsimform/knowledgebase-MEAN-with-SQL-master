const jwt = require('jsonwebtoken');

module.exports = (email, id, uuid) => {

    return jwt.sign({
        email: email,
        id: id,
        uuid: uuid
    }, process.env.JWT_SECRET);
};