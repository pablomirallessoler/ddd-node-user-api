class UserInfo {

    constructor({ firstName, lastName }) {
        this.firstName = firstName;
        this._lastName = lastName;
    }

    get firstName() {
        return this._firstName;
    }

    set firstName(firstName) {
        if (!firstName) {
            throw new Error('FirstName is required');
        }
        this._firstName = firstName;
    }

    get lastName() {
        return this._lastName;
    }

}

module.exports = UserInfo;