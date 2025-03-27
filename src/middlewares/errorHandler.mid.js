const errorHandler = (error, req, res) => {
    console.log(error)
    const message = error.message || "Server Error"
    const statusCode = error.statusCode || 500
    res.status(statusCode).json({
        error: message,
        method: req.method,
        url: req.url
    })
}
export default errorHandler