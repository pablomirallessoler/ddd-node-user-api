const awilix = require('awilix');
const container = require('../../../container');
const User = require('../../../domain/user/user');

describe('Update user', () => {
    let updateUser;
    let userRepositoryMock;
    let bcryptPasswordMock;
    let userRequest;

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
        userRequest = {
            id: '601fc3f352c4e17bb8574a83',
            password: 'password',
            firstName: 'firstName',
            lastName: 'lastName',
            phone: 'phone',
            email: 'newEmail',
            country: 'country',
            postalCode: 'postalCode'
        };
    })

    test('should throw Error if user id does not exists', async () => {
        userRepositoryMock.findById.mockReturnValue(null);
        await expect(updateUser.update(userRequest)).rejects.toThrow('The user does not exists');
    });

    test('should throw Error if user email is updated with a registered value', async () => {
        userRepositoryMock.findById.mockReturnValue({ contactData: { email: 'previousEmail' } });
        userRepositoryMock.findByEmail.mockReturnValue({ contactData: { email: 'newEmail' } });

        await expect(updateUser.update(userRequest)).rejects.toThrow('This email is already registered');
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

        await updateUser.update(userRequest);

        expect(userRepositoryMock.findById.mock.calls.length).toEqual(1);
        expect(userRepositoryMock.findById.mock.calls[0][0]).toEqual(userRequest.id);

        expect(userRepositoryMock.findByEmail.mock.calls.length).toEqual(1);
        expect(userRepositoryMock.findByEmail.mock.calls[0][0]).toEqual(userRequest.email);

        expect(bcryptPasswordMock.encrypt.mock.calls.length).toEqual(1);
        expect(bcryptPasswordMock.encrypt.mock.calls[0][0]).toEqual(userRequest.password);

        expect(userRepositoryMock.save.mock.calls[0][0]).toEqual(expectedUser);
    });

});