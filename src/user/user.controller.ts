import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { CreateUserValidationPipe } from './validation-pipe/user-validation-pipe';

@Controller('/user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    @UsePipes(new CreateUserValidationPipe())
    async createUser(@Body() bodyRequest: CreateUserDto){
        return this.userService.createUser(bodyRequest)
    }

    
}
