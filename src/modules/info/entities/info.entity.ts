import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/*
 * @Author: tigoo 512045192@qq.com
 * @Date: 2022-08-28 21:40:07
 * @LastEditors: tigoo 512045192@qq.com
 * @LastEditTime: 2022-08-29 08:41:52
 * @FilePath: /some-server/src/modules/info/entities/info.entity.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
@Entity()
export class Info {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  userid: string;
  @Column()
  description: string;
  @Column()
  pic: string;
}
