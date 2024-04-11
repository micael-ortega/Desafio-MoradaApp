import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  Patch,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UserValidationPipe } from './validation-pipe/user-validation-pipe';
import { LoginUserDto } from './dto/loginUser.dto';
import { UpdateUserDto } from './dto/patchUser.dto';
import { ThrottlerGuard } from '@nestjs/throttler';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new UserValidationPipe())
  async createUser(@Body() bodyRequest: CreateUserDto) {
    return this.userService.createUser(bodyRequest);
  }

  @UseGuards(ThrottlerGuard)
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
    const user = await this.userService.getUserFromToken(authorization);
    return this.userService.getUserInfo(user.id);
  }

  @Patch()
  async patchUserInfo(
    @Headers('authorization') authorization: string,
    @Body() updateuserDto: UpdateUserDto,
  ) {
    const user = await this.userService.getUserFromToken(authorization);
    return await this.userService.patchUserInfo(user.id, updateuserDto);
  }

  // Retorna o no content como status
  @HttpCode(204)
  @Delete()
  async deleteUser(@Headers('authorization') authorization: string) {
    const user = await this.userService.getUserFromToken(authorization);
    return await this.userService.deleteUser(user.id);
  }
}
