const AuthSession = require('../../domain/security/auth-session');
const Token = require('./token');

class AuthService {

    constructor({ userRepository, bcryptPassword, jsonWebToken }) {
        this._userRepository = userRepository;
        this._bcryptPassword = bcryptPassword;
        this._jsonWebToken = jsonWebToken;
    }

    isAuthenticated(encodedToken) {
        let exp;
        let authSession;
        let token;

        try {
            const decodedToken = this._jsonWebToken.decode(encodedToken);
            exp = decodedToken.exp;
            authSession = decodedToken.authSession;
            token = new Token({ exp, authSession });
        } catch (ex) {
            throw new Error('Invalid token');
        }
        if (token.isExpired) {
            throw new Error('Session is expired');
        } else {
            return true;
        }
    }

    async authenticate({ email, password }) {
        const persistedUser = await this._userRepository.findByEmail(email);

        if (!persistedUser) {
            throw new Error('Invalid email or password');
        }

        if (await this._bcryptPassword.compare(password, persistedUser.password)) {
            const authSession = new AuthSession({ id: persistedUser.id });

            return this._jsonWebToken.encode(authSession);
        }

        throw new Error('Invalid email or password');
    }

}

module.exports = AuthService;