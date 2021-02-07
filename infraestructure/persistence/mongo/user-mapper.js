const { ObjectID } = require('mongodb');
const User = require('../../../domain/user/user')

class UserMapper {

    constructor() {
    }

    toDomain(userDocument) {
        if (!userDocument) {
            return null;
        }
        const { _id, password, firstName, lastName, phone, email, country, postalCode } = userDocument;
        const info = { firstName, lastName };
        const contactData = { phone, email, country, postalCode };
        const userId = (_id) ? _id.toString() : _id;

        return new User({ id: userId, password, info, contactData });
    }

    toDocument(userDomain) {
        if (!userDomain) {
            return null;
        }
        const { id, password, info: { firstName, lastName }, contactData: { phone, email, country, postalCode }} = userDomain;

        return { _id: new ObjectID(id), password, firstName, lastName, phone, email, country, postalCode }
    }

}

module.exports = UserMapper;