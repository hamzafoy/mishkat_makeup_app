// Requiring Sequelize to enable access to the ORM's methods, properties, & other tools.
const Sequelize = require('sequelize');

//Creates the database for use in this project using SQLite3, naming the database file, and refraining from logging SQL queries.
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'mishkatmakeup.db',
    logging: false,
});

const database = {
    sequelize,
    Sequelize,
    models: {},
};

//Pulling the models to be used for the basis of the tables in the database.
database.models.Makeup = require('./models/makeup')(sequelize);

module.exports = database;