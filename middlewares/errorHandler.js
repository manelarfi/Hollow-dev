const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode; // Set status code to 500 if it's not already set
    res.status(statusCode).json({
        error: {
            message: err.message,
        },
    });
};

module.exports = errorHandler;
