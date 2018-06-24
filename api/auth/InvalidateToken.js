import mongoose from 'mongoose';
import crypto from 'crypto';

const User = mongoose.model('User');
const RefreshToken = mongoose.model('RefreshToken');

export async function revokeToken(ctx) {
  try {
    const refreshTokenHash = crypto.createHash('sha1').update(ctx.request.body.token).digest('hex');
    const user = await RefreshToken.findOne({ token: refreshTokenHash });
    if (!user) {
      ctx.status = 400;
      return ctx.body = { error: 'Invalid Revoke Token' };
    }
    await User.findOneAndUpdate({ _id: user.user }, { $set: { active: false } });
    ctx.status = 200;
    return ctx.body = { active: false };
  } catch (e) {
    ctx.status = 500;
    return ctx.body = {
      error: 'Oops, something went wrong. Please try again later'
    };
  }
}
