const awilix = require('awilix');
const container = require('../../../container');

describe('Login', () => {
    let loginUser;
    let jsonWebTokenMock;
    let bcryptPasswordMock;
    let userRepositoryMock;
    
    const request = {
        email: 'email',
        password: 'password'
    }

    beforeEach(() => {
        jsonWebTokenMock = {
            encode: jest.fn()
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
        loginUser = container.resolve('loginUser');
    })

    test('should throw Error if user not exists', async () => {
        userRepositoryMock.findByEmail.mockReturnValue(null);

        await expect(loginUser.login(request)).rejects.toThrow('Invalid email or password');
    });

    test('should throw Error if user password dont match', async () => {
        const encryptedPassword = 'encryptedPassword';

        userRepositoryMock.findByEmail.mockReturnValue({ password: encryptedPassword });
        bcryptPasswordMock.compare.mockReturnValue(false);

        await expect(loginUser.login(request)).rejects.toThrow('Invalid email or password');

        expect(userRepositoryMock.findByEmail.mock.calls.length).toEqual(1);
        expect(userRepositoryMock.findByEmail.mock.calls[0][0]).toEqual(request.email);

        expect(bcryptPasswordMock.compare.mock.calls.length).toEqual(1);
        expect(bcryptPasswordMock.compare.mock.calls[0][0]).toEqual(request.password);
        expect(bcryptPasswordMock.compare.mock.calls[0][1]).toEqual(encryptedPassword);
    });

    test('should login user', async() => {
        const expectedToken = 'expectedToken';
        const encryptedPassword = 'encryptedPassword';
        const id = '601fc3f352c4e17bb8574a83';

        userRepositoryMock.findByEmail.mockReturnValue({ id , password: encryptedPassword });
        bcryptPasswordMock.compare.mockReturnValue(true);
        jsonWebTokenMock.encode.mockReturnValue("expectedToken");

        const actualToken = await loginUser.login(request);

        expect(userRepositoryMock.findByEmail.mock.calls.length).toEqual(1);
        expect(userRepositoryMock.findByEmail.mock.calls[0][0]).toEqual(request.email);

        expect(bcryptPasswordMock.compare.mock.calls.length).toEqual(1);
        expect(bcryptPasswordMock.compare.mock.calls[0][0]).toEqual(request.password);
        expect(bcryptPasswordMock.compare.mock.calls[0][1]).toEqual(encryptedPassword);

        expect(jsonWebTokenMock.encode.mock.calls.length).toEqual(1);
        expect(jsonWebTokenMock.encode.mock.calls[0][0]).toEqual({ id });

        expect(actualToken).toEqual(expectedToken);
    });

});