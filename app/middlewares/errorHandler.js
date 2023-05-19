const errorHandler = (err, req, res, next) => {
    console.error(err);
    const status = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    res.status(status).json({
        error: {
            success: status === 200 ? true : false,
            message: message
        }
    });
};

module.exports = errorHandler;
