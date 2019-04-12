
var express = require('express'),
      Auth = require('./middleware/Auth'),
      routes = require('./routes/v1'),
      app = express();


/**
 * Initialize server middlewares, routes
 */
app.use(Auth.tokenMiddleware());
routes.initializeRoutes(app);

module.exports = app;
