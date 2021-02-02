class UserInfo {

    constructor({ name, surnames }) {
        this._name = name;
        this._surnames = surnames;
    }

    get name() {
        return this._name;
    }

    get surnames() {
        return this._surnames;
    }

}

module.exports = UserInfo;