const awilix = require('awilix');
const httpMocks = require('node-mocks-http');
const container = require('../../../../container');

describe('Auth validator middleware', () => {

    let jsonWebTokenMock;
    let authValidator;

    beforeEach(() => {
        jsonWebTokenMock = {
            decode: jest.fn()
        };
        container.register({
            jsonWebToken: awilix.asValue(jsonWebTokenMock)
        });
        jsonWebTokenMock.decode.mockReturnValue({ exp: 1612735347 });

        authValidator = require('../../../../infraestructure/rest/middlewares/auth-validator');
    });

    test('should return 401 if request has no headers', (next)=> {
        const res = httpMocks.createResponse();

        const { statusCode, _getData } = authValidator({}, res, next);

        const expectedError = { error: 'Missing Authorization Header' }

        expect(statusCode).toEqual(401);
        expect(_getData()).toEqual(expectedError);

        next();
    });

    test('should return 401 when authorization header is invalid', (next)=> {
        const res = httpMocks.createResponse();
        const req = httpMocks.createRequest({ headers: {
                authorization: 'Basic ZXJlczpjdXJpb3Nv'
            }
        });

        const { statusCode, _getData } = authValidator(req, res, next);

        const expectedError = { error: 'Invalid Authorization type' }

        expect(statusCode).toEqual(401);
        expect(_getData()).toEqual(expectedError);

        next();
    });

    test('should return 401 when authorization header is expired', (next)=> {
        const res = httpMocks.createResponse();
        const req = httpMocks.createRequest({ headers: {
                authorization: 'Bearer FAKE_EXPIRED_BEARER'
            }
        });

        const { statusCode, _getData } = authValidator(req, res, next);

        const expectedError = { error: 'Session is expired' }

        expect(statusCode).toEqual(401);
        expect(_getData()).toEqual(expectedError);

        next();
    });

});
