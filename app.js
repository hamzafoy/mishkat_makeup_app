/*
Activating Frameworks, Dependencies, & Middleware
*/

//Requiring ExpressJS to access the framework
const express = require('express');
//Requiring body-parser to help access data in request/response bodies.
const bodyParser = require('body-parser');
//Requiring Sequelize which will serve as the ORM between the app and the MySQL database.
const Sequelize = require('sequelize');



/*
Initializing, connecting, & formatting the modular application.
*/

//Exposing the application to Express' objects & methods.
const application = express();
//Ensuring that the Pug HTML template engine is used to render customer-facing views in the application.
application.set('view engine', 'pug');
//Plugging in the HTTP routes to the application.
const leadRoutes = require('./routes');
//This activates the body-parser middleware.
application.use(bodyParser.urlencoded({ extended: false }));
//This uses the routes contained in the /routes directory.
application.use(leadRoutes);
//
application.use('/static', express.static('public'));


/*

*/

//
application.listen(3000, () => {
    console.log('Spinning tracks on station 3000 up in this Localhost');
});

module.exports = application;