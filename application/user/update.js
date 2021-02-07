const User = require('../../domain/user/user');

class UpdateUser {

    constructor({ userRepository, bcryptPassword }) {
        this._userRepository = userRepository;
        this._bcryptPassword = bcryptPassword;
    }

    async update({ id, password, firstName, lastName, phone, email, country, postalCode }) {
        const persistedUser = await this._userRepository.findById(id);

        if (!persistedUser) {
            throw new Error('The user does not exists');
        }

        if (persistedUser.contactData.email !== email) {
            if (this._userRepository.findByEmail(email)) {
                throw new Error('This email is already registered');
            }
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

        await this._userRepository.save(user);
    }
}

module.exports = UpdateUser;