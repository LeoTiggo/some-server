/*
 * @Author: tigoo 512045192@qq.com
 * @Date: 2022-08-13 16:42:44
 * @LastEditors: tigoo 512045192@qq.com
 * @LastEditTime: 2022-08-13 22:41:01
 * @FilePath: /some-server/src/modules/auth/jwt.strategy.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { jwtConstants } from './jwt.constants';
import { log } from 'console';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }
  async validate(payload: any) {
    log('validate payload', payload);
    return { id: payload.id };
  }
}
