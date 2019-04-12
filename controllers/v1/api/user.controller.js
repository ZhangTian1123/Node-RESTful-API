'use strict';

const msg = require('../../../config/messages'),
    config = require('../../../config/config'),
    Validate = require('../../../middleware/Validate'),
    Response = require('../../../middleware/Response'),
    Sequelize = require('sequelize'),    
    Auth = require('../../../middleware/Auth'),
    models = require('../../../models'),
    UserModel = models.User,
    UserLanguageModel = models.User_Language;

const bcrypt = require('bcrypt');

class User {
    
    /**
     * register new User
     * @param {Object} req
     * @param {Object} res
     */
    static signup(req, res, next) {
        let user = {
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            mobile: req.body.mobile,
            password: req.body.password,
            languages: req.body.languages
        };

        if (!Validate.isValid(user.email) || !Validate.isValid(user.languages) || 
            !Validate.isValid(user.mobile) || !Validate.isValid(user.password) || !user.password.length ||
            !Validate.isValid(user.fname) || !Validate.isValid(user.lname))
            return Response.replyInvalidRequest(res);

        UserModel.findOne({
                where: {
                    [Sequelize.Op.or]: [{
                        email: user.email
                    }, {
                        mobile: user.mobile
                    }]
                }
            })
            .then((data) => {
                if (data) return Response.replyMessage(res, msg.DUPLICATED_USERINFO);
                UserModel.create({
                    fname: user.fname,
                    lname: user.lname,
                    email: user.email,
                    mobile: user.mobile,
                    password: user.password
                }).then((User) => {
                    delete User.password; //remove password field
                    // generate access token for new user
                    Auth.generateAccessToken(User.user_id, (err, token) => {
                        if (err) return Response.replyInternalError(res);
                        User.dataValues.token = token;
                        //register languages
                        let arr_lang = user.languages.split(",");
                        const addinfo = async (user_id, arr_lang) => {
                            await User.regLangofUser(user_id, arr_lang);                            
                            Response.sendResponse(res, User);
                        }
                        addinfo(User.user_id, arr_lang);

                    });
                }).catch((err) => {
                    next(err);
                })

            }).catch((err) => {                
                next(err);
            })
    }

    /**register languages of User */
    static regLangofUser(user_id, arr_lang) {
        if (isNaN(arr_lang[0])) return;
        arr_lang.forEach(lang => {
            UserLanguageModel.create({
                user_id: user_id,
                idLanguage: lang
            }).then((data) => {
                return;
            }).catch((err) => {
                return;
            })
        })

    }

    /**
     * login
     * @param {Object} req
     * @param {Object} res
     */
    static login(req, res, next) {
        let email = req.body.email,
            password = req.body.password;

        if (!Validate.isValid(email) || !Validate.isValid(password)) return Response.replyInvalidRequest(res);

        UserModel.findOne({
            where: {
                email: email
            }
        }).then((data) => {
            if (!data) return Response.replyMessage(res, msg.INVALID_CREDENTIAL);
            let User = data.dataValues;
            bcrypt.compare(password, User.password, function (err, result) {
                if (!result) return Response.replyMessage(res, msg.INVALID_CREDENTIAL)                
                if (config.status.User_Status.Active != User.User_status) return Response.replyMessage(res, msg.USER_DEACTIVATED);
                Auth.generateAccessToken(User.user_id, (err, token) => {
                    if (err) return Response.replyInternalError(res);
                    User.token = token;
                    delete User.password; //remove password field
                    Response.sendResponse(res, User);
                })
            });
        }).catch((err) => {
            next(err);
        })
    }
    
    /**
     * Get User detail
     * @param {Object} req
     * @param {Object} res
     * @param {Object} next
     */
    static getUserDetail(req, res, next) {
        let user_id = req.authuser.user_id;
        if (!Validate.isValid(user_id) || isNaN(user_id)) {
            return Response.replyInvalidRequest(res);
        }
        UserModel.findOne({
            where: {
                user_id: user_id
            }
        }).then((data) => {
            if (!data) return Response.replyMessage(res, msg.USER_NOT_EXIST);
            delete data.dataValues.password;            
            Response.sendResponse(res, data);
        }).catch((err) => {
            next(err);
        })
    }
}
module.exports = User;
