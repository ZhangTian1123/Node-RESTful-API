'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "admin", deps: []
 * createTable "language", deps: []
 * createTable "user", deps: []
 * createTable "auth_token", deps: [user]
 *
 **/

var info = {
    "revision": 1,
    "name": "all-tables",
    "created": "2019-04-11T16:46:54.387Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "admin",
            {
                "idAdmin": {
                    "type": Sequelize.INTEGER,
                    "field": "idAdmin",
                    "autoIncrement": true,
                    "primaryKey": true
                },
                "email": {
                    "type": Sequelize.STRING(100),
                    "field": "email",
                    "defaultValue": "",
                    "allowNull": false
                },
                "password": {
                    "type": Sequelize.STRING(100),
                    "field": "password",
                    "defaultValue": "",
                    "allowNull": false
                },
                "name": {
                    "type": Sequelize.STRING(100),
                    "field": "name",
                    "defaultValue": "",
                    "allowNull": false
                },
                "is_super": {
                    "type": Sequelize.TINYINT,
                    "field": "is_super",
                    "defaultValue": 0,
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "language",
            {
                "idLanguage": {
                    "type": Sequelize.INTEGER,
                    "field": "idLanguage",
                    "autoIncrement": true,
                    "primaryKey": true
                },
                "name": {
                    "type": Sequelize.STRING(100),
                    "field": "name",
                    "defaultValue": "",
                    "allowNull": false
                },
                "status": {
                    "type": Sequelize.TINYINT,
                    "field": "status",
                    "defaultValue": 1,
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "user",
            {
                "user_id": {
                    "type": Sequelize.INTEGER,
                    "field": "user_id",
                    "autoIncrement": true,
                    "primaryKey": true
                },
                "fname": {
                    "type": Sequelize.STRING(100),
                    "field": "fname",
                    "allowNull": false
                },
                "lname": {
                    "type": Sequelize.STRING(100),
                    "field": "lname",
                    "allowNull": false
                },
                "email": {
                    "type": Sequelize.STRING(100),
                    "field": "email",
                    "allowNull": false
                },
                "password": {
                    "type": Sequelize.STRING(100),
                    "field": "password",
                    "allowNull": false
                },
                "mobile": {
                    "type": Sequelize.STRING(100),
                    "field": "mobile",
                    "allowNull": false
                },
                "mobile_verified": {
                    "type": Sequelize.TINYINT,
                    "field": "mobile_verified",
                    "defaultValue": 0,
                    "allowNull": false
                },
                "email_verified": {
                    "type": Sequelize.TINYINT,
                    "field": "email_verified",
                    "defaultValue": 0,
                    "allowNull": false
                },
                "mobile_code": {
                    "type": Sequelize.STRING(20),
                    "field": "mobile_code",
                    "defaultValue": "",
                    "allowNull": false
                },
                "email_code": {
                    "type": Sequelize.STRING(20),
                    "field": "email_code",
                    "defaultValue": "",
                    "allowNull": false
                },
                "user_status": {
                    "type": Sequelize.TINYINT,
                    "field": "user_status",
                    "defaultValue": 1,
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "auth_token",
            {
                "idAuth_Token": {
                    "type": Sequelize.INTEGER,
                    "field": "idAuth_Token",
                    "autoIncrement": true,
                    "primaryKey": true
                },
                "user_id": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "NO ACTION",
                    "references": {
                        "model": "user",
                        "key": "user_id"
                    },
                    "field": "user_id",
                    "allowNull": false
                },
                "token": {
                    "type": Sequelize.STRING,
                    "field": "token",
                    "defaultValue": "",
                    "allowNull": false
                },
                "expired": {
                    "type": Sequelize.DATE,
                    "field": "expired"
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
