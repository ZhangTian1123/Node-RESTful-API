'use strict';

var msg = require('../../config/messages'),
    logger = require('log4js').getLogger("Backend"),
    path = require('path'),    
    express = require('express'),
    user_route = require('./user.route'),
    admin_route = require('./admin.route');


/**
 * Export functions
 */
module.exports = {
    initializeRoutes: initializeRoutes
};

/**
 * Initialize routes
 * @param {Object} app
 */
function initializeRoutes(app) {
    enableCors(app);
    user_route.initializeRoutes(app);
    admin_route.initializeRoutes(app);
    setStaticRoute(app);
    //console.log('-----call error handling-----');
    setErrorHandlingMiddleware(app);
}

/**
 * CORS header injection
 */
function enableCors(app) {
    app.use(function(req, res, next) {
        // res.header('Access-Control-Allow-Origin', '*');
        // res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
        // res.header('Access-Control-Allow-Headers', 'Origin, Authorization, X-Api-Key, X-Requested-With, Content-Type, Accept');
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Request-Headers", "*");
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,X-HTTP-Method-Override, Content-Type, Accept, Authorization");
        res.header("Access-Control-Allow-Credentials", "true");
        next();
    });
}

/**
 * Static route
 * @param {Object} app
 */
function setStaticRoute(app) {
    app.use('/', express.static(path.resolve(__dirname, './../public')));
}

/**
 * Error handling middleware
 * @param {Object} app
 */
function setErrorHandlingMiddleware(app) {
    app.use(function(err, req, res, next) {
        logger.error(err.stack);
        console.log(err);
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, Authorization, X-Api-Key, X-Requested-With, Content-Type, Accept');
        res.type('json').status(msg.INTERNAL_ERROR.statusCode).send(msg.INTERNAL_ERROR.object);
    });
}