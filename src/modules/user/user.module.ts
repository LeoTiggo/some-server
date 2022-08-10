/*
 * @Author: liutianhao lth@ciqtek.com
 * @Date: 2022-08-10 11:02:15
 * @LastEditors: liutianhao lth@ciqtek.com
 * @LastEditTime: 2022-08-10 11:25:10
 * @FilePath: \some-server\src\modules\user\user.module.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
