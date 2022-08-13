/*
 * @Author: tigoo 512045192@qq.com
 * @Date: 2022-08-13 10:47:58
 * @LastEditors: tigoo 512045192@qq.com
 * @LastEditTime: 2022-08-13 12:20:25
 * @FilePath: /some-server/src/modules/auth/dto/regist-auth.dto.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { IsString, IsNotEmpty, Matches, Length } from 'class-validator';
export class RegistAuthDto {
  @IsNotEmpty({ message: '手机号不能为空' })
  @Matches(/^[1][3,4,5,6.7,8,9][0-9]{9}$/, {
    message: '手机号不合法',
  })
  mobile: string;
  @IsNotEmpty({ message: '密码不能为空' })
  @Length(6, 20)
  password: string;
}
