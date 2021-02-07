const express = require('express');
const router = express.Router();
const container = require('../../container');
const registerUser = container.resolve('registerUser');
const updateUser = container.resolve('updateUser');

router.post('/users', async(req, res, next) => {
    try {
        await registerUser.register(req.body);

        return res.status(201).send();
    } catch (ex) {
        next(ex);
    }
});

router.put('/users/:id', async(req, res, next) => {
    try {
        await updateUser.update(req.body);

        return res.status(204).send();
    } catch (ex) {
        next(ex);
    }
});

module.exports = router;