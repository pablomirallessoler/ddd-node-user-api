class UserRepository {

    constructor() {
        if (this.constructor === UserRepository) {
            throw new Error(`Can't instantiate abstract class!`);
        }
    }

    async findById(id) {
        throw new Error('Abstract method!');
    }

    async findByEmail(email) {
        throw new Error('Abstract method!');
    }

    async save(user) {
        throw new Error('Abstract method!');
    }

    async delete(id) {
        throw new Error('Abstract method!');
    }

}

module.exports = UserRepository;