const awilix = require('awilix');

const MongoHandler = require('./infraestructure/persistence/mongo/handler');

const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY
});

container.register({
    mongoDb: awilix.asClass(MongoHandler)
});

module.exports = container;