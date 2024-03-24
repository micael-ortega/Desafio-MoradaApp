import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { CreateUserResponseDto } from './dto/createUser.response.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
   async createUser(userDto: CreateUserDto): Promise<CreateUserResponseDto> {
        const response =  new CreateUserResponseDto()
        
        const token = await hash(userDto.password,10)
        
        response.name = userDto.name
        response.email = userDto.email
        response.description = userDto.description
        response.accessToken = token

        return response
    }
}
