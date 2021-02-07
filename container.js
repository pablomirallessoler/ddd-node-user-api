const awilix = require('awilix');

const MongoAdapter = require('./infraestructure/persistence/mongo/adapter');
const MongoUserRepository = require('./infraestructure/persistence/mongo/user-repository');
const MongoUserMapper = require('./infraestructure/persistence/mongo/user-mapper');

const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY
});

container.register({
    mongoAdapter: awilix.asClass(MongoAdapter).singleton(),
    mongoUserMapper: awilix.asClass(MongoUserMapper),
    mongoUserRepository: awilix.asClass(MongoUserRepository)
});

module.exports = container;