'use strict';

const msg = require('../../../config/messages'),
    Validate = require('../../../middleware/Validate'),
    Response = require('../../../middleware/Response'),
    Auth = require('../../../middleware/Auth'),
    bcrypt = require('bcrypt'),
    models = require('../../../models'),
    AdminModel = models.Admin;

class Admin {

    /**
     * Admin login
     * @param {Object} req
     * @param {Object} res
     */
    static login(req, res, next) {
        let email = req.body.email,
            password = req.body.password;

        if (!Validate.isValid(email) || !Validate.isValid(password)) return Response.replyInvalidRequest(res);
        
        AdminModel.findOne({
            attribute:['email'],
            where: {
                email: email
            }
        }).then((data) => {
            if (!data) return Response.replyMessage(res, msg.INVALID_CREDENTIAL);
            let dataValue = data.dataValues;
            bcrypt.compare(password, dataValue.password, function (err, result) {
                if (!result) return Response.replyMessage(res, msg.INVALID_CREDENTIAL)
                
                Auth.generateJWT(dataValue, (err, token) => {
                    if (err) return Response.replyInternalError(res);                    
					let data = {};
                    data.token = token;					
                    Response.sendResponse(res, data);
                })
            });
        }).catch((err) => {
            next(err);
        })
    }
   

}
module.exports = Admin;
