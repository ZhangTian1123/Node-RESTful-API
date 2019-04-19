const bodyParser = require('body-parser'),
    Auth = require('../../middleware/Auth'),     
    User = require('../../controllers/v1/api/user.controller');
     

module.exports = {
    initializeRoutes: initializeRoutes
};

/**
 * Initialize routes for users
 * @param {Object} app
 */
function initializeRoutes(app) {
    app.use('/api', bodyParser.json());

     // Api for User.
    app.get('/api/login', User.login);  // user login
    app.post('/api/signup', User.signup);   // sign up.        
    app.get('/api/user', Auth.checkAgent, User.getUserDetail); // get detail data of user    
}