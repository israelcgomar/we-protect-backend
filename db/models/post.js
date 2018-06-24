'use strict';

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PostSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    description: {
      type: String,
      required: true
    },
    length: {
      type: String,
      required: true
    },
    latitude: {
      type: String,
      required: true
    },
    place: {
      type: String,
      required: true
    },
    createdAt: {
      type: String,
      required: true
    }
  },
  {
    // timestamps: {
    //   createdAt: 'created_at',
    //   updatedAt: 'updated_at'
    // }
  }
);

mongoose.model('Post', PostSchema);
