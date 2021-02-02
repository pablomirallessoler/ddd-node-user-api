const UserInfo = require('./user-info');
const UserContactData = require('./user-contact-data');

class User {

    constructor({ id, password, info= {}, contactData = {} }) {
        this.id = id;
        this.password = password;
        this.info = info;
        this.contactData = contactData;
    }

    get id() {
        return this._id;
    }

    set id(id) {
        if (!id) {
            throw new Error('Id is required');
        }
        this._id = id;
    }

    get password() {
        return this._password;
    }

    set password(password) {
        if (!password) {
            throw new Error('Password is required');
        }
        this._password = password;
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