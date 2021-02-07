const awilix = require('awilix');

const MongoAdapter = require('./infraestructure/persistence/mongo/mongo-adapter');
const MongoUserRepository = require('./infraestructure/persistence/mongo/mongo-user-repository');
const UserMapper = require('./infraestructure/persistence/mongo/user-mapper');

const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY
});

container.register({
    mongoAdapter: awilix.asClass(MongoAdapter).singleton(),
    userMapper: awilix.asClass(UserMapper),
    mongoUserRepository: awilix.asClass(MongoUserRepository)
});

module.exports = container;