require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT;
const userRouter = require('./infraestructure/rest/user');

app.use(bodyParser.json());

app.use(userRouter);

const server = app.listen(PORT, () => console.log(`User listening at http://localhost:${PORT}`));

module.exports = { app, server };
