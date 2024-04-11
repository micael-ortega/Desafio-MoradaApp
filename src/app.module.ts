import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entity/user.entity';
import { CryptModule } from './addon/crypt.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any ,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT  as any,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User],
      synchronize: true,
    }),
    UserModule,
    CryptModule,
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 10,
    }]
  
  ),

  ],
})
export class AppModule {}

