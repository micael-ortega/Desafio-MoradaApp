import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { ValidationPipe } from 'src/validation-pipe/validation-pipe';

@Controller('/user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async createUser(@Body(new ValidationPipe()) bodyRequest: CreateUserDto){
        return this.userService.createUser(bodyRequest)
    }
}
