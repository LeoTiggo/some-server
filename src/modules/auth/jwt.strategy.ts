/*
 * @Author: tigoo 512045192@qq.com
 * @Date: 2022-08-13 16:42:44
 * @LastEditors: tigoo 512045192@qq.com
 * @LastEditTime: 2022-08-14 11:37:07
 * @FilePath: /some-server/src/modules/auth/jwt.strategy.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { jwtConstants } from './jwt.constants';
import { log } from 'console';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
@Injectable() //注意一定要加装饰器， 否则构造函数中的configService 就失效 not Work
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }
  async validate(payload: any) {
    log('validate payload', payload);
    return { id: payload.id };
  }
}
