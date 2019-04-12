'use strict';

var Validate = require('./Validate'),
    PNF = require('google-libphonenumber').PhoneNumberFormat,
    phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance(),
    crypto = require('crypto'),
    config = require('./../config/config');

// var tokenChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
var tokenChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
//var tokenChars = '0123456789';

class Utils {

    /**
     * Make a Buffer into a string ready for use in URLs
     * @param {Array} bytes
     */
    static bufferToString(bytes) {
        var r = [];
        for (var i = 0; i < bytes.length; i++) {
            r.push(tokenChars[bytes[i] % tokenChars.length]);
        }
        return r.join('');
    }

    /**
     * Format phone number
     * @param {String} phoneNumber
     * @param {String} countryCode
     * @return {String}
     */
    static parsePhoneNumber(phoneNumber, countryCode) {
        if (!Validate.isTypeValid(phoneNumber, 'string') || !Validate.isTypeValid(countryCode, 'string'))
            return null;

        let parsed = phoneNumber;

        try {
            parsed = phoneUtil.parse(parsed, countryCode);
            parsed = phoneUtil.format(parsed, PNF.INTERNATIONAL);
        } catch (e) {
            parsed = null
        }

        return parsed;
    }

    /**
     * Format phone number
     * @param {String} phoneNumber
     * @param {String} countryCode
     * @return {String}
     */
    static parsePhoneNumberE164(phoneNumber, countryCode) {
        if (!Validate.isTypeValid(phoneNumber, 'string') || !Validate.isTypeValid(countryCode, 'string'))
            return null;

        let parsed = phoneNumber;

        try {
            parsed = phoneUtil.parse(parsed, countryCode);
            parsed = phoneUtil.format(parsed, PNF.E164);
        } catch (e) {
            parsed = null
        }

        return parsed;
    }

    /**
     * Get user data of given contacts (phone numbers)
     * @param {Array} phoneNumbers
     * @param {String} countryCode
     * @return {Array}
     */
    static parsePhoneNumbers(phoneNumbers, countryCode) {
        if (phoneNumbers.length < 1 || !Validate.isTypeValid(countryCode, 'string')) return [];

        var numbers = [];

        for (let i = 0; i < phoneNumbers.length; i++) {
            let phoneNumber = phoneNumbers[i];

            var number = {
                origin: phoneNumber,
                parsed: phoneNumber
            };

            try {
                phoneNumber = phoneUtil.parse(phoneNumber, countryCode);
                phoneNumber = phoneUtil.format(phoneNumber, PNF.INTERNATIONAL);
                number.parsed = phoneNumber;
            } catch (e) {
            }

            numbers.push(number);
        }

        return numbers;
    }

    /**
     * Add units to Date
     * @param {Date} date 
     * @param {String} interval 
     * @param {Number} units 
     * @returns {Date}
     */
    static dateAdd(date, interval, units) {
        var ret = new Date(date); //don't change original date
        var checkRollover = function() { if(ret.getDate() != date.getDate()) ret.setDate(0);};
        switch(interval.toLowerCase()) {
          case 'year'   :  ret.setFullYear(ret.getFullYear() + units); checkRollover();  break;
          case 'quarter':  ret.setMonth(ret.getMonth() + 3*units); checkRollover();  break;
          case 'month'  :  ret.setMonth(ret.getMonth() + units); checkRollover();  break;
          case 'week'   :  ret.setDate(ret.getDate() + 7*units);  break;
          case 'day'    :  ret.setDate(ret.getDate() + units);  break;
          case 'hour'   :  ret.setTime(ret.getTime() + units*3600000);  break;
          case 'minute' :  ret.setTime(ret.getTime() + units*60000);  break;
          case 'second' :  ret.setTime(ret.getTime() + units*1000);  break;
          default       :  ret = undefined;  break;
        }
        return ret;
    }

    /**
     * Safe parse a JSON string
     * @param {String} jsonString
     * @return {Object}
     */
    static JSONParse(jsonString) {
        var data = {};

        try {
            data = JSON.parse(jsonString);
        } catch (e) {
            return {};
        }

        return data;
    }

    /**
     * encrypt string
     * @param {String} text to be encrypted
     * @return {String} encrypted string
     */
    static encrypt(text) {
        var cipher = crypto.createCipher(config.crypto.algorithm, config.crypto.key);  
        var encrypted = cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
        return encrypted;
    }

    /**
     * decrypt string
     * @param {String} text to be decrypted
     * @return {String} decrypted string
     */
    static decrypt(text) {
        var decipher = crypto.createDecipher(config.crypto.algorithm, config.crypto.key);
        var decrypted = decipher.update(text, 'hex', 'utf8') + decipher.final('utf8');
        return decrypted;
    }

}
module.exports = Utils;
