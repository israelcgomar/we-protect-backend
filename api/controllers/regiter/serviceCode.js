'use strict';

import rp from 'request-promise';

export default async function postalCode(code) {
  const options = {
    uri: `https://api-codigos-postales.herokuapp.com/v2/codigo_postal/${code}`,
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json: true
  };
  const result = await rp(options).then((data) => data).catch((err) => err);
  return result;
}
