'use strict';

import mongoose from 'mongoose';
import path from 'path';
import fs from 'fs';

const $User = mongoose.model('User');


module.exports = {

  create: async (ctx) => {
    try {
      const user = await $User.find({userId: ctx.params.idUser});
      // valid user in DB
      if (user.length == 0) {
        ctx.body = { message: 'Invalid user' }
        return ctx.status = 400
      }

      const file = await ctx.request.body.files.file;
      const fileExt = '.'+(file.name.split('.').pop().toString())
      const fileVal = /(\.jpg|\.jpeg|\.png)$/i;
      const userNumber = ctx.params.idUser;
      const nameFile = 'foto_';

      if (!fileVal.exec(fileExt)) {
        ctx.body = { message: 'Invalid file' }
        return ctx.status = 400
      } else if (file.size >= 1000000) {
        ctx.body = { message: 'Invalid size file' }
        return ctx.status = 400
      } else {
        const reader =  await fs.createReadStream(file.path);
        const tmpDir = 'uploads/';
        const photoRoute = tmpDir + nameFile + userNumber + fileExt;
        const tmpFilePath =  path.join(tmpDir,`${nameFile + userNumber + fileExt}`);
        const stream = await fs.createWriteStream(tmpFilePath);
        await $User.findOneAndUpdate({ userId: userNumber }, { $set: { 'photo': photoRoute } });
        reader.pipe(stream);
        return ctx.status = 201
      }
    } catch (e) {
      ctx.body = {
        error: 'Oops, something went wrong. Please try again later'
      }
      return ctx.status = 500
    }
  },
  consult: async (ctx) => {
    try {
      const user = await $User.find({ userId: ctx.params.idUser });

      if (!user) {
        ctx.body = { message: 'user does not exist' }
        return ctx.status = 400
      } else if (!user[0].photo) {
        ctx.body = { message: 'The user does not have an assigned image.' }
        return ctx.status = 400
      }

      let image = await fs.readFileSync(user[0].photo);

      ctx.res.writeHead(200, {
         'Content-Type': (user[0].photo.split('.').pop() == 'png') ? 'image/png' : 'image/jpeg'
      });

      ctx.res.write(image, 'binary')
      ctx.res.end()

    } catch (e) {
        ctx.body = { error: 'Oops, something went wrong. Please try again later' }
        return ctx.status = 500;
    }
  }
}
