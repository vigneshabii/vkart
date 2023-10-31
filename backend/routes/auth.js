const express =require('express');
const multer = require('multer');
const path = require('path')

const upload = multer({storage: multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname,'..','uploads/user'))
    },
    filename: function(req,file,cb){
        cb(null, file.originalname)
    }
})})

const { 
    registerUser, 
    loginUser, 
    logout, 
    forgotPassword, 
    resetPassword, 
    getUserProfile, 
    changePassword,
    updateProfile,
    getAllusers,
    getUser,
    updateUser,
    deleteUser
    } = require('../controller/authController');
const { catchAsyncError } = require('../middleware/catchAsyncError');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/authenticate');
const router = express.Router();

router.route('/register').post(upload.single('avatar'),catchAsyncError(registerUser));
router.route('/login').post(catchAsyncError(loginUser))
router.route('/logout').get(logout);
router.route('/password/forgot').post(catchAsyncError(forgotPassword));
router.route('/password/reset/:token').post(catchAsyncError(resetPassword));
router.route('/myprofile').get(isAuthenticatedUser,catchAsyncError(getUserProfile));
router.route('/password/change').put(isAuthenticatedUser,catchAsyncError(changePassword));
router.route('/update').put(isAuthenticatedUser,upload.single('avatar'),catchAsyncError(updateProfile));

//Admin routes
router.route('/admin/users').get(isAuthenticatedUser,authorizeRoles('admin'),catchAsyncError(getAllusers));
router.route('/admin/user/:id')
.get(isAuthenticatedUser,authorizeRoles('admin'),catchAsyncError(getUser))
.put(isAuthenticatedUser,authorizeRoles('admin'),catchAsyncError(updateUser))
.delete(isAuthenticatedUser,authorizeRoles('admin'),catchAsyncError(deleteUser))

module.exports = router;