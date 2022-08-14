import { Logger } from '@nestjs/common';
/*
 * @Author: tigoo 512045192@qq.com
 * @Date: 2022-08-13 10:39:12
 * @LastEditors: tigoo 512045192@qq.com
 * @LastEditTime: 2022-08-14 23:18:36
 * @FilePath: /some-server/src/modules/user/user.controller.ts
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
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { log } from 'console';
import { GetUser } from 'src/wigets/decoretors/request.user';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('user')
@ApiBearerAuth('jWT')
export class UserController {
  constructor(private readonly userService: UserService) {}
  logger = new Logger('userController');
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(@GetUser() req: any) {
    this.logger.log('visit userList');
    log(' validate req', req);
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
