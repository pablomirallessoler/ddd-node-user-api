const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;
const jwtExpirationTime = process.env.JWT_EXPIRATION_TIME;

class JsonWebToken {

    encode(toEncode) {
        return jwt.sign(toEncode, jwtSecret, { expiresIn: jwtExpirationTime });
    }

    decode(toDecode) {
        return jwt.verify(toDecode, jwtSecret)
    }

}

module.exports = JsonWebToken;