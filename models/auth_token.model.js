'use strict'

module.exports = (sequelize, DataTypes) => {
  const Auth_Token = sequelize.define('Auth_Token', {
    idAuth_Token: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },    
    token: {
      type: DataTypes.STRING,
      allowNull:false,
      defaultValue:''
    },
    expired:{
      type:DataTypes.DATE
    }

  }, {
    tableName: 'auth_token',
    timestamps: true,
  })

  Auth_Token.associate = function (models) {
    // associations
    Auth_Token.belongsTo(models.User,{
      foreignKey: 'user_id',
      targetKey: 'user_id'
    });
  }

  // hooks
  return Auth_Token
}