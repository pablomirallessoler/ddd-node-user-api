const bcrypt = require('bcrypt');
const PasswordChecker = require('../../domain/security/password-checker');

class BcryptPassword extends PasswordChecker {

    async encrypt(password) {
        return await bcrypt.hash(password, 10);
    }

    async compare(password, encryptedPassword) {
        return await bcrypt.compare(password, encryptedPassword);
    }

}

module.exports = BcryptPassword;