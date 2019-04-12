'use strict'
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define('Admin', {
    idAdmin: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING(100),      
      defaultValue: ''
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING(100),      
      defaultValue: ''
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING(100),      
      defaultValue: ''
    },
	  is_super: {
      allowNull: false,
      type: DataTypes.TINYINT,      
      defaultValue: 0
    },
  },  {
    tableName: 'admin',
    timestamps: true,
  })

  Admin.associate = function (models) {
    // associations
    //User.hasMany(models.Agent_Language);
  }

  // hooks
  Admin.beforeCreate(admin => {
    admin.password = admin.password && admin.password != "" ? bcrypt.hashSync(admin.password, 8) : "";
  })


  return Admin
}