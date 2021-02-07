const { ObjectID } = require('mongodb');

class UserRepository {

    constructor({ mongoAdapter, mongoUserMapper }) {
        this._adapter = mongoAdapter;
        this._mapper = mongoUserMapper;
    }

    async find(id) {
        const client = await this._adapter.getClient();
        const userDb = await client.collection('users').findOne({ _id: new ObjectID(id) });
        return this._mapper.toDomain(userDb);
    }

    async save(user) {
        const client = await this._adapter.getClient();

        const document = this._mapper.toDocument(user);
        await client.collection('users').replaceOne({ _id: new ObjectID(document._id) }, document, { upsert: true });
    }

    async delete(id) {
        const client = await this._adapter.getClient();
        await client.collection('users').remove({ _id: new ObjectID(id) });
    }

}

module.exports = UserRepository;