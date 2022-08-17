import { Express } from 'express';
/*
 * @Author: tigoo 512045192@qq.com
 * @Date: 2022-08-15 11:23:30
 * @LastEditors: tigoo 512045192@qq.com
 * @LastEditTime: 2022-08-17 16:07:55
 * @FilePath: /some-server/src/modules/file-upload/file-upload.controller.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  ParseFilePipeBuilder,
  HttpStatus,
  UploadedFiles,
  Bind,
  Res,
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { diskStorage, memoryStorage } from 'multer';

import { Public } from 'src/wigets/decoretors/isPublic';
import { FileUploadService } from './file-upload.service';
const path = require('path');
// const chunksStorage = diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(process.cwd(), '/public/chunkDir/'));
//   },
//   filename: function (req, file, cb) {
//     debugger;
//     cb(null, file.fieldname + '-' + Date.now());
//   },
// });
const chunksStorage = memoryStorage();
@Controller('upload')
@Public()
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post('file')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @Body() body,
    @UploadedFile(
      // new ParseFilePipe({
      //   validators: [
      //     new MaxFileSizeValidator({ maxSize: 1024 * 1024 }),
      //     new FileTypeValidator({ fileType: 'doc' }),
      //   ],
      // }),
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: 'doc' })
        .addMaxSizeValidator({ maxSize: 1024 * 1024 })
        .build({ errorHttpStatusCode: HttpStatus.FORBIDDEN }),
    )
    file: Express.Multer.File,
  ) {
    return this.fileUploadService.uploadFile(body, file);
  }

  @Post('files')
  @UseInterceptors(FilesInterceptor('file', 3))
  uploadFiles(
    @Body() body,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.fileUploadService.uploadFiles(body, files);
  }

  @Post('multiFiles')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'xlsFiles', maxCount: 1 },
      { name: 'docFiles', maxCount: 2 },
    ]),
  )
  mutilFiles(
    @Body() body,
    @UploadedFiles()
    files: {
      xlsFiles?: Array<Express.Multer.File>;
      docFiles?: Array<Express.Multer.File>;
    },
  ) {
    return this.fileUploadService.mutilFiles(body, files);
  }
  @Post('big')
  @UseInterceptors(
    FileInterceptor('chunk', {
      storage: chunksStorage,
    }),
  )
  bigFilesUpload(
    @Body() body,
    @UploadedFile()
    file: // new ParseFilePipeBuilder()
    //   .addFileTypeValidator({ fileType: 'zip' })
    //   .addMaxSizeValidator({ maxSize: 5 * 1024 * 1024 })
    //   .build({ errorHttpStatusCode: HttpStatus.BAD_GATEWAY }),
    Express.Multer.File,
  ) {
    return this.fileUploadService.bigFilesUpload(body, file);
  }
  @Post('bigmerge')
  @Bind(Body())
  async bigFilesMerge(mergeParams) {
    console.log('before merge');

    const ress = await this.fileUploadService.bigFilesMerge(mergeParams);
    console.log('after merge', ress);
    return ress;
  }
}
