const awilix = require('awilix');

const MongoAdapter = require('./infraestructure/persistence/mongo/adapter');
const MongoUserRepository = require('./infraestructure/persistence/mongo/user-repository');
const MongoUserMapper = require('./infraestructure/persistence/mongo/user-mapper');

const BcryptPassword = require('./infraestructure/security/bcrypt-password');

const RegisterUser = require('./application/user/register');
const DeleteUser = require('./application/user/delete');
const UpdateUser = require('./application/user/update');

const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY
});

container.register({
    mongoAdapter: awilix.asClass(MongoAdapter).singleton(),
    mongoUserMapper: awilix.asClass(MongoUserMapper),
    mongoUserRepository: awilix.asClass(MongoUserRepository),
    bcryptPassword: awilix.asClass(BcryptPassword),
    registerUser: awilix.asClass(RegisterUser),
    deleteUser: awilix.asClass(DeleteUser),
    updateUser: awilix.asClass(UpdateUser)
});

module.exports = container;