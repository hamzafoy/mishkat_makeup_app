// Requiring Sequelize to enable access to the ORM's methods, properties, & other tools.
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    class Makeup extends Sequelize.Model {}
    Makeup.init({
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING(10000),
            allowNull: false
        },
        description: {
            type: Sequelize.STRING(10000),
            allowNull: false
        },
        favorable: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },
        brand: {
            type: Sequelize.STRING(2000),
            allowNull: false
        },
        price: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        type: {
            type: Sequelize.STRING(1000),
            allowNull: false
        }
    }, {sequelize});

    return Makeup;
};