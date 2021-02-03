const { MongoClient } = require('mongodb');

class MongoHandler {

    async connect() {
        this._client = await MongoClient.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to mongo');
        return this._client;
    }

    async disconnect() {
        await this._client.close();
    }

}

module.exports = MongoHandler;