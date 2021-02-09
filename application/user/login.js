class LoginUser {

    constructor({ authService }) {
        this._authService = authService;
    }

    async login({ email, password }) {
        return await this._authService.authenticate({ email, password });
    }

}

module.exports = LoginUser;