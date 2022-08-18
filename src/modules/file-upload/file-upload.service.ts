import { BadRequestException } from '@nestjs/common';
/*
 * @Author: tigoo 512045192@qq.com
 * @Date: 2022-08-15 11:23:30
 * @LastEditors: tigoo 512045192@qq.com
 * @LastEditTime: 2022-08-18 09:33:42
 * @FilePath: /some-server/src/modules/file-upload/file-upload.service.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Injectable } from '@nestjs/common';
import { constants, createReadStream, createWriteStream, unlinkSync } from 'fs';
import { access, mkdir, readdir, rmdir, writeFile } from 'fs/promises';
// const fse = require('fs-extra');
const path = require('path');
// 定义大文件存储目录
const BIGFILEDIRS = path.join(process.cwd(), 'bigUpload');
@Injectable()
export class FileUploadService {
  extractExt = (filename) =>
    filename.slice(filename.lastIndexOf('.'), filename.length);
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
  async bigFilesUpload(body, file) {
    // console.log('body,file', body, file);
    const { filename, hash } = body; // 文件的名称和切片的标识
    // 创建大文件的目录
    const bigPath = path.resolve(BIGFILEDIRS, 'chunkDir', filename);
    // 查找大文件目录，不存在则创建
    // fse
    try {
      await access(bigPath, constants.W_OK | constants.W_OK);
    } catch (error) {
      await mkdir(bigPath, { recursive: true });
    }
    //  写入分片文件
    try {
      await writeFile(path.join(bigPath, hash), file.buffer);
      return 'write chunk successfully';
    } catch (error) {
      console.log('error', error);
      return 'wirte chunk failed';
    }
  }

  async bigFilesMerge(mergeParams) {
    const { filename, size, fileHash } = mergeParams;
    if (!filename || !size) throw new BadRequestException('合并文件参数缺失');
    // 根据客户端的请求合并文件名进行路径拼接
    const chunksDir = path.resolve(BIGFILEDIRS, 'chunkDir', fileHash); //最终合并文件的路径
    // 获取所有切片的路径
    try {
      const chunksPaths: string[] = await readdir(chunksDir);
      // 切片排序
      // chunksPaths.sort((a, b) => {
      //   const achunkIdx = this.getChunkFileIdx(a);
      //   const bchunkIdx = this.getChunkFileIdx(b);
      //   return achunkIdx - bchunkIdx;
      // });
      // 通过流的形式写入合并文件
      const resFile = path.resolve(
        BIGFILEDIRS,
        `${fileHash}.${this.extractExt(filename)}`,
      );
      await Promise.all(
        chunksPaths.map((chunkpath, idx) => {
          return new Promise((resolve, reject) => {
            const readStream = createReadStream(
              path.resolve(chunksDir, chunkpath),
            );
            readStream.on('end', async () => {
              await unlinkSync(path.resolve(chunksDir, chunkpath));
              resolve(null);
            });
            console.log('当前读流的切片', idx);

            const mergeFile = createWriteStream(resFile, { start: idx * size });
            readStream.pipe(mergeFile);
          });
        }),
      );
      console.log('切片合成完毕');
      // 合并后删除
      await rmdir(chunksDir);
      console.log('delete chunksDir');
    } catch (error) {
      throw new BadRequestException('获取切片路径出错');
      return '获取切片路径出错';
    }
    console.log('finished mergeFile');

    return '合并文件已成功';
  }
  getChunkFileIdx(chunkname: string) {
    const SIG = '-';
    const nameArr = chunkname.split(SIG);
    return +nameArr[nameArr.length - 1];
  }
  async checkFileExist(checkParams) {
    const { filename, fileHash } = checkParams;
    let shoudUpload: boolean;
    let uploadedFile: any[] = [];
    console.log('checkExist', filename, fileHash);

    if (!filename || !fileHash)
      throw new BadRequestException('文件参数校验不完整');
    //  检查合并文件
    const mergeFile = path.resolve(
      BIGFILEDIRS,
      `${fileHash}.${this.extractExt(filename)}`,
    );
    try {
      await access(mergeFile, constants.W_OK | constants.R_OK);
      console.log('shouldUpload', false);

      shoudUpload = false;
    } catch (error) {
      console.log('not shouldUpload', error);
      shoudUpload = true;
    }
    // 获取已上传分片
    if (shoudUpload) {
      const uploadedChunkDir = path.resolve(BIGFILEDIRS, 'chunkDir', fileHash);
      try {
        uploadedFile = await readdir(uploadedChunkDir);
      } catch (error) {
        uploadedFile = [];
      }
    }
    return { shoudUpload, uploadedFile };
  }
}
