const express = require('express');
const router = express.Router();
const container = require('../../container');
const registerUser = container.resolve('registerUser');

router.post('/users', async(req, res, next) => {
    try {
        await registerUser.register(req.body);

        res.location(`/users/${req.body.id}`);
        return res.status(201).send();
    } catch (ex) {
        next(ex);
    }
});

module.exports = router;