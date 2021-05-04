// Requiring Sequelize to enable access to the ORM's methods, properties, & other tools.
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    class Makeup extends Sequelize.Model {}
    Makeup.init({
        
    }, {sequelize});

    return Makeup;
};