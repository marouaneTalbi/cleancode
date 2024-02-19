const { Sequelize, DataTypes, Op } = require('sequelize');

 const sequelize = new Sequelize({
    dialect: 'postgres' ,
    host: 'localhost' ,
    port: 5432 ,
    database: 'db' ,
    username: 'root' ,
    password: 'root' ,
    timestamps:false
  });
  
  module.exports = { sequelize };