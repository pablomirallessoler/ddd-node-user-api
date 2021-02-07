require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT;
const container = require('./container');
const userRouter = require('./infraestructure/rest/user');
const errorHandler = require('./infraestructure/rest/handlers/error-handler');
const jsonContentType = require('./infraestructure/rest/middlewares/json-content-type');


app.use(bodyParser.json());
app.use(jsonContentType);

app.use(userRouter);

app.use(errorHandler);

const server = app.listen(PORT, () => console.log(`User listening at http://localhost:${PORT}`));

module.exports = { app, server };
