const bcrypt = require('bcrypt');

class BcryptPassword {
    async encrypt(password) {
        return await bcrypt.hash(password, 10);
    }
}

module.exports = BcryptPassword;