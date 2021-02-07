const User = require('../../domain/user/user');

class RegisterUser {

    constructor({ userRepository, bcryptPassword }) {
        this._userRepository = userRepository;
        this._bcryptPassword = bcryptPassword;
    }

    async register({ id, password, info= {}, contactData = {} }) {
        const persistedUser = await this._userRepository.findByEmail(contactData.email);

        if (persistedUser) {
            throw new Error('This email is already registered');
        }

        const encryptedPassword = this._bcryptPassword.encrypt(password);
        const user = new User({ id, password: encryptedPassword, info, contactData });

        await this._userRepository.save(user);
    }

}

module.exports = RegisterUser;