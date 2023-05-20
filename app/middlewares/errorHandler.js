// error handling middleware to catch and handle errors, including 404 errors

const errorHandler = (err, req, res, next) => {
    const status = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    res.status(status).json({
        success: status === 200 ? true : false,
        message: message
    });
};

module.exports = errorHandler;
