const bodyParser = require('body-parser'),
    Auth = require('../../middleware/Auth'),    
    Language = require('../../controllers/v1/admin/language.controller'),    
    Admin = require('../../controllers/v1/admin/admin.controller');

module.exports = {
    initializeRoutes: initializeRoutes
};

/**
 * Initialize routes for Admin
 * @param {Object} app
 */
function initializeRoutes(app) {
    app.use('/admin', bodyParser.json());

    app.post('/admin/login', Admin.login);  // admin login for Oauth2 and JWT
    
    // Languages(RESTful API)
    app.get('/admin/languages',Auth.checkAdmin,Language.getLanguages); //get all Language data
    app.get('/admin/languages/:idLanguage',Auth.checkAdmin,Language.getLanguages); //get Language data by id
    app.post('/admin/languages',Auth.checkAdmin,Language.addLanguage); //add Language data
    app.put('/admin/languages/:idLanguage',Auth.checkAdmin,Language.setLanguage); //edit Language data
    app.delete('/admin/languages/:idLanguage',Auth.checkAdmin,Language.delLanguage); //delete Language data

}