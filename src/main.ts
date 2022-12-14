/*
 * @Author: tigoo 512045192@qq.com
 * @Date: 2022-08-09 21:22:47
 * @LastEditors: tigoo 512045192@qq.com
 * @LastEditTime: 2022-08-16 15:17:29
 * @FilePath: /some-server/src/main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from './wigets/pipes/validation.pipe';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  const port = 3000;
  // 使用管道校验器
  app.useGlobalPipes(new ValidationPipe());

  // 添加swagger
  const config = new DocumentBuilder()
    .setTitle('tigoo api docs')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('nest_server')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        name: 'JWT name',
        description: 'jwt_token',
        bearerFormat: 'jwt',
      },
      'jWT',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // 启动端口
  await app.listen(port);
  app.enableCors();
  logger.log(`app started on ${port}`);
}
bootstrap();
