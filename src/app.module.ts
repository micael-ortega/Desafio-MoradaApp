import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entity/user.entity';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'db',
    port: 5432,
    username: 'admin',
    password: '123',
    database: 'moradaDb',
    entities: [User],
    synchronize: true,
  }),
    UserModule],


})
export class AppModule { }
