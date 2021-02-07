const { MongoClient } = require('mongodb');

class MongoAdapter {

    constructor() {
    }

    async connect() {
        this._client = await MongoClient.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log(`Connected to Mongo`);
    }

    async getClient() {
        if (this._client && this._client.isConnected()) {
            return this._client;
        }
        await this.connect();

        return this._client;
    }

    async disconnect() {
        if (this._client && this._client.isConnected()) {
            await this._client.close();
            console.log(`Mongo disconnected`);
        }
    }

}

module.exports = MongoAdapter;