const UserContactData = require('./user-contact-data');

class User {
    constructor({ id, contactData = {}, name, surnames, password }) {
        this._id = id;
        this.contactData = contactData;
        this._name = name;
        this._surnames = surnames;
        this._password = password;
    }

    get id() {
        return this._id;
    }

    get contactData() {
        return this._contactData;
    }

    set contactData(contactData) {
        this._contactData = new UserContactData(contactData);
    }

    get name() {
        return this._name;
    }

    get surnames() {
        return this._surnames;
    }

    get password() {
        return this._password;
    }

}

module.exports = User;