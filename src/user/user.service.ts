import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { CreateUserResponseDto } from './dto/createUser.response.dto';
import { compareSync, hash } from 'bcrypt';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './dto/patchUser.dto';
import { GetUserDto } from './dto/getUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async createUser(userDto: CreateUserDto): Promise<CreateUserResponseDto> {
    try {
      const user = new User();
      const response = new CreateUserResponseDto();
      const hashPassword = await hash(userDto.password, 10);

      user.name = userDto.name;
      user.email = userDto.email;
      user.description = userDto.description;
      user.password = hashPassword;

      await this.userRepository.save(user);

      const token = await this.login(user.email, userDto.password);

      response.name = userDto.name;
      response.email = userDto.email;
      response.description = userDto.description;
      response.accessToken = token.accessToken;

      return response;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    const user = await this.getUserByEmail(email);
    console.log(user);
    if (!user || !this.isPasswordCorrect(password, user.password)) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id };
    const token = await this.jwtService.signAsync(payload);
    return {
      accessToken: token,
    };
  }

  async getUserInfo(token: string): Promise<GetUserDto> {
    const user = await this.getUserFromToken(token);
    const response = new GetUserDto();
    response.name = user.name;
    response.description = user.description;
    response.email = user.email;
    return response;
  }

  async patchUserInfo(token: string, patchUserDto: UpdateUserDto) {
    try {
      const user = await this.getUserFromToken(token);
      await this.userRepository.update(user.id, {
        name: patchUserDto.name,
        description: patchUserDto.description,
      });
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  // Metodo auxiliar para obter usuário a partir do bearer token
  private async getUserFromToken(authorization: string): Promise<User> {
    try {
      const token = authorization.split(' ')[1];
      const decoded = this.jwtService.decode(token);
      const user = await this.getUserById(decoded['sub']);
      return user;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  // Metodo auxiliar para obter usuário a partir da Id
  private async getUserById(id: string): Promise<User> {
    return await this.userRepository.findOneBy({ id: id });
  }

  // Metodo auxiliar para obter usuário a partir do email
  // Usado para fazer login do usuário através do email
  private async getUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneBy({ email: email });
  }

  // Metodo auxiliar para verificar se a senha e o hash armazenado na
  // database está valido
  private isPasswordCorrect(password: string, hash: string): boolean {
    return compareSync(password, hash);
  }
}
