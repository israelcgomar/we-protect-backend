'use strict';

import { BasicStrategy } from 'passport-http';
import mongoose from 'mongoose';

const Client = mongoose.model('Client');

export default new BasicStrategy(async (id, secret, done) => {
  try {
    const client = await Client.findOne({ id });
    if (!client || secret !== client.secret) return done(null, false);
    return done(null, client);
  } catch (error) {
    return done(error);
  }
});
