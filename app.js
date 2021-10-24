/*::::::::::::::::::::::::::::::::::::::::
::::::::  Required Dependencies  :::::::::
::::::::::::::::::::::::::::::::::::::::*/

//Requiring ExpressJS to access the framework
const express = require('express');
//Requiring body-parser to help access data in request/response bodies.
const bodyParser = require('body-parser');
//Requiring the file system native module for Node.js
const fs = require('fs');
const cookieParser = require('cookie-parser');
require('dotenv').config();



/*::::::::::::::::::::::::::::::::::::::::
::  Running Express, connecting to the  ::
::  database, routes, & setting up Pug  ::
::::::::::::::::::::::::::::::::::::::::*/

const connectToDatabase = require('./config/db');
connectToDatabase();
//Exposing the application to Express' objects & methods
const application = express();
application.use(express.json());
//Using Pug.js template engine to render front-end views for application
application.set('view engine', 'pug');
//Plugging in the HTTP routes to the application
const leadRoutes = require('./routes');
//This activates the body-parser middleware
application.use(bodyParser.urlencoded({ extended: false }));
//This activates the cookie-parser middleware
application.use(cookieParser());
//This uses the routes contained in the /routes directory
application.use(leadRoutes);
//The `public` folder will be referred to as `static`
application.use('/static', express.static('public'));
//Listening to port
application.listen(3000, () => {
    console.log('Spinning tracks on station 3000 up in this Localhost');
});

module.exports = application;