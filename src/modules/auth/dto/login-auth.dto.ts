/*
 * @Author: tigoo 512045192@qq.com
 * @Date: 2022-08-13 10:47:58
 * @LastEditors: tigoo 512045192@qq.com
 * @LastEditTime: 2022-08-14 23:25:59
 * @FilePath: /some-server/src/modules/auth/dto/login-auth.dto.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { PartialType } from '@nestjs/mapped-types';
import { RegistAuthDto } from './regist-auth.dto';
import { IsString, IsNotEmpty, Matches, Length } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LoginAuthDto {
  @IsNotEmpty({ message: '手机号不能为空' })
  @Matches(/^[1][3,4,5,6.7,8,9][0-9]{9}$/, {
    message: '手机号不合法',
  })
  @ApiProperty({
    default: '15955483015',
    description: '手机号',
    example: '15955483015',
  })
  mobile: string;
  @IsNotEmpty({ message: '密码不能为空' })
  @ApiProperty({
    description: '密码',
    example: '2211112',
  })
  password: string;
}
