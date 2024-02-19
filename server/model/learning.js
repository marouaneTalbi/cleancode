const {Model, DataTypes} = require('sequelize');
const { sequelize } = require('./sequelize');

const Learning = sequelize.define('Learning', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    isValid: {
      type:DataTypes.BOOLEAN,
      defaultValue: false,
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },  {
  tableName: 'Learning',
  timestamps: false
});

module.exports = Learning;