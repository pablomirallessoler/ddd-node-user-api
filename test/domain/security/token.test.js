const Token = require('../../../domain/security/token');

describe('Token', () => {

    test('should create token correctly', () => {
        const expectedToken = {
            _exp: '1234',
            _authSession: {
                _id: 'id'
            }
        }
        const actualToken = new Token({
            exp: '1234',
            authSession: {
                id: 'id'
            }
        });
        expect(actualToken).toEqual(expectedToken);
    });

    test('should throw Error if id is null', () => {
        expect(() =>
            new Token({ exp: '1234', authSession: { id: null } })
        ).toThrow('Id is required');
    });

});