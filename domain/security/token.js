const AuthSession = require('./auth-session');

class Token {

    constructor({ exp, authSession = {} }) {
        this._exp = exp;
        this.authSession = authSession;
    }

    set authSession(authSession) {
        this._authSession = new AuthSession(authSession);
    }

    get authSession() {
        return this._authSession;
    }

    get exp() {
        return this._exp * 1000;
    }

    get isExpired() {
        return Date.now() > this.exp;
    }

}

module.exports = Token;