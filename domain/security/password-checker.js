class PasswordChecker {

    async encrypt(password) {
        throw new Error('Abstract method!');
    }

    async compare(password, encryptedPassword) {
        throw new Error('Abstract method!');
    }

}

module.exports = PasswordChecker;