const container = require('../../../container');
const authService = container.resolve('authService');

const authValidator = (req, res, next) => {
    const { headers } = req;

    if (!headers || !headers.authorization) {
        return res.status(401).send({ error: 'Missing Authorization Header' });
    }

    const authorizationType = headers.authorization.split(' ')[0];
    const encodedToken = headers.authorization.split(' ')[1];

    if (!authorizationType || authorizationType !== 'Bearer' || !encodedToken) {
        return res.status(401).send({ error: 'Invalid Authorization type' });
    }

    try {
        if (authService.isAuthenticated(encodedToken)) {
            const userRequestId = req.params.id;
            if (userRequestId) {
                if (!authService.hasPermissionForUser(encodedToken, userRequestId)) {
                    return res.status(403).send({ error: 'Forbidden' });
                }
            }
            next();
        }
    } catch ({ message }) {
        return res.status(401).send({ error: message });
    }

};

module.exports = authValidator;