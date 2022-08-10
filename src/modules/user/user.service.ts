/*
 * @Author: liutianhao lth@ciqtek.com
 * @Date: 2022-08-10 11:02:15
 * @LastEditors: liutianhao lth@ciqtek.com
 * @LastEditTime: 2022-08-10 18:19:37
 * @FilePath: \some-server\src\modules\user\user.service.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const existUser = await this.userRepository.find({
      where: {
        mobile: createUserDto.mobile,
      },
    });
    console.log('existUser', existUser);

    if (existUser.length !== 0) {
      throw new BadRequestException('bad', '已存在该用户');
    }
    const user = this.userRepository.create(createUserDto);
    if (user) {
      user.create_at = new Date();
      user.update_at = new Date();
      console.log('INSERT');

      return this.userRepository.save(user);
    }
  }

  findAll() {
    return this.userRepository.find();
    // return `This action returns all user`;
  }

  async findOne(id: number) {
    const findUser = await this.userRepository.findOneBy({ id });
    if (findUser) {
      return findUser;
    } else {
      throw new BadRequestException('没有查找到该用户');
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const updateUser = await this.userRepository.findOneBy({
      id,
    });
    if (updateUser) {
      if (updateUserDto.mobile) {
        updateUser.mobile = updateUserDto.mobile;
      }
      if (updateUserDto.name) {
        updateUser.name = updateUserDto.name;
      }
      if (updateUserDto.password) {
        updateUser.password = updateUserDto.password;
      }
      return this.userRepository.save(updateUser);
    } else {
      throw new BadRequestException('bad request', '未查找到该用户');
    }
  }

  async remove(id: number) {
    const deleteRes = await this.userRepository.delete(id);
    if (deleteRes.affected > 0) {
      return 'delete Successfully';
    }
  }
}
