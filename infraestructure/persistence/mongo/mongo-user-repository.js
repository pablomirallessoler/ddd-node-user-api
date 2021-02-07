const { ObjectID } = require('mongodb');

class MongoUserRepository {

    constructor({ mongoAdapter, userMapper }) {
        this._db = mongoAdapter;
        this._userMapper = userMapper;
    }

    async find(id) {
        const client = await this._db.getClient();
        const userDb = await client.collection('users').findOne({ _id: new ObjectID(id) });
        return this._userMapper.toDomain(userDb);
    }

    async save(user) {
        const client = await this._db.getClient();

        const document = this._userMapper.toDocument(user);
        await client.collection('users').replaceOne({ _id: new ObjectID(document._id) }, document, { upsert: true });
    }

    async delete(id) {
        const client = await this._db.getClient();
        await client.collection('users').remove({ _id: new ObjectID(id) });
    }

}

module.exports = MongoUserRepository;