const express = require('express');
const router = express.Router();
const authValidator = require('./middlewares/auth-validator');
const container = require('../../container');
const registerUser = container.resolve('registerUser');
const updateUser = container.resolve('updateUser');
const deleteUser = container.resolve('deleteUser');
const loginUser = container.resolve('loginUser');

router.post('/users', async(req, res, next) => {
    try {
        await registerUser.register(req.body);

        return res.status(201).send();
    } catch (ex) {
        next(ex);
    }
});

router.put('/users/:id', authValidator, async(req, res, next) => {
    try {
        const id = req.params.id;
        await updateUser.update({ id, ...req.body });

        return res.status(204).send();
    } catch (ex) {
        next(ex);
    }
});

router.delete('/users/:id', authValidator, async(req, res, next) => {
    try {
        const id = req.params.id;
        await deleteUser.delete({ id });

        return res.status(204).send();
    } catch (ex) {
        next(ex);
    }
});

router.post('/login', async(req, res, next) => {
    try {
        const id = req.params.id;
        const token = await loginUser.login(req.body);

        return res.status(200).send({ token });
    } catch (ex) {
        next(ex);
    }
});

module.exports = router;