class UserContactData {
    constructor({ phone, email, country, postalCode }) {
        this._phone = phone;
        this._email = email;
        this._country = country;
        this._postalCode = postalCode;
    }

    get phone() {
        return this._phone;
    }

    get email() {
        return this._email;
    }

    get country() {
        return this._country;
    }

    get postalCode() {
        return this._postalCode;
    }

}

module.exports = UserContactData;