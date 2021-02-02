const UserInfo = require('./user-info');
const UserContactData = require('./user-contact-data');

class User {

    constructor({ id, password, info= {}, contactData = {} }) {
        this._id = id;
        this._password = password;
        this.info = info;
        this.contactData = contactData;
    }

    get id() {
        return this._id;
    }

    get password() {
        return this._password;
    }

    get info() {
        return this._info;
    }

    set info(info) {
        this._info = new UserInfo(info);
    }

    get contactData() {
        return this._contactData;
    }

    set contactData(contactData) {
        this._contactData = new UserContactData(contactData);
    }

}

module.exports = User;