/*::::::::::::::::::::::::::::::::::::::::
::::::::  Required Dependencies  :::::::::
::::::::::::::::::::::::::::::::::::::::*/

const express = require('express');
const router = express.Router();
const fs = require('fs');



/*::::::::::::::::::::::::::::::::::::::::
:::::  Database Models for MongoDB  ::::::
::::::::::::::::::::::::::::::::::::::::*/

const Review = require('../models/Review');
const Blog = require('../models/Blog');



/*::::::::::::::::::::::::::::::::::::::::
:::  Hidden admin username & password  :::
::::::::::::::::::::::::::::::::::::::::*/

const userName = process.env.ADMIN_LOGIN_USERNAME;
const passCode = process.env.ADMIN_LOGIN_PASSWORD;



/*::::::::::::::::::::::::::::::::::::::::
::::  Multer to handle image uploads :::::
::::::::::::::::::::::::::::::::::::::::*/

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/img/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname + '.png')
    }
})
let upload = multer({
    storage: storage,
    limits: {
        fileSize: 5000000
    }
})



/*::::::::::::::::::::::::::::::::::::::::
:::::::  Async Handler Function  :::::::::
::::::::::::::::::::::::::::::::::::::::*/

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



/*::::::::::::::::::::::::::::::::::::::::
:::::::::::  Backend Routes  :::::::::::::
::::::::::::::::::::::::::::::::::::::::*/

router.get('/', asyncHandler(async (req, res) => {
    res.clearCookie('password');
    res.render('home');
}));


router.get('/about', asyncHandler(async (req, res) => {
    res.render('about');
}));


router.get('/reviews', asyncHandler(async (req, res) => {
    let listOfReviews = await Review.find();
    res.render('reviews', {makeupData: listOfReviews} );
}));


router.post('/api/review', upload.single('uploaded_image'), asyncHandler(async (req, res) => {
    console.log(req.body);
    console.log(req.file);
    let review;
    try {
        review = await Review.create(req.body);
        console.log(`Review created successfully!`);
        res.redirect('/login');
    } catch (error) {
        throw error;
    }
}));


router.post('/api/blog', asyncHandler(async (req, res) => {
    console.log(req.body);
    let blog;
    try {
        blog = await Blog.create(req.body);
        console.log(`Blog Post created successfully!`);
        res.redirect('/login');
    } catch (error) {
        throw error;
    }
}));


router.get('/blog', asyncHandler(async (req, res) => {
    let listOfBlogs = await Blog.find();
    res.render('blog', {blogData: listOfBlogs} );
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
    ( (user == userName) && (pass == passCode) ) ? res.render('login', { review: {}, blog: {} }) : res.redirect('/admin');
}));



/*::::::::::::::::::::::::::::::::::::::::
::::::::::  Exporting Routes  ::::::::::::
::::::::::::::::::::::::::::::::::::::::*/

module.exports = router;