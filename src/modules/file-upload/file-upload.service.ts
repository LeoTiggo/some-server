/*
 * @Author: tigoo 512045192@qq.com
 * @Date: 2022-08-15 11:23:30
 * @LastEditors: tigoo 512045192@qq.com
 * @LastEditTime: 2022-08-15 12:04:10
 * @FilePath: /some-server/src/modules/file-upload/file-upload.service.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Injectable } from '@nestjs/common';

@Injectable()
export class FileUploadService {
  uploadFile(reqBody, file) {
    console.log(reqBody, file);

    return 'This action adds a new fileUpload';
  }

  uploadFiles(reqBody, files) {
    console.log(reqBody, files);
    return `This action returns all fileUpload`;
  }
  mutilFiles(body, mutilFiles) {
    console.log(body, mutilFiles);

    return `This action returns all fileUpload mutilFiles`;
  }
}
