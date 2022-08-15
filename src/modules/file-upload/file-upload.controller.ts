/*
 * @Author: tigoo 512045192@qq.com
 * @Date: 2022-08-15 11:23:30
 * @LastEditors: tigoo 512045192@qq.com
 * @LastEditTime: 2022-08-15 12:04:21
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
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { Public } from 'src/wigets/decoretors/isPublic';
import { FileUploadService } from './file-upload.service';

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
}
