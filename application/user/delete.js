class DeleteUser {

    constructor({ userRepository }) {
        this._userRepository = userRepository;
    }

    async delete({ id }) {
        await this._userRepository.delete(id);
    }

}

module.exports = DeleteUser;