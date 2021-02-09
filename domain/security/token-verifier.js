class TokenVerifier {

    encode(toEncode) {
        throw new Error('Abstract method!');
    }

    verify(toDecode) {
        throw new Error('Abstract method!');
    }

    decode(toDecode) {
        throw new Error('Abstract method!');
    }

}

module.exports = TokenVerifier;