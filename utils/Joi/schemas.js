const Joi = require('joi');

module.exports = {
    /* Active Service */
    _consultSublistService: Joi.object().keys({
      phone: Joi.number().required(),
      idSession: Joi.number().required()
    }),
};
