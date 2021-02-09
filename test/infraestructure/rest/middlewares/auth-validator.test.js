const awilix = require('awilix');
const httpMocks = require('node-mocks-http');
const container = require('../../../../container');

describe('Auth validator middleware', () => {

    let authServiceMock;
    let authValidator;

    beforeEach(() => {
        authServiceMock = {
            isAuthenticated: jest.fn()
        };
        container.register({
            authService: awilix.asValue(authServiceMock)
        });

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
    

});
