'use strict'
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fname: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    lname: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    mobile: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    mobile_verified: {
      allowNull: false,
      type: DataTypes.TINYINT,      
      defaultValue: 0
    },
    email_verified: {
      allowNull: false,
      type: DataTypes.TINYINT,      
      defaultValue: 0
    },
    mobile_code: {
      allowNull: false,
      type: DataTypes.STRING(20),      
      defaultValue: ''
    },
    email_code: {
      allowNull: false,
      type: DataTypes.STRING(20),      
      defaultValue: ''
    },    
    user_status: {
      allowNull: false,
      type: DataTypes.TINYINT,      
      defaultValue: 1
    }
  },  {
    tableName: 'user',
    timestamps: true,
  })

  User.associate = function (models) {
    // associations    
  }

  // hooks
  User.beforeCreate(function(user, options, fn){
    user.password = user.password && user.password != "" ? bcrypt.hashSync(user.password, 8) : "";
  })
   
  return User
}