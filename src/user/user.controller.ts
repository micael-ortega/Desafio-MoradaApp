import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UserValidationPipe } from './validation-pipe/user-validation-pipe';
import { LoginUserDto } from './dto/loginUser.dto';

@Controller('/user')
export class UserController {
    constructor(
        private readonly userService: UserService) { }

    @Post()
    @UsePipes(new UserValidationPipe())
    async createUser(@Body() bodyRequest: CreateUserDto) {
        return this.userService.createUser(bodyRequest)
    }

    @Post('login')

    async login(@Body() credentials: LoginUserDto) {
        console.log(credentials)
        return this.userService.login(credentials.email, credentials.password)
    }

}
