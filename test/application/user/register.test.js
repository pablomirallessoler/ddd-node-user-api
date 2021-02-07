const awilix = require('awilix');
const container = require('../../../container');
const User = require('../../../domain/user/user');

describe('Register user', () => {
    let registerUser;
    let userRepositoryMock;
    let bcryptPasswordMock;
    let user;

    beforeEach(() => {
        userRepositoryMock = {
            save: jest.fn(),
            findByEmail: jest.fn()
        };
        bcryptPasswordMock = {
            encrypt: jest.fn()
        }
        container.register({
            userRepository: awilix.asValue(userRepositoryMock),
            bcryptPassword: awilix.asValue(bcryptPasswordMock)
        });
        registerUser = container.resolve('registerUser');
        user = {
            id: '601fc3f352c4e17bb8574a83',
            password: 'password',
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
        };
    })

    test('should throw Error if user email is already registered', async () => {
        userRepositoryMock.findByEmail.mockReturnValue({});
        await expect(registerUser.register(user)).rejects.toThrow('This email is already registered');
    });

    test('should register user', async () => {
        userRepositoryMock.findByEmail.mockReturnValue(null);
        bcryptPasswordMock.encrypt.mockReturnValue('encryptedPassword');

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

        await registerUser.register(user);

        expect(bcryptPasswordMock.encrypt.mock.calls.length).toEqual(1);
        expect(bcryptPasswordMock.encrypt.mock.calls[0][0]).toEqual(user.password);

        expect(userRepositoryMock.findByEmail.mock.calls.length).toEqual(1);
        expect(userRepositoryMock.findByEmail.mock.calls[0][0]).toEqual(user.contactData.email);

        expect(userRepositoryMock.save.mock.calls[0][0]).toEqual(expectedUser);
    });

});
