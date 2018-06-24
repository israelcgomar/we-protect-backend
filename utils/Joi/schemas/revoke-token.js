'use strict';

import Joi from 'joi';

module.exports = {
  /* Validate Revoke Token */
  _tokenRevoke: Joi.object().keys({
    token: Joi.string().required()
  })
};
