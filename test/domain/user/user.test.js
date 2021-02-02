const User = require('../../../domain/user/user');

describe('User', () => {
   test('should create a user correctly', () => {
       const expectedUser = {
           _id: 'id',
           _password: 'password',
           _info: {
               _name: 'name',
               _surnames: 'surnames',
           },
           _contactData: {
               _phone: 'phone',
               _email: 'email',
               _country: 'country',
               _postalCode: 'postalCode'
           }
       }

       const actualUser = new User({
           id: 'id',
           password: 'password',
           info: {
               name: 'name',
               surnames: 'surnames',
           },
           contactData: {
               phone: 'phone',
               email: 'email',
               country: 'country',
               postalCode: 'postalCode'
           }
       });

       expect(actualUser).toEqual(expectedUser);
   })
});