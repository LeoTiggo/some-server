/*
 * @Author: tigoo 512045192@qq.com
 * @Date: 2022-08-15 15:36:54
 * @LastEditors: tigoo 512045192@qq.com
 * @LastEditTime: 2022-08-15 17:11:22
 * @FilePath: /some-server/src/modules/file-download/file-download.controller.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res,
} from '@nestjs/common';
import { query, Response } from 'express';
import { Public } from 'src/wigets/decoretors/isPublic';
// import { downloadDto } from './dto/file.download.dto';
import { FileDownloadService } from './file-download.service';

@Controller('download')
@Public()
export class FileDownloadController {
  constructor(private readonly fileDownloadService: FileDownloadService) {}

  @Get('filePipe')
  downloadFileByPipe(@Res() res, @Query() query) {
    // console.log(filename);

    // const downloadParam = { filename };
    return this.fileDownloadService.downloadFileByPipe(query, res);
  }

  @Get('fileStream')
  downloadFileByStream(@Query() query, @Res() res: Response) {
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${query.filename}.hello.zip`,
    );
    return this.fileDownloadService.downloadFileByStream(query, res);
  }
}
