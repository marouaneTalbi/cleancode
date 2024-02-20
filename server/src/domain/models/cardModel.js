const {Model, DataTypes} = require('sequelize');
const { sequelize } = require('../../infrastructure/database/sequelize');

const Cards = sequelize.define('Cards', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    question: DataTypes.STRING,
    answer: DataTypes.STRING,
    tag: DataTypes.STRING,
    category: {
   type: DataTypes.ENUM('FIRST','SECOND','THIRD','FOURTH','FIFTH','SIXTH','SEVENTH','DONE'),
      defaultValue: 'FIRST'
    }
  }, {
  tableName: 'Cards',
  timestamps: false
});

module.exports = Cards;