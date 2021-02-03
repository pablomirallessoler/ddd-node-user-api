require('dotenv').config();
const container = require('./container');


const express = require('express');
const app = express();

const PORT = process.env.PORT;
const mongo = container.resolve('mongoDb');
mongo.connect();

app.listen(PORT, () => console.log(`User listening at http://localhost:${PORT}`));
