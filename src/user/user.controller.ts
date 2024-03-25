import {
  Body,
  Controller,
  Get,
  Headers,
  Patch,
  Post,
  UsePipes,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UserValidationPipe } from './validation-pipe/user-validation-pipe';
import { LoginUserDto } from './dto/loginUser.dto';
import { UpdateUserDto } from './dto/patchUser.dto';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new UserValidationPipe())
  async createUser(@Body() bodyRequest: CreateUserDto) {
    return this.userService.createUser(bodyRequest);
  }

  @Post('login')
  @UsePipes(new UserValidationPipe())
  async login(@Body() credentials: LoginUserDto) {
    return await this.userService.login(
      credentials.email,
      credentials.password,
    );
  }

  @Get()
  async getUserInfo(@Headers('authorization') authorization: string) {
    const token = authorization.split(' ')[1];
    return this.userService.getUserInfo(token);
  }

  @Patch()
  async patchUserInfo(
    @Headers('authorization') authorization: string,
    @Body() updateuserDto: UpdateUserDto,
  ) {
    const token = authorization.split(' ')[1];
    return await this.userService.patchUserInfo(token, updateuserDto);
  }
}
