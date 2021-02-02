class UserContactData {

    constructor({ phone, email, country, postalCode }) {
        this.phone = phone;
        this.email = email;
        this._country = country;
        this._postalCode = postalCode;
    }

    get phone() {
        return this._phone;
    }

    set phone(phone) {
        if (!phone) {
            throw new Error('Phone is required');
        }
        this._phone = phone;
    }

    get email() {
        return this._email;
    }

    set email(email) {
        if (!email) {
            throw new Error('Email is required');
        }
        this._email = email;
    }

    get country() {
        return this._country;
    }

    get postalCode() {
        return this._postalCode;
    }

}

module.exports = UserContactData;