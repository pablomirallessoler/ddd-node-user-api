const User = require('../../../domain/user/user');

describe('User', () => {
   test('should create a user correctly', () => {
       const expectedUser = {
           _id: 'id',
           _name: 'name',
           _surnames: 'surnames',
           _contactData: {
               _phone: 'phone',
               _email: 'email',
               _country: 'country',
               _postalCode: 'postalCode'
           },
           _password: 'password'
       }

       const actualUser = new User({
           id: 'id',
           name: 'name',
           surnames: 'surnames',
           contactData: {
               phone: 'phone',
               email: 'email',
               country: 'country',
               postalCode: 'postalCode'
           },
           password: 'password'
       });

       expect(actualUser).toEqual(expectedUser);
   })
});