const awilix = require('awilix');
const container = require('../../../container');
const User = require('../../../domain/user/user');

describe('Update user', () => {
    let updateUser;
    let userRepositoryMock;
    let bcryptPasswordMock;
    let user;

    beforeEach(() => {
        userRepositoryMock = {
            save: jest.fn(),
            findByEmail: jest.fn(),
            findById: jest.fn()
        };
        bcryptPasswordMock = {
            encrypt: jest.fn()
        }
        container.register({
            userRepository: awilix.asValue(userRepositoryMock),
            bcryptPassword: awilix.asValue(bcryptPasswordMock)
        });
        updateUser = container.resolve('updateUser');
        user = {
            id: '601fc3f352c4e17bb8574a83',
            password: 'password',
            info: {
                firstName: 'firstName',
                lastName: 'lastName'
            },
            contactData: {
                phone: 'phone',
                email: 'newEmail',
                country: 'country',
                postalCode: 'postalCode'
            }
        };
    })

    test('should throw Error if user id does not exists', async () => {
        userRepositoryMock.findById.mockReturnValue(null);
        await expect(updateUser.update(user)).rejects.toThrow('The user does not exists');
    });

    test('should throw Error if user email is updated with a registered value', async () => {
        userRepositoryMock.findById.mockReturnValue({ contactData: { email: 'previousEmail' } });
        userRepositoryMock.findByEmail.mockReturnValue({ contactData: { email: 'newEmail' } });

        await expect(updateUser.update(user)).rejects.toThrow('This email is already registered');
    });

    test('should update user', async () => {
        userRepositoryMock.findById.mockReturnValue({ contactData: { email: 'previousEmail' } });
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
                email: 'newEmail',
                country: 'country',
                postalCode: 'postalCode'
            }
        });

        await updateUser.update(user);

        expect(userRepositoryMock.findById.mock.calls.length).toEqual(1);
        expect(userRepositoryMock.findById.mock.calls[0][0]).toEqual(user.id);

        expect(userRepositoryMock.findByEmail.mock.calls.length).toEqual(1);
        expect(userRepositoryMock.findByEmail.mock.calls[0][0]).toEqual(user.contactData.email);

        expect(bcryptPasswordMock.encrypt.mock.calls.length).toEqual(1);
        expect(bcryptPasswordMock.encrypt.mock.calls[0][0]).toEqual(user.password);

        expect(userRepositoryMock.save.mock.calls[0][0]).toEqual(expectedUser);
    });

});