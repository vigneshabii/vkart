// const catchAsyncError =  (func) => (req,res,next) =>
//     Promise.resolve(func(req,res,next)).then((val)=>{console.log(val)}).catch(next)

// module.exports ={catchAsyncError};

// module.exports.catchAsyncError = (err,req,res,next) =>{
//     Promise.resolve(err).then((error)=>{console.log(error); next(error);}).catch(next)
// }

module.exports.catchAsyncError = (fn) => (req, res, next) => 
        Promise.resolve(fn(req,res,next))
        .catch(next); // Handle any errors that occur during Promise resolution
