exports.errorMiddleware = (err,req,res,next) =>{
    
err.statusCode = err.statusCode || 500;

        if(process.env.NODE_ENV == 'developement')
        {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            stack: err.stack,
            error: err
        })
        }
        if(process.env.NODE_ENV == 'production'){
        let message= err.message;
        let error = new Error(message)

        if(err.name == "ValidationError"){
            message=Object.values(err.errors).map(value => value.message);
            error = new Error(message)
        }
        if(err.name == "CastError"){
            message=`Resourse not found: ${err.path}`
            error = new Error(message)
        }
        return res.status(err.statusCode).json({
            success: false,
            message: error.message || 'Internal server error'
        })
        }   
}