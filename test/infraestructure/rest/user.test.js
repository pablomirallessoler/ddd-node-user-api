const supertest = require('supertest');
const awilix = require('awilix');
const container = require('../../../container');

jest.mock('../../../infraestructure/rest/middlewares/auth-validator', () => jest.fn((req, res, next) => next()));

const registerUserMock = {
    register: jest.fn()
};

const loginUserMock = {
    login: jest.fn()
};

const deleteUserMock = {
    delete: jest.fn()
};

const updateUserMock = {
    update: jest.fn()
};

container.register({
    registerUser: awilix.asValue(registerUserMock),
    deleteUser: awilix.asValue(deleteUserMock),
    loginUser: awilix.asValue(loginUserMock),
    updateUser: awilix.asValue(updateUserMock)
});

const { app, server } = require('../../../index');
const request = supertest(app);

describe('User rest', () => {

    describe('POST register user', () => {
        test('should return 422 status when register a user with a empty body', async () => {
            const res = await request.post('/users')
                .send({});

            const expectedErrors = [
                { message: 'Field cannot be blank', field: 'id' },
                { message: 'Field cannot be blank', field: 'password' },
                { message: 'Field cannot be blank', field: 'firstName' },
                { message: 'Field cannot be blank', field: 'email' },
                { message: 'Field cannot be blank', field: 'phone' }
            ]

            const { status, body } = res;
            expect(status).toBe(422);
            expect(body).toEqual({ errors: expectedErrors });
        });

        test('should return 422 status when register a user with invalid id', async () => {
            const res = await request.post('/users')
                .set('Content-Type', 'application/json')
                .send({
                    id: 'id',
                    firstName: 'firstName',
                    email: 'fake@email.com',
                    phone: '666555444',
                    password: 'password'
                });

            const expectedErrors = [
                { message: 'Provided value has no correct format for field', field: 'id' },
            ]

            const { status, body } = res;
            expect(status).toBe(422);
            expect(body).toEqual({ errors: expectedErrors });
        });

        test('should return 422 status when register a user with invalid email', async () => {
            const res = await request.post('/users')
                .set('Content-Type', 'application/json')
                .send({
                    id: '6022d0adaefed3b3df48870e',
                    firstName: 'firstName',
                    email: 'email',
                    phone: '666555444',
                    password: 'password'
                });

            const expectedErrors = [
                { message: 'Provided value has no correct format for field', field: 'email' },
            ]

            const { status, body } = res;
            expect(status).toBe(422);
            expect(body).toEqual({ errors: expectedErrors });
        });

        test('should return 422 status when register a user with invalid phone', async () => {
            const res = await request.post('/users')
                .set('Content-Type', 'application/json')
                .send({
                    id: '6022d0adaefed3b3df48870e',
                    firstName: 'firstName',
                    email: 'fake@email.com',
                    phone: 'phone',
                    password: 'password'
                });

            const expectedErrors = [
                { message: 'Provided value has no correct format for field', field: 'phone' },
            ]

            const { status, body } = res;
            expect(status).toBe(422);
            expect(body).toEqual({ errors: expectedErrors });
        });

        test('should return 422 status when register a user with invalid password', async () => {
            const res = await request.post('/users')
                .set('Content-Type', 'application/json')
                .send({
                    id: '6022d0adaefed3b3df48870e',
                    firstName: 'firstName',
                    email: 'fake@email.com',
                    phone: '666555444',
                    password: 'p'
                });

            const expectedErrors = [
                { message: 'Provided value has no correct format for field', field: 'password' },
            ]

            const { status, body } = res;
            expect(status).toBe(422);
            expect(body).toEqual({ errors: expectedErrors });
        });

        test('should return 201 status when register a user', async () => {
            registerUserMock.register.mockReturnValue({});

            const res = await request.post('/users')
                .send({
                    id: '6022d0adaefed3b3df48870e',
                    firstName: 'firstName',
                    email: 'fake@email.com',
                    phone: '666555444',
                    password: 'password'
                });

            const { status } = res;
            expect(status).toBe(201);
        });
    });

    describe('DELETE user', () => {
        test('should return 500 status when deleting a user throws an error', async () => {
            deleteUserMock.delete.mockImplementation(() => { throw new Error('error') });

            const res = await request.delete('/users/6022d0adaefed3b3df48870e')
                .send();

            const { status, body } = res;
            expect(status).toBe(500);
            expect(body).toEqual({ error: 'error' });
        });

        test('should return 204 status when deleting a user correctly', async () => {
            deleteUserMock.delete.mockReturnValue({});
            const res = await request.delete('/users/6022d0adaefed3b3df48870e')
                .send();

            const { status } = res;
            expect(status).toBe(204);
        });
    });

    describe('POST login', () => {
        test('should return 500 status when login throws an error', async () => {
            loginUserMock.login.mockImplementation(() => { throw new Error('error') });

            const res = await request.post('/login')
                .send({
                    password: 'password',
                    email: 'fake@email.com'
                });

            const { status, body } = res;
            expect(status).toBe(500);
            expect(body).toEqual({ error: 'error' });
        });

        test('should return status 422 when login without required fields', async () => {
            const res = await request.post('/login')
                .send({});

            const expectedErrors = [
                { message: 'Field cannot be blank', field: 'email' },
                { message: 'Field cannot be blank', field: 'password' },
            ]

            const { status, body } = res;
            expect(status).toBe(422);
            expect(body).toEqual({ errors: expectedErrors });
        });

        test('should return 422 status when login with invalid email', async () => {
            const res = await request.post('/login')
                .send({
                    email: 'email',
                    password: 'password'
                });

            const expectedErrors = [
                { message: 'Provided value has no correct format for field', field: 'email' },
            ]

            const { status, body } = res;
            expect(status).toBe(422);
            expect(body).toEqual({ errors: expectedErrors });
        });

        test('should return 200 status when login correctly', async () => {
            const expectedBody = { token: 'token' };
            loginUserMock.login.mockReturnValue('token');

            const res = await request.post('/login')
                .send({
                    password: 'password',
                    email: 'fake@email.com'
                });

            const { status, body } = res;
            expect(status).toBe(200);
            expect(body).toEqual(expectedBody);
        });
    });

    describe('UPDATE user', () => {
        test('should return 422 status when updating a user with a empty body', async () => {
            const res = await request.put('/users/6022d0adaefed3b3df48870e')
                .send({});

            const expectedErrors = [
                { message: 'Field cannot be blank', field: 'firstName' },
                { message: 'Field cannot be blank', field: 'email' },
                { message: 'Field cannot be blank', field: 'phone' },
            ];

            const { status, body } = res;
            expect(status).toBe(422);
            expect(body).toEqual({ errors: expectedErrors });
        });

        test('should return 422 status when updating a user with invalid email', async () => {
            const res = await request.put('/users/6022d0adaefed3b3df48870e')
                .send({
                    firstName: 'firstName',
                    email: 'email',
                    phone: '666555444'
                });

            const expectedErrors = [
                { message: 'Provided value has no correct format for field', field: 'email' },
            ];

            const { status, body } = res;
            expect(status).toBe(422);
            expect(body).toEqual({ errors: expectedErrors });
        });

        test('should return 422 status when updating a user with a invalid phone', async () => {
            const res = await request.put('/users/6022d0adaefed3b3df48870e')
                .send({
                    firstName: 'firstName',
                    email: 'fake@email.com',
                    phone: 'phone'
                });

            const expectedErrors = [
                { message: 'Provided value has no correct format for field', field: 'phone' },
            ];

            const { status, body } = res;
            expect(status).toBe(422);
            expect(body).toEqual({ errors: expectedErrors });
        });

        test('should return 204 status when updating a user correctly', async () => {
            updateUserMock.update.mockReturnValue({});

            const res = await request.put('/users/6022d0adaefed3b3df48870e')
                .send({
                    firstName: 'firstName',
                    email: 'fake@email.com',
                    phone: '666555444'
                });

            const { status } = res;
            expect(status).toBe(204);
        });
    });

    afterAll(async () => {
        await server.close();
    });

});