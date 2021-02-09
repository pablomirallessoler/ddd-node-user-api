const awilix = require('awilix');
const container = require('../../../container');

describe('AuthService', () => {
    let authService;
    let tokenVerifierMock;
    let passwordCheckerMock;
    let userRepositoryMock;

    beforeEach(() => {
        tokenVerifierMock = {
            encode: jest.fn(),
            verify: jest.fn(),
            decode: jest.fn()
        };
        passwordCheckerMock = {
            compare: jest.fn()
        };
        userRepositoryMock = {
            findByEmail: jest.fn()
        };
        container.register({
            tokenVerifier: awilix.asValue(tokenVerifierMock),
            passwordChecker: awilix.asValue(passwordCheckerMock),
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
        passwordCheckerMock.compare.mockReturnValue(false);

        await expect(authService.authenticate({
            email: 'email',
            password: 'password'
        })).rejects.toThrow('Invalid email or password');

        expect(userRepositoryMock.findByEmail.mock.calls.length).toEqual(1);
        expect(userRepositoryMock.findByEmail.mock.calls[0][0]).toEqual('email');

        expect(passwordCheckerMock.compare.mock.calls.length).toEqual(1);
        expect(passwordCheckerMock.compare.mock.calls[0][0]).toEqual('password');
        expect(passwordCheckerMock.compare.mock.calls[0][1]).toEqual(encryptedPassword);
    });

    test('should authenticate successfully if given correct password', async() => {
        const expectedToken = 'expectedToken';
        const encryptedPassword = 'encryptedPassword';
        const id = '601fc3f352c4e17bb8574a83';

        userRepositoryMock.findByEmail.mockReturnValue({ id , password: encryptedPassword });
        passwordCheckerMock.compare.mockReturnValue(true);
        tokenVerifierMock.encode.mockReturnValue("expectedToken");

        const actualToken = await authService.authenticate({
            email: 'email',
            password: 'password'
        });

        expect(userRepositoryMock.findByEmail.mock.calls.length).toEqual(1);
        expect(userRepositoryMock.findByEmail.mock.calls[0][0]).toEqual('email');

        expect(passwordCheckerMock.compare.mock.calls.length).toEqual(1);
        expect(passwordCheckerMock.compare.mock.calls[0][0]).toEqual('password');
        expect(passwordCheckerMock.compare.mock.calls[0][1]).toEqual(encryptedPassword);

        expect(tokenVerifierMock.encode.mock.calls.length).toEqual(1);
        expect(tokenVerifierMock.encode.mock.calls[0][0]).toEqual({ authSession: { id } });

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
        tokenVerifierMock.verify.mockImplementation(() => { throw new Error('error') });
        expect(() =>
            authService.isAuthenticated({ token: 'JWT' })
        ).toThrow('Invalid or expired token');
    });

    test('should return true when provided token is valid', () => {
        const id = '601fc3f352c4e17bb8574a83';

        tokenVerifierMock.verify.mockReturnValue({ exp: 99999999999, authSession: { id } });

        expect(authService.isAuthenticated({ token: 'JWT' })).toBeTruthy();
    });

});