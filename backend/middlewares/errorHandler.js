const errorHandler = (err, req, res, next) => {

    const statusCode = err.statusCode || 500;

    const message = err.message || "Internal Server Error";
    console.error("Error: ", err);

    res.status(statusCode).json({ message: message, error: err.stack });
}


export default errorHandler;