const jwt = require('jsonwebtoken');
const TokenVerifier = require('../../domain/security/token-verifier');
const jwtSecret = process.env.JWT_SECRET;
const jwtExpirationTime = process.env.JWT_EXPIRATION_TIME;

class JsonWebToken extends TokenVerifier {

    encode(toEncode) {
        return jwt.sign(toEncode, jwtSecret, { expiresIn: jwtExpirationTime });
    }

    verify(toVerify) {
        return jwt.verify(toVerify, jwtSecret);
    }

    decode(toDecode) {
        return jwt.decode(toDecode);
    }

}

module.exports = JsonWebToken;