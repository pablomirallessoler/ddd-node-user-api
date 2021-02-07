const User = require('../../../domain/user/user');

describe('User', () => {

   test('should create a user correctly', () => {
       const expectedUser = {
           _id: 'id',
           _password: 'password',
           _info: {
               _firstName: 'firstName',
               _lastName: 'lastName'
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
       expect(actualUser).toEqual(expectedUser);
   });

   test('should throw Error if id is null', () => {
       expect(() =>
           new User({ id: null })
       ).toThrow('Id is required');
   });

   test('should throw Error if password is null', () => {
       expect(() =>
           new User({ id: 'id', password: null })
       ).toThrow('Password is required');
   });

   test('should throw Error if firstName is null', () => {
       expect(() =>
           new User({ id: 'id', password: 'password', info: { firstName: null } })
       ).toThrow('FirstName is required');
   });

   test('should throw Error if phone is null', () => {
       expect(() =>
           new User({ id: 'id', password: 'password', info: { firstName: 'firstName' }, contactData: { phone: null } })
       ).toThrow('Phone is required');
   });

   test('should throw Error if email is null', () => {
       expect(() =>
           new User({ id: 'id', password: 'password', info: { firstName: 'firstName' }, contactData: { phone: 'phone', email: null } })
       ).toThrow('Email is required');
   });

});