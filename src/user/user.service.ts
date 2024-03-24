import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { CreateUserResponseDto } from './dto/createUser.response.dto';
import { compareSync, hash } from 'bcrypt';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService) { }

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

    async getUserByEmail(email: string): Promise<User> {
        return await this.userRepository.findOneBy({ email: email })
    }

    async login(email: string, password: string): Promise<{ accessToken: string }> {
        const user = await this.getUserByEmail(email)

        if (!password || !this.isPasswordCorrect(password, user.password)) {
            throw new UnauthorizedException()
        }
        const payload = { sub: user.id };
        return {
            accessToken: await this.jwtService.signAsync(payload)

        }

    }

    private isPasswordCorrect(password: string, hash: string): boolean {
        return compareSync(password, hash)
    }
}
