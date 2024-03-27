const {validationResult } = require('express-validator');
//@desc find errors in request and 
const validationMiddleware = (res,req,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty){
        return res.status(400).json({errors : errors.array()});
    }
    next();
};
module.exports = validationMiddleware;