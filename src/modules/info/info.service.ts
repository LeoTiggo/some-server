import { User } from './../user/entities/user.entity';
/*
 * @Author: tigoo 512045192@qq.com
 * @Date: 2022-08-28 21:40:07
 * @LastEditors: tigoo 512045192@qq.com
 * @LastEditTime: 2022-08-29 09:45:53
 * @FilePath: /some-server/src/modules/info/info.service.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createQuery } from 'mysql2/typings/mysql/lib/Connection';
import {
  createQueryBuilder,
  DataSource,
  QueryBuilder,
  Repository,
} from 'typeorm';
import { CreateInfoDto } from './dto/create-info.dto';
import { UpdateInfoDto } from './dto/update-info.dto';
import { Info } from './entities/info.entity';

@Injectable()
export class InfoService {
  constructor(
    @InjectRepository(Info) private readonly infoRepository: Repository<Info>,
  ) {}
  async create(createInfoDto: CreateInfoDto) {
    const newInfo = this.infoRepository.create(createInfoDto);
    return await this.infoRepository.save(newInfo);
  }

  findAll() {
    return this.infoRepository.find();
  }

  async findOne(id: string) {
    console.log(id);

    const info = await this.infoRepository.findOne({ where: { userid: id } });
    return info;
  }

  async update(id: string, updateInfoDto: UpdateInfoDto) {
    if (!id) {
      throw new BadRequestException('无userid 无法更新');
    }
    const infoEntity = await this.infoRepository.findOne({
      where: { userid: id },
    });
    if (!infoEntity) {
      throw new BadRequestException('无记录');
    }
    if (updateInfoDto.pic) {
      infoEntity.pic = updateInfoDto.pic;
    }
    if (updateInfoDto.description) {
      infoEntity.description = updateInfoDto.description;
    }
    return await this.infoRepository.save(infoEntity);
  }

  async remove(id: string) {
    if (!id) {
      throw new BadRequestException('无id');
    }
    const { affected } = await this.infoRepository.delete(id);
    return affected;
  }
  async unitUser(query) {
    let res;
    const qb = await this.infoRepository
      .createQueryBuilder('i')
      .leftJoinAndMapOne('i.userinfo', User, 'u', 'u.id = :queryid', {
        queryid: query.id,
      })
      .getMany();
    return qb;
  }
}
