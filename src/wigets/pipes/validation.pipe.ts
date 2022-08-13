/*
 * @Author: tigoo 512045192@qq.com
 * @Date: 2022-08-13 12:55:40
 * @LastEditors: tigoo 512045192@qq.com
 * @LastEditTime: 2022-08-13 13:32:40
 * @FilePath: /some-server/src/wigets/validation.pipe.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;
    if (!metatype || !this.toValidate) {
      return value;
    }
    // 开始校验
    const objects = plainToInstance(metatype, value);
    const errors = await validate(objects);

    if (errors.length > 0) {
      throw new BadRequestException(Object.values(errors[0].constraints));
    }
    return value;
  }
  // 验证是否是枚举的类型之一
  toValidate(metatype: Function) {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
