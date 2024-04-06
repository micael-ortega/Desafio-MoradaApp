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
import { jwtConstants } from '../../constants';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async createUser(
    createUserDto: CreateUserDto,
  ): Promise<CreateUserResponseDto> {
    try {
      const plainPassword = createUserDto.password;
      createUserDto.password = await hash(createUserDto.password, 10);

      await this.userRepository.save(createUserDto);

      const response = new CreateUserResponseDto();

      const token = await this.login(createUserDto.email, plainPassword);

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
    if (!user || !this.isPasswordCorrect(password, user.password)) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id };
    const token = await this.jwtService.signAsync(payload);
    return {
      accessToken: token,
    };
  }

  async getUserInfo(userId: string): Promise<GetUserDto> {
    try {
      const user = await this.getUserById(userId);
      const response = new GetUserDto();
      response.name = user.name;
      response.description = user.description;
      response.email = user.email;
      return response;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async patchUserInfo(userId: string, patchUserDto: UpdateUserDto) {
    try {
      await this.userRepository.update(userId, {
        name: patchUserDto.name,
        description: patchUserDto.description,
      });
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async deleteUser(userId: string) {
    try {
      await this.userRepository.delete(userId);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  // Metodo auxiliar para obter usuário a partir do bearer token
  async getUserFromToken(authorizationHeader: string): Promise<User> {
    const token = authorizationHeader.split(' ')[1];
    const decoded = this.jwtService.decode(token);
    if (!this.isTokenValid(token)) {
      throw new UnauthorizedException();
    }
    try {
      const user = await this.getUserById(decoded.sub);
      if (!user) {
        throw new UnauthorizedException();
      }

      return user;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  // Metodo auxiliar para validação do token
  isTokenValid(token: string): boolean {
    try {
      this.jwtService.verify(token, {secret: jwtConstants.secret, ignoreExpiration: false});
      return true;
    } catch (error) {
      return false;
    }
  }

  // Metodo auxiliar para obter usuário a partir da Id
  async getUserById(id: string): Promise<User> {
    return await this.userRepository.findOneBy({ id: id });
  }

  // Metodo auxiliar para obter usuário a partir do email
  // Usado para fazer login do usuário através do email
  async getUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneBy({ email: email });
  }

  // Metodo auxiliar para verificar se a senha e o hash armazenado na
  // database está valido
  isPasswordCorrect(password: string, hash: string): boolean {
    return compareSync(password, hash);
  }
}
