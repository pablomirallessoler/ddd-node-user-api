const User = require('../../domain/user/user');

class UpdateUser {

    constructor({ userRepository }) {
        this._userRepository = userRepository;
    }

    async update({ id, firstName, lastName, phone, email, country, postalCode }) {
        const persistedUser = await this._userRepository.findById(id);

        if (!persistedUser) {
            throw new Error('The user does not exists');
        }

        if (persistedUser.contactData.email !== email) {
            if (await this._userRepository.findByEmail(email)) {
                throw new Error('This email is already registered');
            }
        }

        const user = new User({
            id,
            password: persistedUser.password,
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