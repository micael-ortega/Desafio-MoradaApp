import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { CreateUserResponseDto } from './dto/createUser.response.dto';
import { hash } from 'bcrypt';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>) { }

    async createUser(userDto: CreateUserDto): Promise<CreateUserResponseDto> {

        const user = new User()

        const response = new CreateUserResponseDto()

        const token = await hash(userDto.password, 10)

        user.name = userDto.name
        user.email = userDto.email
        user.description = userDto.description
        user.password = token

        await this.userRepository.save(user)

        response.name = userDto.name
        response.email = userDto.email
        response.description = userDto.description
        response.accessToken = token

        return response
    }


}
