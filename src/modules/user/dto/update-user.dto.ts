/*
 * @Author: liutianhao lth@ciqtek.com
 * @Date: 2022-08-10 11:02:15
 * @LastEditors: liutianhao lth@ciqtek.com
 * @LastEditTime: 2022-08-10 17:56:43
 * @FilePath: \some-server\src\modules\user\dto\update-user.dto.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  id: number;
}
