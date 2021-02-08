const container = require('../../../container');
const jsonWebToken = container.resolve('jsonWebToken');

const authValidator = (req, res, next) => {
    const { headers } = req;

    if (!headers || !headers.authorization) {
        return res.status(401).send({ error: 'Missing Authorization Header' })
    }

    const authorizationType = headers.authorization.split(' ')[0];
    const encodedToken = headers.authorization.split(' ')[1];

    if (authorizationType !== 'Bearer' || !encodedToken) {
        throw new Error('Invalid Authorization type');
    }

    const decodedToken = jsonWebToken.decode(encodedToken);

    if (Date.now() <= decodedToken.exp * 1000) {
        next();
    } else {
        throw new Error('Session is expired');
    }
};

module.exports = authValidator;