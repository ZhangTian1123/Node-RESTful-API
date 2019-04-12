'use strict';

class Validate {
    /**
     * Check if value is valid
     * @param {*} val
     * @returns {Boolean}
     */
    static isValid(val) {
        return !(val === undefined || val === null);
    }

    /**
     * Check if value is valid and is the right type
     * @param {*} val
     * @param {String} type
     * @returns {Boolean}
     */
    static isTypeValid(val, type) {
        var defined = !(val === undefined || val === null);

        if (type === 'date') {
            var d = new Date(val);
            return (defined && !isNaN(d.getMonth()));
        } else if (type === 'array') {
            return (defined && Array.isArray(val));
        } else {
            return (defined && typeof val === type);
        }
    }

    /**
     * Check if value not defined or defined with the right type
     * @param {*} val
     * @param {String} type
     * @returns {Boolean}
     */
    static isTypeValidOrNull(val, type) {
        var defined = !(val === undefined || val === null);
        if (!defined) return true;

        if (type === 'date') {
            var d = new Date(val);
            return (!isNaN(d.getMonth()));
        } else if (type === 'array') {
            return (Array.isArray(val));
        } else {
            return (typeof val === type);
        }
    }

    /**
     * Check if user is logged in
     * @param {Object} accessToken
     * @returns {Boolean}
     */
    static isLoggedIn(accessToken) {
        return (
            Validate.isValid(accessToken) &&
            Validate.isValid(accessToken.idAgent)
        );
    }
}
module.exports = Validate;
