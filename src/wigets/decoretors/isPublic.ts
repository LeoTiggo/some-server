/*
 * @Author: tigoo 512045192@qq.com
 * @Date: 2022-08-13 17:03:47
 * @LastEditors: tigoo 512045192@qq.com
 * @LastEditTime: 2022-08-13 17:11:05
 * @FilePath: /some-server/src/wigets/decoretors/isPublic.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Injectable, SetMetadata } from '@nestjs/common';
export const IS_PUBLIC_KEY = 'isPublic';

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
