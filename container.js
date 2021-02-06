const awilix = require('awilix');

const MongoAdapter = require('./infraestructure/persistence/mongo/mongo-adapter');

const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY
});

container.register({
    mongoAdapter: awilix.asClass(MongoAdapter).singleton()
});

module.exports = container;