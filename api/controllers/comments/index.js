'use strict';

import mongoose from 'mongoose';
import moment from 'moment';
import random_name from "node-random-name";

const $Comment = mongoose.model('Comments');
const newDate = moment().format("LLL");
export async function newComment(ctx) {
  const { name, comment, createdAt } = ctx.request.body;
  await $Comment.create({ name: random_name(), comment: comment, createdAt: newDate });
  ctx.status = 201;
}

export async function getComment(ctx) {
  const allComments = await $Comment.find();
  ctx.body = { comments: allComments, createdAt: newDate };
  ctx.status = 200;
}
