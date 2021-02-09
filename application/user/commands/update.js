class UpdateUserCommand {
    constructor({ id, firstName, lastName, phone, email, country, postalCode }) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.email = email;
        this.country = country;
        this.postalCode = postalCode;
    }
}

module.exports = UpdateUserCommand;