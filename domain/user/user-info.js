class UserInfo {

    constructor({ firstName, lastName }) {
        this._firstName = firstName;
        this._lastName = lastName;
    }

    get firstName() {
        return this._firstName;
    }

    get lastName() {
        return this._lastName;
    }

}

module.exports = UserInfo;