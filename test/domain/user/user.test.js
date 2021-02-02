const User = require('../../../domain/user/user');

describe('User', () => {
   test('should create a user correctly', () => {
       const expectedUser = {
           _id: 'id',
           _name: 'name',
           _surnames: 'surnames',
           _email: 'email',
           _password: 'password',
           _country: 'country',
           _phone: 'phone',
           _postalCode: 'postalCode'
       }

       const actualUser = new User('id', 'name', 'surnames', 'email', 'password', 'country', 'phone', 'postalCode');

       expect(actualUser).toEqual(expectedUser);
   })
});