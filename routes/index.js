const express = require('express');
const router = express.Router();
const fs = require('fs');
const makeupData = require('../db/makeup.json');
const blogData = require('../db/blog.json')
const userName = process.env.ADMIN_LOGIN_USERNAME;
const passCode = process.env.ADMIN_LOGIN_PASSWORD;

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
    res.render('home');
}));


router.get('/about', asyncHandler(async (req, res) => {
    res.render('about');
}));


router.get('/reviews', asyncHandler(async (req, res) => {
    res.render('reviews', {makeupData: makeupData});
}));


router.get('/blog', asyncHandler(async (req, res) => {
    res.render('blog', {blogData: blogData});
}));


router.get('/admin', asyncHandler(async (req, res) => {
    const user = req.cookies.username;
    const pass = req.cookies.password;
    ( (user == userName) && (pass == passCode) ) ? res.redirect('/login') : res.render('admin');
}));


router.post('/admin', asyncHandler(async (req, res) => {
    res.cookie('username', req.body.adminusername, {maxAge: 3600000});
    res.cookie('password', req.body.adminpassword, {maxAge: 3600000});
    res.redirect('/admin');
}))

router.get('/login', asyncHandler(async (req, res) => {
    const user = req.cookies.username;
    const pass = req.cookies.password;
    ( (user == userName) && (pass == passCode) ) ? res.render('login') : res.redirect('/admin');
}));

module.exports = router;