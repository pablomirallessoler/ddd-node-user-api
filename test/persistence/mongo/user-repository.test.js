const awilix = require('awilix');
const { ObjectId } = require('mongodb');
const User = require('../../../domain/user/user');
const container = require('../../../container');

describe('Mongo user repository', () => {

    let mongoAdapterMock;
    let mongoUserRepository;

    beforeEach(() => {
        mongoAdapterMock = {
            getClient: jest.fn()
        };
        container.register({
            mongoAdapter: awilix.asValue(mongoAdapterMock)
        });
        mongoUserRepository = container.resolve('mongoUserRepository');
    })

    test('should find user document by id', async () => {
        const userId = '601fc3f352c4e17bb8574a83';
        const userDocument = {
            _id: new ObjectId(userId),
            password: 'password',
            firstName: 'firstName',
            lastName: 'lastName',
            phone: 'phone',
            email: 'email',
            country: 'country',
            postalCode: 'postalCode'
        }
        const findMock = jest.fn(() => Promise.resolve(userDocument));
        const collectionMock = {
            collection: () => {
                return { findOne: findMock }
            }
        }
        mongoAdapterMock.getClient.mockReturnValue(collectionMock);

        const expectedUser = new User({
            id: userId,
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
        });

        const actualUser = await mongoUserRepository.findById(userId);

        expect(findMock.mock.calls.length).toBe(1);
        expect(findMock.mock.calls[0][0]).toEqual({ _id: new ObjectId(userId) } );
        expect(actualUser).toEqual(expectedUser);
    });

    test('should return null if user id not exists', async () => {
        const userId = '601fc3f352c4e17bb8574a83';
        const findMock = jest.fn(() => Promise.resolve());
        const collectionMock = {
            collection: () => {
                return { findOne: findMock }
            }
        }
        mongoAdapterMock.getClient.mockReturnValue(collectionMock);

        const expectedUser = null

        const actualUser = await mongoUserRepository.findById(userId);

        expect(findMock.mock.calls.length).toBe(1);
        expect(findMock.mock.calls[0][0]).toEqual({ _id: new ObjectId(userId) } );
        expect(actualUser).toEqual(expectedUser);
    });

    test('should find user document by email', async () => {
        const userId = '601fc3f352c4e17bb8574a83';
        const userEmail = 'email@email.com';
        const userDocument = {
            _id: new ObjectId(userId),
            password: 'password',
            firstName: 'firstName',
            lastName: 'lastName',
            phone: 'phone',
            email: userEmail,
            country: 'country',
            postalCode: 'postalCode'
        }
        const findMock = jest.fn(() => Promise.resolve(userDocument));
        const collectionMock = {
            collection: () => {
                return { findOne: findMock }
            }
        }
        mongoAdapterMock.getClient.mockReturnValue(collectionMock);

        const expectedUser = new User({
            id: userId,
            password: 'password',
            info: {
                firstName: 'firstName',
                lastName: 'lastName'
            },
            contactData: {
                phone: 'phone',
                email: userEmail,
                country: 'country',
                postalCode: 'postalCode'
            }
        });

        const actualUser = await mongoUserRepository.findByEmail(userEmail);

        expect(findMock.mock.calls.length).toBe(1);
        expect(findMock.mock.calls[0][0]).toEqual({ email: userEmail } );
        expect(actualUser).toEqual(expectedUser);
    });

    test('should return null if user email not exists', async () => {
        const userId = '601fc3f352c4e17bb8574a83';
        const userEmail = 'email@email.com';
        const findMock = jest.fn(() => Promise.resolve());
        const collectionMock = {
            collection: () => {
                return { findOne: findMock }
            }
        }
        mongoAdapterMock.getClient.mockReturnValue(collectionMock);

        const expectedUser = null

        const actualUser = await mongoUserRepository.findByEmail(userEmail);

        expect(findMock.mock.calls.length).toBe(1);
        expect(findMock.mock.calls[0][0]).toEqual({ email: userEmail } );
        expect(actualUser).toEqual(expectedUser);
    });

    test('should save user into collection', async () => {
        const saveMock = jest.fn(() => Promise.resolve());
        const collectionMock = {
            collection: () => {
                return { replaceOne: saveMock }
            }
        }
        mongoAdapterMock.getClient.mockReturnValue(collectionMock);

        const userId = '601fc3f352c4e17bb8574a83';
        const user = new User({
            id: userId,
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
        });
        await mongoUserRepository.save(user);

        const expectedUserDocument = {
            _id: new ObjectId(userId),
            password: 'password',
            firstName: 'firstName',
            lastName: 'lastName',
            phone: 'phone',
            email: 'email',
            country: 'country',
            postalCode: 'postalCode'
        }

        expect(saveMock.mock.calls.length).toBe(1);
        expect(saveMock.mock.calls[0][1]).toEqual(expectedUserDocument);
    });

    test('should delete user by id', async () => {
        const userId = '601fc3f352c4e17bb8574a83';
        const deleteMock = jest.fn(() => Promise.resolve());
        const collectionMock = {
            collection: () => {
                return { remove: deleteMock }
            }
        }
        mongoAdapterMock.getClient.mockReturnValue(collectionMock);

        await mongoUserRepository.delete(userId);

        expect(deleteMock.mock.calls.length).toBe(1);
        expect(deleteMock.mock.calls[0][0]).toEqual({ _id: new ObjectId(userId) } );
    });

});