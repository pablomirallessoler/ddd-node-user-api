class User {
    constructor(id, name, surnames, email, password, country, phone, postalCode) {
        this._id = id;
        this._name = name;
        this._surnames = surnames;
        this._email = email;
        this._password = password;
        this._country = country;
        this._phone = phone;
        this._postalCode = postalCode;
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get surnames() {
        return this._surnames;
    }

    get email() {
        return this._email;
    }

    get password() {
        return this._password;
    }

    get country() {
        return this._country;
    }

    get phone() {
        return this._phone;
    }

    get postalCode() {
        return this._postalCode;
    }

}

module.exports = User;