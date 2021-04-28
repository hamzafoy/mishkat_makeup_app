const express = require('express');
const router = express.Router();

//This is a convenient function that handles async/await.
function asyncHandler(cb){
    return async(req, res, next) => {
        try {
        await cb(req, res, next)
        } catch(error){
        // Forward error to the global error handler
        next(error);
        }
    }
}

router.get('/', asyncHandler(async (req, res) => {
    res.render('index');
}));

module.exports = router;