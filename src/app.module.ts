import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entity/user.entity';
import { CryptModule } from './addon/crypt.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: process?.env.DB_TYPE as any || 'postgres' ,
      host: process?.env.DB_HOST as any || 'localhost',
      port: process?.env.DB_PORT as any || 5432,
      username: process?.env.DB_USERNAME as any|| 'admin',
      password: process?.env.DB_PASSWORD as any || '123',
      database: process?.env.DB_NAME as any || 'moradaDb',
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

