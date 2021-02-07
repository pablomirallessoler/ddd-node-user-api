const User = require('../../domain/user/user');

class RegisterUser {

    constructor({ userRepository, bcryptPassword }) {
        this._userRepository = userRepository;
        this._bcryptPassword = bcryptPassword;
    }

    async register({ id, password, firstName, lastName, phone, email, country, postalCode }) {
        const persistedUser = await this._userRepository.findByEmail(email);

        if (persistedUser) {
            throw new Error('This email is already registered');
        }

        const encryptedPassword = this._bcryptPassword.encrypt(password);

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