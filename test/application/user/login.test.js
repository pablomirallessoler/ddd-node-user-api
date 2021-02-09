const awilix = require('awilix');
const container = require('../../../container');

describe('Login', () => {
    let loginUser;
    let authServiceMock;
    const request = {
        email: 'email',
        password: 'password'
    }

    beforeEach(() => {
        authServiceMock = {
            authenticate: jest.fn()
        };
        container.register({
            authService: awilix.asValue(authServiceMock)
        });
        loginUser = container.resolve('loginUser');
    })

    test('should login user and return token', async() => {
        const expectedToken = { token: 'JWT' };

        authServiceMock.authenticate.mockReturnValue(expectedToken);

        const actualToken = await loginUser.login(request);

        expect(authServiceMock.authenticate.mock.calls.length).toBe(1);
        expect(authServiceMock.authenticate.mock.calls[0][0]).toEqual(request);
        expect(actualToken).toEqual(expectedToken);
    });

});