const notFoundHandler = (req, res, next) => {

    res.status(404).json({
        message: `the request not found ${req.method} ${req.originalUrl}`
    })

    next();
}

export default notFoundHandler;