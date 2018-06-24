'use strict';

import mongoose from 'mongoose';

const CommentsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    comment: {
      type: String,
      required: true
    },
    createdAt: {
      type: String,
      required: true
    }
  },
);

mongoose.model('Comments', CommentsSchema);
