'use strict';

import mongoose from 'mongoose';
import moment from 'moment'
import random_name from 'node-random-name';

const $Post = mongoose.model('Post');

export async function newPost(ctx) {
  try {
    const { title, description, length, latitude, place, date } = ctx.request.body;
    const newDate = moment().format('LLL');
    const createPost = await $Post.create({
      name: random_name(),
      title: title,
      description: description,
      length: length,
      latitude: latitude,
      place: place,
      createdAt: newDate
    });
    
    return ctx.status = 201;
  } catch (error) {
    throw new Error(error, 'Algo salío mal intente más tarde.');
  }
}

export async function getPost(ctx) {
  try {
    const post = await $Post.find();
    ctx.body = { post };
    ctx.status = 200;
  } catch (error) {
    ctx.status = 500;
    throw new Error('Ha ocurriedo un error intenete más tarde.');
  }
}
