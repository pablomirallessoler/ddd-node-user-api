const container = require('../../../container');
const JsonWebToken = container.resolve('jsonWebToken');

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

    const decodedToken = JsonWebToken.decode(encodedToken);

    if (Date.now() <= decodedToken.exp * 1000) {
        next();
    } else {
        return res.status(401).send({ error: 'Session is expired' });
    }
};

module.exports = authValidator;