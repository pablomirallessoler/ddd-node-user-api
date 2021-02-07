const bcrypt = require('bcrypt');

class BcryptPassword {
    async encrypt(password) {
        return await bcrypt.hash(password, 10);
    }

    async compare(password, encryptedPassword) {
        return await bcrypt.compare(password, encryptedPassword);
    }
}

module.exports = BcryptPassword;