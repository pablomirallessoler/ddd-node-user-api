const awilix = require('awilix');
const container = require('../../../container');

describe('AuthService', () => {
    let authService;
    let jsonWebTokenMock;
    let bcryptPasswordMock;
    let userRepositoryMock;

    beforeEach(() => {
        jsonWebTokenMock = {
            encode: jest.fn(),
            decode: jest.fn()
        };
        bcryptPasswordMock = {
            compare: jest.fn()
        };
        userRepositoryMock = {
            findByEmail: jest.fn()
        };
        container.register({
            jsonWebToken: awilix.asValue(jsonWebTokenMock),
            bcryptPassword: awilix.asValue(bcryptPasswordMock),
            userRepository: awilix.asValue(userRepositoryMock)
        });
        authService = container.resolve('authService');
    })

    test('should throw Error if user not exists when authenticate', async () => {
        userRepositoryMock.findByEmail.mockReturnValue(null);

        await expect(authService.authenticate({
            email: 'email',
            password: 'password'
        })).rejects.toThrow('Invalid email or password');
    });

    test('should throw Error if user password dont match when authenticate', async () => {
        const encryptedPassword = 'encryptedPassword';

        userRepositoryMock.findByEmail.mockReturnValue({ password: encryptedPassword });
        bcryptPasswordMock.compare.mockReturnValue(false);

        await expect(authService.authenticate({
            email: 'email',
            password: 'password'
        })).rejects.toThrow('Invalid email or password');

        expect(userRepositoryMock.findByEmail.mock.calls.length).toEqual(1);
        expect(userRepositoryMock.findByEmail.mock.calls[0][0]).toEqual('email');

        expect(bcryptPasswordMock.compare.mock.calls.length).toEqual(1);
        expect(bcryptPasswordMock.compare.mock.calls[0][0]).toEqual('password');
        expect(bcryptPasswordMock.compare.mock.calls[0][1]).toEqual(encryptedPassword);
    });

    test('should authenticate successfully if given correct password', async() => {
        const expectedToken = 'expectedToken';
        const encryptedPassword = 'encryptedPassword';
        const id = '601fc3f352c4e17bb8574a83';

        userRepositoryMock.findByEmail.mockReturnValue({ id , password: encryptedPassword });
        bcryptPasswordMock.compare.mockReturnValue(true);
        jsonWebTokenMock.encode.mockReturnValue("expectedToken");

        const actualToken = await authService.authenticate({
            email: 'email',
            password: 'password'
        });

        expect(userRepositoryMock.findByEmail.mock.calls.length).toEqual(1);
        expect(userRepositoryMock.findByEmail.mock.calls[0][0]).toEqual('email');

        expect(bcryptPasswordMock.compare.mock.calls.length).toEqual(1);
        expect(bcryptPasswordMock.compare.mock.calls[0][0]).toEqual('password');
        expect(bcryptPasswordMock.compare.mock.calls[0][1]).toEqual(encryptedPassword);

        expect(jsonWebTokenMock.encode.mock.calls.length).toEqual(1);
        expect(jsonWebTokenMock.encode.mock.calls[0][0]).toEqual({ id });

        expect(actualToken).toEqual(expectedToken);
    });

    test('should throw Error if user not exists', async () => {
        userRepositoryMock.findByEmail.mockReturnValue(null);

        await expect(authService.authenticate({
            email: 'email',
            password: 'password'
        })).rejects.toThrow('Invalid email or password');
    });

    test('should throw error when provided token is invalid', () => {
        jsonWebTokenMock.decode.mockImplementation(() => { throw new Error('error') });
        expect(() =>
            authService.isAuthenticated({ token: 'JWT' })
        ).toThrow('Invalid token');
    });

    test('should throw error when provided token is expired', () => {
        const id = '601fc3f352c4e17bb8574a83';

        jsonWebTokenMock.decode.mockReturnValue({ exp: 1612735347, authSession: { id } });
        expect(() =>
            authService.isAuthenticated({ token: 'JWT' })
        ).toThrow('Session is expired');
    });

    test('should return true when provided token is valid', () => {
        const id = '601fc3f352c4e17bb8574a83';

        jsonWebTokenMock.decode.mockReturnValue({ exp: 99999999999, authSession: { id } });

        expect(authService.isAuthenticated({ token: 'JWT' })).toBeTruthy();
    });

});