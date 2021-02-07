const awilix = require('awilix');
const container = require('../../../container');

describe('Delete user', () => {
    let deleteUser;
    let userRepositoryMock;

    beforeEach(() => {
        userRepositoryMock = {
            delete: jest.fn()
        };
        container.register({
            userRepository: awilix.asValue(userRepositoryMock)
        });
        deleteUser = container.resolve('deleteUser');
    })

    test('should delete user', async () => {
        const userId = '601fc3f352c4e17bb8574a83';
        await deleteUser.delete({ id: '601fc3f352c4e17bb8574a83' });

        expect(userRepositoryMock.delete.mock.calls.length).toEqual(1);
        expect(userRepositoryMock.delete.mock.calls[0][0]).toEqual(userId);
    });

});