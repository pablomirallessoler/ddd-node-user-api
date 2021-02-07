const { MongoClient } = require('mongodb');

class Adapter {

    constructor() {
    }

    async connect() {
        this._client = await MongoClient.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log(`Connected to Mongo`);
    }

    async getClient() {
        if (this._client && this._client.isConnected()) {
            return this._client.db('ddd');
        }
        await this.connect();

        return this._client.db('ddd');
    }

    async disconnect() {
        console.log("entra");
        if (this._client && this._client.isConnected()) {
            await this._client.close();
            console.log(`Mongo disconnected`);
        }
    }

}

module.exports = Adapter;