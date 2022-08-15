/*
 * @Author: tigoo 512045192@qq.com
 * @Date: 2022-08-15 15:36:54
 * @LastEditors: tigoo 512045192@qq.com
 * @LastEditTime: 2022-08-15 17:10:59
 * @FilePath: /some-server/src/modules/file-download/file-download.service.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {
  BadRequestException,
  HttpException,
  Injectable,
  StreamableFile,
} from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import { tar } from 'compressing';
import { Response } from 'express';
// import { downloadDto } from './dto/file.download.dto';

@Injectable()
export class FileDownloadService {
  downloadFileByPipe(query, res) {
    const { filename } = query;
    console.log('res,downloaddto', filename);
    const filePath = join(
      process.cwd(),
      // `/fileDest/docFiles-1660537569080-201580296`,
      `/fileDest/${filename}`,
    );
    try {
      const file = createReadStream(filePath);
      file.pipe(res);
    } catch (error) {
      return new BadRequestException('未找到该文件');
    }
  }

  downloadFileByStream(query, res: Response) {
    const { filename } = query;
    const filePath = join(
      process.cwd(),
      // `/fileDest/docFiles-1660537569080-201580296`,
      `/fileDest/${filename}`,
    );
    const tarStream = new tar.Stream();
    tarStream.addEntry(filePath);
    tarStream.pipe(res);
  }
}
