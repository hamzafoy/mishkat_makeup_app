const express = require('express');
const router = express.Router();
const fs = require('fs');
const makeupData = require('../db/makeup.json');
const blogData = require('../db/blog.json');
const Review = require('../models/Review');
const Blog = require('../models/Blog');
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
    let listOfReviews = await Review.find();
    res.render('reviews', {makeupData: listOfReviews} );
}));


router.post('/api/review', asyncHandler(async (req, res) => {
    console.log(req.body);
    let review;
    try {
        review = await Review.create(req.body);
        console.log(`Review created successfully!`);
        res.redirect('/');
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
        res.redirect('/');
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
    ( (user == userName) && (pass == passCode) ) ? res.render('login', { review: {} }) : res.redirect('/admin');
}));

module.exports = router;