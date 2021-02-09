const User = require('../../domain/user/user');

class RegisterUser {

    constructor({ userRepository, passwordChecker }) {
        this._userRepository = userRepository;
        this._passwordChecker = passwordChecker;
    }

    async register({ id, password, firstName, lastName, phone, email, country, postalCode }) {
        const persistedUser = await this._userRepository.findByEmail(email);

        if (persistedUser) {
            throw new Error('This email is already registered');
        }

        const encryptedPassword = await this._passwordChecker.encrypt(password);

        const user = new User({
            id,
            password: encryptedPassword,
            info: {
                firstName,
                lastName
            },
            contactData: {
                phone,
                email,
                country,
                postalCode
            }
        });

        return await this._userRepository.save(user);
    }

}

module.exports = RegisterUser;