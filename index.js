require('dotenv').config();
const MongoHandler = require('./infraestructure/persistence/mongo/handler');

const express = require('express');
const app = express();

const PORT = process.env.PORT;

const mongo = new MongoHandler();
mongo.connect();

app.listen(PORT, () => console.log(`User listening at http://localhost:${PORT}`));
