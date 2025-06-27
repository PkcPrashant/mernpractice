export const notFound = (req, res, next) => {
    res.status(404);
    next(new Error('Cannot find route - ', req.originalUrl))
}

export const globalErrorHandler = (err, req, res, next) => {
    const status = res.statusCode == 200 ? 500 : res.statusCode;
    const message = err.message;
    res.status(status).json({
        success: false,
        data: null,
        error: message
    }) 
}