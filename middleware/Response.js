'use strict';

var msg = require('../config/messages');

class Response {

    /**
     * Reply successful response
     * @param {Object} res
     * @param {object} data
     */
    static sendResponse(res, data, pages) {
        let resData = {};
        if(!pages){
            resData = {
                status: 'SUCCESS',
                statusCode: 200,
                message: 'Result Data',
                data: data
            };  
        }else{
            resData = {
                status: 'SUCCESS',
                statusCode: 200,
                message: 'Result Data',
                pages: pages,
                data: data
            };  
        }
        
        res.type('json').status(200).send(resData);
    }

    /**
     * Reply Message
     * @param {Object} res
     * @param {Object} message - Defined in config
     */
    static replyMessage(res, message) {
        res.type('json').status(message.statusCode).send(message.object);
    }

    /**
     * Reply Internal Error
     * @param {Object} res
     */
    static replyInternalError(res) {
        let error = msg.INTERNAL_ERROR;
        this.replyMessage(res, error);
    }

    /**
     * Reply Unauthorized
     * @param {Object} res
     */
    static replyUnauthorized(res) {
        let error = msg.UNAUTHORIZED;
        this.replyMessage(res, error);
    }

    /**
     * Reply InvalidRequest
     * @param {Object} res
     */
    static replyInvalidRequest(res) {
        let error = msg.INVALID_REQUEST;
        this.replyMessage(res, error);
    }

}
module.exports = Response;