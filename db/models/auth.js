'use strict';

import mongoose from 'mongoose';

const authSchema = new mongoose.Schema({
  basic_name: {
    type:String, required: true
  },
  basic_pass: {
    type: String,
    unique: true,
    required: true
  },
  pass_base_64: {
    type: String,
    required: true
  },
  token_secret: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    required: true
  }
});

mongoose.model('Auth', authSchema);
