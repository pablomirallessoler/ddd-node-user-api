class LoginUser {

    constructor({ userRepository, bcryptPassword, jsonWebToken }) {
        this._jsonWebToken = jsonWebToken;
        this._bcryptPassword = bcryptPassword;
        this._userRepository = userRepository;
    }

    async login({ email, password }) {
        const persistedUser = this._userRepository.findByEmail(email);

        if (!persistedUser) {
            throw new Error('Invalid email or password');
        }

        if (this._bcryptPassword.compare(password, persistedUser.password)) {
            return this._jsonWebToken.encode({ id: persistedUser.id });
        }

        throw new Error('Invalid email or password');
    }

}

module.exports = LoginUser;