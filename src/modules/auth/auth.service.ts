/*
 * @Author: tigoo 512045192@qq.com
 * @Date: 2022-08-13 10:47:58
 * @LastEditors: tigoo 512045192@qq.com
 * @LastEditTime: 2022-08-13 17:14:06
 * @FilePath: /some-server/src/modules/auth/auth.service.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { BadRequestException, Injectable } from '@nestjs/common';
import { RegistAuthDto } from './dto/regist-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}
  async regist(registAuthDto: RegistAuthDto) {
    const testExistUser = await this.userRepository.findOne({
      where: { mobile: registAuthDto.mobile },
    });
    console.log('testExistUser', testExistUser, registAuthDto);

    if (testExistUser) {
      throw new BadRequestException('该用户已注册');
    }
    const salt = bcrypt.genSaltSync(4);
    const hash = await bcrypt.hash(registAuthDto.password, salt);

    const newUser = this.userRepository.create({
      mobile: registAuthDto.mobile,
      password: hash,
    });
    newUser.create_at = new Date();
    newUser.update_at = new Date();
    newUser.name = 'lj';
    return await this.userRepository.save(newUser);
  }
  async login(loginDto: LoginAuthDto) {
    // 校验密码账号是否正确
    const foundUser = await this.userRepository.findOne({
      where: { mobile: loginDto.mobile },
    });
    const pwdCorret = bcrypt.compareSync(loginDto.password, foundUser.password);

    if (!foundUser) {
      throw new BadRequestException('该用户不存在');
    }
    if (!pwdCorret) {
      throw new BadRequestException('用户密码错误');
    }
    // 返回jwt Token
    const token = this.jwtService.sign({ id: foundUser.id });
    return { ...foundUser, token };
  }
}
