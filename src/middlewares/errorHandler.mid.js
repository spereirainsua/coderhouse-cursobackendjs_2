const errorHandler = (error, req, res, next) => {
    console.log(error.message)
    const message = error.message || "Server Error"
    const statusCode = error.statusCode || 500
    res.status(statusCode).json({
        error: message,
        method: req.method,
        url: req.url
    })
}
export default errorHandler