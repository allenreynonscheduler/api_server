// https://sarav.co/form-request-on-expressjs
const _ = require('lodash');
const Validator = require('validatorjs');

module.exports = (request, response, next, rules) => {

    const validation = new Validator(request.body, rules);

    if (validation.fails()) {
        const errors = {};
        _.each(validation.errors.errors, (error, key) => {
            errors[key] = error[0];
        });

        return {
            message: "Uh ooh! Please check the errors",
            errors: errors
        };
    }
    return null;
}