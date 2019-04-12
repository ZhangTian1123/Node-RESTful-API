'use strict'

module.exports = (sequelize, DataTypes) => {
  const Language = sequelize.define('Language', {
    idLanguage: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING(100),
      defaultValue: ''
    },
    status: {
      allowNull: false,
      type: DataTypes.TINYINT,
      defaultValue: 1
    }
  }, {
    tableName: 'language',
    timestamps: true,
  })

  Language.associate = function (models) {
    // associations
    
  }

  // hooks

  return Language
}