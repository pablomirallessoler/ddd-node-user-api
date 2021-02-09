const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;
const jwtExpirationTime = process.env.JWT_EXPIRATION_TIME;

class JsonWebToken {

    encode(toEncode) {
        return jwt.sign(toEncode, jwtSecret, { expiresIn: jwtExpirationTime });
    }

    verify(toDecode) {
        return jwt.verify(toDecode, jwtSecret)
    }

    decode(toDecode) {
        return jwt.decode(toDecode, jwtSecret)
    }

}

module.exports = JsonWebToken;