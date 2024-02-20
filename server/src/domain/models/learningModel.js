const {Model, DataTypes} = require('sequelize');
const { sequelize } = require('../../infrastructure/database/sequelize');

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
    },
    cardId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Card',
        key: 'id'
      }
    }
  },  {
  tableName: 'Learning',
  timestamps: false
});

module.exports = Learning;