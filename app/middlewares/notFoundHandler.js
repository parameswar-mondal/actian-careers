
const notFoundHandler = (req, res, next) => {
    const error = new Error('Not Found');
    error.statusCode = 404;
    next(error);
};

module.exports = notFoundHandler;
