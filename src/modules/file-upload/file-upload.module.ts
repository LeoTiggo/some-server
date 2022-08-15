/*
 * @Author: tigoo 512045192@qq.com
 * @Date: 2022-08-15 11:23:30
 * @LastEditors: tigoo 512045192@qq.com
 * @LastEditTime: 2022-08-15 17:22:15
 * @FilePath: /some-server/src/modules/file-upload/file-upload.module.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Module } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileUploadController } from './file-upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { Express } from 'express';
import multer from 'multer';
import { diskStorage } from 'multer';

const multerStorage = diskStorage({
  // destination: function (req, file, cb) {
  //   cb(null, './../../../fileDest');
  // },
  destination: './fileDest',
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.filename +
        '_' +
        file.fieldname +
        '-' +
        uniqueSuffix +
        '.' +
        file.mimetype.split('/')[1],
    );
  },
});
@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: () => ({
        storage: multerStorage,
      }),
    }),
  ],
  controllers: [FileUploadController],
  providers: [FileUploadService],
})
export class FileUploadModule {}
