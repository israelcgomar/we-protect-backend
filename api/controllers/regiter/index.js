'use strict';

/* Dependencies */
import mongoose from 'mongoose';

/* Libs */
import codeFind from './serviceCode';

const $User = mongoose.model('User');
const $Post = mongoose.model('Post');

export async function registerUser(ctx) {
  try {
    const { firstName, lasName, username, email, userId, code, password } = ctx.request.body;
    const postalCodeFind = await codeFind(code);

    const isUser = await $User.findOne({ username: username });

    if (!isUser) {
      const usr = await $User.create({
        firstName: firstName,
        lastName: lasName,
        username: username,
        userId: userId,
        code: postalCodeFind.codigo_postal,
        municipality: postalCodeFind.municipio,
        state: postalCodeFind.estado,
        email: email,
        password: password
      });

      ctx.body = { register: usr };
      ctx.status = 200;
    } else if (isUser.username == username || isUser.userId == userId) {
      ctx.body = { error: 'El usuario o número de Telefono ya se encuentra en uso' };
      return ctx.status = 400;
    }
    return registerUser;
  } catch (error) {
    ctx.status = 500;
    throw new Error(error, 'Algo salío mal intente más tarde');
  }
}

export async function getUsers(ctx) {
  try {
    const user = await $User.find();
    ctx.body = { user };
    ctx.status = 200;
  } catch (error) {
    ctx.status = 500;
    throw new Error('Ha ocurriedo un error intenete más tarde.')
  }
}