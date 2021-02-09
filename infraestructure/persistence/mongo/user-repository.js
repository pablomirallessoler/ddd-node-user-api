const { ObjectID } = require('mongodb');
const UserRepository = require('../../../domain/user/user-repository');

class MongoUserRepository extends UserRepository {

    constructor({ adapter, userMapper }) {
        super();
        this._adapter = adapter;
        this._mapper = userMapper;
    }

    async findById(id) {
        const client = await this._adapter.getClient();
        const userDb = await client.collection('users').findOne({ _id: new ObjectID(id) });
        return this._mapper.toDomain(userDb);
    }

    async findByEmail(email) {
        const client = await this._adapter.getClient();
        const userDb = await client.collection('users').findOne({ email });
        return this._mapper.toDomain(userDb);
    }

    async save(user) {
        const client = await this._adapter.getClient();

        const document = this._mapper.toDocument(user);
        await client.collection('users').replaceOne({ _id: new ObjectID(document._id) }, document, { upsert: true });
    }

    async delete(id) {
        const client = await this._adapter.getClient();
        await client.collection('users').deleteOne({ _id: new ObjectID(id) });
    }

}

module.exports = MongoUserRepository;