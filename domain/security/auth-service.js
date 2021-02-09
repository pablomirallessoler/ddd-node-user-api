class AuthService {

    constructor({ userRepository, passwordChecker, tokenVerifier }) {
        this._userRepository = userRepository;
        this._passwordChecker = passwordChecker;
        this._tokenVerifier = tokenVerifier;
    }

    isAuthenticated(encodedToken) {
        try {
            this._tokenVerifier.verify(encodedToken);
        } catch (ex) {
            throw new Error('Invalid or expired token');
        }
        return true;
    }

    hasPermissionForUser(encodedToken, userId) {
        const decodedToken = this._tokenVerifier.decode(encodedToken);
        const authSession = decodedToken.authSession;

        return authSession.id === userId;
    }

    async authenticate({ email, password }) {
        const persistedUser = await this._userRepository.findByEmail(email);

        if (!persistedUser) {
            throw new Error('Invalid email or password');
        }

        if (await this._passwordChecker.compare(password, persistedUser.password)) {
            return this._tokenVerifier.encode({ authSession: { id: persistedUser.id } });
        }

        throw new Error('Invalid email or password');
    }

}

module.exports = AuthService;