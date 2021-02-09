class AuthSession {

    constructor({ id }) {
        this.id = id;
    }

    set id(id) {
        if (!id) {
            throw new Error('Id is required');
        }
        this._id = id;
    }

    get id() {
       return this._id;
    }

}

module.exports = AuthSession;