const { Sequelize, DataTypes, Op } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'postgres' ,
    host: 'localhost' ,
    port: 5432 ,
    database: 'db' ,
    username: 'root' ,
    password: 'root' ,
    timestamps:false,
    timezone: '+00:00'
});
  
module.exports = { sequelize };