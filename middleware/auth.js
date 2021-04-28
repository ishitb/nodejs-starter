const jwt = require('jsonwebtoken');

const config = require('../config');

// Method to validate if the user is authenticated on client side using the 'Authorization' header, which contains just the JSON token
const authenticate = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        res.status(401).send({ message: 'Authentication Invalid' });
    }

    try {
        const decodedToken = jwt.verify(token, config.jwt.secret);

        req.user = decodedToken;
        next();
    } catch (err) {
        console.log(err);
        res.status(406).send({ message: err.message });
    }
};

module.exports = {
    authenticate,
};
