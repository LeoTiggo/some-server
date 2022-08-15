/*
 * @Author: liutianhao lth@ciqtek.com
 * @Date: 2022-08-10 10:53:21
 * @LastEditors: tigoo 512045192@qq.com
 * @LastEditTime: 2022-08-14 11:35:11
 * @FilePath: \some-server\src\app.module.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './modules/user/entities/user.entity';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './modules/auth/jwt.auth.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configSchemaValidator } from './utils/validators/config.schema';
import { FileUploadModule } from './modules/file-upload/file-upload.module';
console.log('process.env.STAGE', process.env.STAGE);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        '.env.stage.local',
        `.env.stage.${process.env.STAGE}`,
        '.env.stage.default',
      ],
      validationSchema: configSchemaValidator,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABSE'),
        autoLoadEntities: true,
        synchronize: configService.get('DB_SYC'),
      }),
    }),
    // TypeOrmModule.forRoot({
    //   // type: ConfigService,
    //   host: '47.100.244.103',
    //   port: 3306,
    //   username: 'root',
    //   password: 'lth7620432',
    //   database: 'th_db',
    //   autoLoadEntities: true,
    //   synchronize: true,
    // }),
    UserModule,
    AuthModule,
    FileUploadModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
