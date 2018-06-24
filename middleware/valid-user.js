'use strict';

/* Dependencies */
import mongoose from 'mongoose';
import jwtDecode from 'jwt-decode';

const $User = mongoose.model('User');


export async function validUser(ctx, next) {
  try {

    return next();
  } catch (e) {
    ctx.status = 500;
    throw new Error(e);
  }
}
