/*
 * @Author: tigoo 512045192@qq.com
 * @Date: 2022-08-14 11:24:19
 * @LastEditors: tigoo 512045192@qq.com
 * @LastEditTime: 2022-08-14 11:28:48
 * @FilePath: /some-server/src/utils/validators/config.schema.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import * as joi from 'joi';

export const configSchemaValidator = joi.object({
  DB_TYPE: joi.string().default('mysql'),
  DB_HOST: joi.string().default('47.100.244.103'),
  DB_PORT: joi.number().default(3306),
  DB_USER: joi.string().default('root'),
  DB_PASSWORD: joi.string().default('lth7620432'),
  DB_DATABSE: joi.string().default('th_db'),
  DB_SYC: joi.boolean().default(true),
  JWT_SECRET: joi.string().default('jwt_secret'),
  JWT_EXPIRE: joi.number().default(36000),
});
