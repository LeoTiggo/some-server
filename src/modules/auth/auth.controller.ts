/*
 * @Author: tigoo 512045192@qq.com
 * @Date: 2022-08-13 10:47:58
 * @LastEditors: tigoo 512045192@qq.com
 * @LastEditTime: 2022-08-13 14:04:09
 * @FilePath: /some-server/src/modules/auth/auth.controller.ts
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
  Bind,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistAuthDto } from './dto/regist-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('regist')
  regist(@Body() registAuthDto: RegistAuthDto) {
    return this.authService.regist(registAuthDto);
  }

  @Post('login')
  @Bind(Body())
  login(loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
    // return this.authService.findAll();
  }
}
