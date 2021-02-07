const errorHandler = (err, req, res, next) => {
    const message = err.message || err;

    if (process.env.NODE_ENV !== 'test') {
        console.error(message);
    }

    res.status(500).send({ error: message });
    next();
}

module.exports = errorHandler;