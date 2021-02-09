const { MongoClient } = require('mongodb');

class Adapter {

    constructor() {
    }

    async connect() {
        try {
            this._client = await MongoClient.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
            console.log(`Connected to Mongo`);
        } catch (ex) {
            throw new Error('Database error');
        }
    }

    async getClient() {
        if (this._client && this._client.isConnected()) {
            return this._client.db('ddd');
        }
        await this.connect();

        return this._client.db('ddd');
    }

    async disconnect() {
        if (this._client && this._client.isConnected()) {
            await this._client.close();
            console.log(`Mongo disconnected`);
        }
    }

}

module.exports = Adapter;