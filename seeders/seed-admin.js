'use strict';
var moment= require('moment');
const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'admin',
      [
        {
          email:             "super@gmail.com",
          password:          bcrypt.hashSync("admin123", 8),
          name:              "Super Admin",          
          is_super:           1,
          createdAt: moment().format('YYYY-MM-DD hh:mm:ss'),
          updatedAt: moment().format('YYYY-MM-DD hh:mm:ss')
        },
        {
          email:             "admin@gmail.com",
          password:          bcrypt.hashSync("admin123", 8),
          name:              "Charlie Adams",          
          is_super:           0,
          createdAt: moment().format('YYYY-MM-DD hh:mm:ss'),
          updatedAt: moment().format('YYYY-MM-DD hh:mm:ss')
        },
     

      ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('admin', null, {})
  }
};
