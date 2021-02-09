const awilix = require('awilix');
const container = require('../../../container');
const User = require('../../../domain/user/user');

describe('Register user', () => {
    let registerUser;
    let userRepositoryMock;
    let passwordCheckerMock;
    let userRequest;

    beforeEach(() => {
        userRepositoryMock = {
            save: jest.fn(),
            findByEmail: jest.fn()
        };
        passwordCheckerMock = {
            encrypt: jest.fn()
        }
        container.register({
            userRepository: awilix.asValue(userRepositoryMock),
            passwordChecker: awilix.asValue(passwordCheckerMock)
        });
        registerUser = container.resolve('registerUser');
        userRequest = {
            id: '601fc3f352c4e17bb8574a83',
            password: 'password',
            firstName: 'firstName',
            lastName: 'lastName',
            phone: 'phone',
            email: 'email',
            country: 'country',
            postalCode: 'postalCode'
        };
    })

    test('should throw Error if user email is already registered', async () => {
        userRepositoryMock.findByEmail.mockReturnValue({});
        await expect(registerUser.register(userRequest)).rejects.toThrow('This email is already registered');
    });

    test('should register user', async () => {
        userRepositoryMock.findByEmail.mockReturnValue(null);
        passwordCheckerMock.encrypt.mockReturnValue('encryptedPassword');

        const expectedUser = new User({
            id: '601fc3f352c4e17bb8574a83',
            password: 'encryptedPassword',
            info: {
                firstName: 'firstName',
                lastName: 'lastName'
            },
            contactData: {
                phone: 'phone',
                email: 'email',
                country: 'country',
                postalCode: 'postalCode'
            }
        });

        await registerUser.register(userRequest);

        expect(passwordCheckerMock.encrypt.mock.calls.length).toEqual(1);
        expect(passwordCheckerMock.encrypt.mock.calls[0][0]).toEqual(userRequest.password);

        expect(userRepositoryMock.findByEmail.mock.calls.length).toEqual(1);
        expect(userRepositoryMock.findByEmail.mock.calls[0][0]).toEqual(userRequest.email);

        expect(userRepositoryMock.save.mock.calls[0][0]).toEqual(expectedUser);
    });

});
