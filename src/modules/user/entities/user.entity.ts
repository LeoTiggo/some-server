/*
 * @Author: liutianhao lth@ciqtek.com
 * @Date: 2022-08-10 11:02:15
 * @LastEditors: liutianhao lth@ciqtek.com
 * @LastEditTime: 2022-08-10 11:19:37
 * @FilePath: \some-server\src\modules\user\entities\user.entity.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  mobile: string;
  @Column()
  password: string;
  @Column()
  create_at: Date;
  @Column()
  update_at: Date;
}
