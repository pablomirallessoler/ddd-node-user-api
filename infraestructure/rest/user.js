const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const authValidator = require('./middlewares/auth-validator');
const isBodyValid = require('./middlewares/rest-validator');

const LoginCommand = require('../../application/user/commands/login');
const DeleteUserCommand = require('../../application/user/commands/delete');
const RegisterUserCommand = require('../../application/user/commands/register');
const UpdateUserCommand = require('../../application/user/commands/update');

const LoginResponse = require('../../application/user/responses/login');

const container = require('../../container');
const registerUser = container.resolve('registerUser');
const updateUser = container.resolve('updateUser');
const deleteUser = container.resolve('deleteUser');
const loginUser = container.resolve('loginUser');

router.post('/users', [
    check('id').notEmpty()
        .bail()
        .isMongoId(),
    check('password').notEmpty()
        .bail()
        .isLength({ min: 6 }),
    check('firstName').notEmpty(),
    check('email').notEmpty()
        .bail()
        .isEmail(),
    check('phone').notEmpty()
        .bail()
        .isNumeric()
], isBodyValid, async(req, res, next) => {
    try {
        const command = new RegisterUserCommand({
            id: req.body.id,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            email: req.body.email,
            country: req.body.country,
            postalCode: req.body.postalCode
        });

        await registerUser.register(command);

        return res.status(201).send();
    } catch (ex) {
        next(ex);
    }
});

router.put('/users/:id', authValidator, [
    check('firstName').notEmpty(),
    check('email').notEmpty()
        .bail()
        .isEmail(),
    check('phone').notEmpty()
        .bail()
        .isNumeric()
], isBodyValid, async(req, res, next) => {
    try {
        const id = req.params.id;

        const command = new UpdateUserCommand({
            id,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            email: req.body.email,
            country: req.body.country,
            postalCode: req.body.postalCode
        });

        await updateUser.update(command);

        return res.status(204).send();
    } catch (ex) {
        next(ex);
    }
});

router.delete('/users/:id', authValidator, async(req, res, next) => {
    try {
        const id = req.params.id;
        const command = new DeleteUserCommand({ id });

        await deleteUser.delete(command);

        return res.status(204).send();
    } catch (ex) {
        next(ex);
    }
});

router.post('/login', [
    check('email').notEmpty()
        .bail()
        .isEmail(),
    check('password')
        .notEmpty()
], isBodyValid, async(req, res, next) => {
    try {
        const command = new LoginCommand({ email: req.body.email, password: req.body.password });

        const token = await loginUser.login(command);
        const response = new LoginResponse({ token });

        return res.status(200).send(response);
    } catch (ex) {
        next(ex);
    }
});

module.exports = router;