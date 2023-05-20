/**
 * By defining and using these middleware functions, any time a 404 error occurs in this Express.js application, 
 * the error will be forwarded to the error handler middleware, allowing you to handle the error appropriately.
 */

const notFoundHandler = (req, res, next) => {
    const error = new Error('Not Found');
    error.statusCode = 404;
    next(error);
};

module.exports = notFoundHandler;
