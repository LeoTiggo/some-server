/*
 * @Author: tigoo 512045192@qq.com
 * @Date: 2022-08-28 21:40:07
 * @LastEditors: tigoo 512045192@qq.com
 * @LastEditTime: 2022-08-28 21:48:02
 * @FilePath: /some-server/src/modules/info/info.module.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Module } from '@nestjs/common';
import { InfoService } from './info.service';
import { InfoController } from './info.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Info } from './entities/info.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Info])],
  controllers: [InfoController],
  providers: [InfoService],
})
export class InfoModule {}
