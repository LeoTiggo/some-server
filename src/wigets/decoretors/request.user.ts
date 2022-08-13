/*
 * @Author: tigoo 512045192@qq.com
 * @Date: 2022-08-13 22:32:18
 * @LastEditors: tigoo 512045192@qq.com
 * @LastEditTime: 2022-08-13 22:38:20
 * @FilePath: /some-server/src/wigets/decoretors/request.user.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createParamDecorator } from '@nestjs/common';
import {
  CustomParamFactory,
  ExecutionContext,
} from '@nestjs/common/interfaces';

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const http = ctx.switchToHttp();
    const req = http.getRequest();
    return req.user;
  },
);
