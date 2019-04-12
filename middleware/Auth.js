'use strict';

var crypto = require('crypto'),
    config = require('./../config/config'),
    Validate = require('./Validate'),
    Utils = require('./Utils'),
    Response = require('./Response'),
    models = require('../models'),
    jwt = require('jsonwebtoken'),
    Auth_TokenModel = models.Auth_Token,
    AgentModel = models.User;
class Auth {

    /**
     * Token middleware for express
     */
    static tokenMiddleware() {
        var self = this;
        return function init(req, res, next) {
            var token = req.headers['authorization'] || req.headers['Authorization'] || '';
            var ary_token = token.split(" ");
            if (ary_token.length == 2)
                token = ary_token[1];

            if (!Validate.isValid(token) || token === '') return next();

            // JWT token verify
            jwt.verify(
                token,
                config.jwt.secret_key,
                (err, payload) => {
                    if (err) {  // api token

                        if(err.name === 'JsonWebTokenError'){
                            //if don't jwt token, verify auth token for user
                            Auth_TokenModel.findOne({
                                include: [{
                                    model: AgentModel,
                                    require: true,
                                    attributes: ['idAgent', 'email', 'mobile'],
                                    where: { agent_status: 1 }
                                }],
                                where: {
                                    token: token
                                }
                            }).then((data) => {
                                if (!data) {
                                    next();
                                } else {                                    
                                    var data = data.dataValues;                          
                                    var agent_auth = {};
                                    agent_auth.token = token;
                                    agent_auth.idAgent = parseInt(data.idAgent);
                                    agent_auth.mobile = data.User.dataValues.mobile;
                                    agent_auth.email = data.User.dataValues.email;
                                    agent_auth.expired = data.expired;
                                    //console.log(agent_auth);
                                    if (self.validateToken(agent_auth)) {                                                                                
                                        req.authuser = agent_auth;
                                    }                                    
                                    next();
                                }
                            }).catch((err) => {
                                next(err);
                            })
                        }else if(err.name === 'TokenExpiredError'){  // JWT expired
                            next();
                        }
                    }else{   // admin token
                        //console.log(payload);                        
                        req.jwtToken = token;
                        var admin_auth = {};
                        admin_auth.token = token;                            
                        admin_auth =  self.decode(token).payload;
                        req.authadmin = admin_auth;
                        next();
                    }
                    
                })


        };
    }

    /** Validate Auth Token for user
     * @param {string} token
     */
    static validateToken(token) {
        if (!Validate.isValid(token)
            || !Validate.isValid(token.expired)
            || typeof token.expired.getTime !== 'function')
            return false;

        let expired = token.expired.getTime();
        let now = Date.now();
        if (expired < now) return false;
        return true;
    }

    static decode(token) {
        return jwt.decode(token, {complete: true});        
     }

    /**
     * Generate access token
     * @param {String} agentId
     * @param {Function} cb
     */
    static generateAccessToken(agentId, cb) {
        Auth_TokenModel.destroy({
            where: {
                idAgent: agentId
            }
        }).then(() => {
            let token = Utils.bufferToString(crypto.pseudoRandomBytes(64));
            let expired = new Date();
            expired.setDate(expired.getDate() + parseInt(config.auth_token.expired_duration));
            Auth_TokenModel.create({
                idAgent: agentId,
                token: token,
                expired: expired
            }).then((auth) => {
                cb(null, token);
            }).catch((err) => {
                cb(err);
            })

        }).catch((err) => {
            cb(err);
        })
    }

    /**
     * Generate JSON Web Token
     * @param {Function} cb
     */
    static generateJWT(admin, cb) {
        const payload = {
            email: admin.email,
			name: admin.name,
			companies: admin.companies,
            is_super: admin.is_super
        }
        const token = jwt.sign(payload, config.jwt.secret_key, {
            expiresIn: config.jwt.expired_duration
        })

        cb(null, token);
    }
    /**
     * Check user
     * @param {Object} req
     * @param {Object} res
     * @param {Function} next
     */
    static checkAgent(req, res, next) {        
        if (!Validate.isValid(req.authuser) || !Validate.isLoggedIn(req.authuser)) 
            Response.replyUnauthorized(res);
        else 
            next();
    }

    /**
     * Check admin
     * @param {Object} req
     * @param {Object} res
     * @param {Function} next
     */
    static checkAdmin(req, res, next) {
        if (!Validate.isValid(req.jwtToken) || !Validate.isValid(req.jwtToken)) 
            Response.replyUnauthorized(res);
        else 
            next();        
    }

}
module.exports = Auth;