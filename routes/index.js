const express = require('express');
const router = express.Router();
const fs = require('fs');
const makeupData = require('../db/makeup.json').item1;

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

/* fs.readFile('../db/makeup.json', 'utf8', (err, jsonString) => {
    if (err) {
        console.log('File read failed:', err)
        return;
    }
    try {
        const makeup = JSON.parse(jsonString);
        console.log("Makeup brand is:", makeup.item1.brand);
    } catch (err) {
        console.log("Error parsing JSON string:", err);
    }
}) */



router.get('/', asyncHandler(async (req, res) => {
    res.render('home', {
        name: makeupData.name,
        brand: makeupData.brand
    });
}));

router.get('/about', asyncHandler(async (req, res) => {
    res.render('about', {
        name: makeupData.name,
        brand: makeupData.brand
    });
}));

module.exports = router;