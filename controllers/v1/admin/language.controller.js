'use strict';

const msg = require('../../../config/messages'),
    Validate = require('../../../middleware/Validate'),
    Response = require('../../../middleware/Response'),
    models = require('../../../models'),
    LanguageModel = models.Language;

class Language {

    /** Get Languages */
    static getLanguages(req, res, next) {
        var idLanguage = req.params.idLanguage && parseInt(req.params.idLanguage) || null;
        var params = {};
        if (Validate.isValid(idLanguage)) {
            params = {
                idLanguage: idLanguage
            }
        }
        LanguageModel.findAll({
            where: params
        }).then((data) => {
            Response.sendResponse(res, data);
        }).catch((err) => {
            next(err);
        })
    }
    /** add new Language */
    static addLanguage(req, res, next) {
        var params = {
            name: req.body.name,
            staus: req.body.status            
        }
        if ( !Validate.isValid(params.name) || !Validate.isValid(params.staus))
            return Response.replyInvalidRequest(res);

        LanguageModel.create(params)
            .then(() => {
                Response.replyMessage(res, msg.OPERATION_SUCCESS);
            }).catch((err) => {
                next(err);
            })
    }
    /** update Language */
    static setLanguage(req, res, next) {
        var idLanguage = req.params.idLanguage && parseInt(req.params.idLanguage) || null;
        var params = {
            name: req.body.name,
            staus: req.body.status            
        }
        var conditions = {
            idLanguage: idLanguage
        }
        if (!Validate.isValid(idLanguage) || isNaN(idLanguage)
            || !Validate.isValid(params.status) || isNaN(params.status)
            || !Validate.isValid(params.name))
            return Response.replyInvalidRequest(res);

        LanguageModel.update(params, {
            where: conditions
        }).then((count) => {
            if (!count[0]) return Response.replyMessage(res, msg.DATA_NOT_EXISTS);
            Response.replyMessage(res, msg.OPERATION_SUCCESS);
        }).catch((err) => {
            next(err);
        })
    }
    /** delete Language */
    static delLanguage(req, res, next) {
        var idLanguage = req.params.idLanguage && parseInt(req.params.idLanguage) || null;
        if (!Validate.isValid(idLanguage) || isNaN(idLanguage))
            return Response.replyInvalidRequest(res);
        var params = {
            idLanguage: idLanguage
        }
        LanguageModel.destroy({
            where: params
        }).then(() => {
            Response.replyMessage(res, msg.OPERATION_SUCCESS);
        }).catch((err) => {
            next(err);
        })

    }
}
module.exports = Language;  