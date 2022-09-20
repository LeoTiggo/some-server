/*
 * @Author: tigoo 512045192@qq.com
 * @Date: 2022-08-28 21:40:07
 * @LastEditors: tigoo 512045192@qq.com
 * @LastEditTime: 2022-08-29 09:40:01
 * @FilePath: /some-server/src/modules/info/info.controller.ts
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
  SetMetadata,
  Bind,
  Query,
} from '@nestjs/common';
import { InfoService } from './info.service';
import { CreateInfoDto } from './dto/create-info.dto';
import { UpdateInfoDto } from './dto/update-info.dto';
import { IS_PUBLIC_KEY } from './../../wigets/decoretors/isPublic';
import { query } from 'express';

@Controller('info')
@SetMetadata(IS_PUBLIC_KEY, true)
export class InfoController {
  constructor(private readonly infoService: InfoService) {}

  @Post()
  create(@Body() createInfoDto: CreateInfoDto) {
    return this.infoService.create(createInfoDto);
  }
  @Get()
  findAll() {
    return this.infoService.findAll();
  }
  @Get('andUser')
  @Bind(Query())
  getUnitInfo(query) {
    return this.infoService.unitUser(query);
  }
  @Get(':id')
  async findOne(@Param('id') id: number) {
    debugger;
    return await this.infoService.findOne(`${id}`);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInfoDto: UpdateInfoDto) {
    return this.infoService.update(id, updateInfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.infoService.remove(id);
  }
}
