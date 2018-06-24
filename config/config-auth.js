'use strict';

export default Object.freeze({
  secret: process.env.TOKEN_SECRET || 'secret-jwt-token',
  tokenExpiration: process.env.TOKEN_EXPIRATION || 600,
  refreshTokenExpiration: process.env.REFRESH_TOKEN_EXPIRATION || 1200,
  basicAuthName: process.env.BASIC_NAME,
  basicAuthPass: process.env.BASIC_PASS
});
