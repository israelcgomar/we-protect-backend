import Joi from 'joi';

module.exports = {
  _stepFive: Joi.object().keys({
    password: Joi.string().regex(/^[0-9.]{6}$/).required(),
    valPassword: Joi.string().regex(/^[0-9.]{6}$/).required(),
    idSession: Joi.string().regex(/^[0-9.]{6}$/).required(),
  })
}
