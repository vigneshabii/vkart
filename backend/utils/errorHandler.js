// function createErrorHandler(message, statusCode){
//     const error = new Error(message);
//     error.statusCode = statusCode;
//     Error.captureStackTrace(error, createErrorHandler);
//     return error;
// }

class createErrorHandler extends Error{
    constructor(message, statusCode){
        super(message)
        this.statusCode = statusCode;
        Error.captureStackTrace(this,this.constructor)
        return this;
    }
}

module.exports =createErrorHandler;