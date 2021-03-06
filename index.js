require('dotenv').config();
const express = require('express');
const helmet = require("helmet");
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT;
const container = require('./container');
const userRouter = require('./infraestructure/rest/user');
const errorHandler = require('./infraestructure/rest/handlers/error-handler');

const adapter = container.resolve('adapter');

app.use(helmet());
app.use(bodyParser.json());

app.use(userRouter);

app.use(errorHandler);

const server = app.listen(PORT, () => {
    if (process.env.NODE_ENV !== 'test') {
        console.log(`User listening at http://localhost:${PORT}`);
    }
});

const shutDown = async () => {
    await adapter.disconnect();
    process.exit();
}

process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);

module.exports = { app, server };
