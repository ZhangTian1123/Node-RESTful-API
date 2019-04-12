'use strict';
var moment= require('moment');
const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'user',
      [
        {
          fname :            "test",
          lname :            "user",
          email:             "test@gmail.com",
          mobile:            "+12345678",          
          password:          bcrypt.hashSync("123", 8),
          createdAt: moment().format('YYYY-MM-DD hh:mm:ss'),
          updatedAt: moment().format('YYYY-MM-DD hh:mm:ss')
        }
      ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user', null, {})
  }
};
