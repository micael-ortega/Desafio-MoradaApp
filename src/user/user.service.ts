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
  ) { }

  async createUser(
    createUserDto: CreateUserDto,
  ): Promise<CreateUserResponseDto> {
    try {
      const plainPassword = createUserDto.password;
      createUserDto.password = await hash(createUserDto.password, 10);

      await this.userRepository.save(createUserDto);

      const response = new CreateUserResponseDto();

      const token = await this.login(createUserDto.email, plainPassword);

      response.name = createUserDto.name;
      response.email = createUserDto.email;
      response.description = createUserDto.description;
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

  async getUserInfo(authorizationHeader: string): Promise<GetUserDto> {
    const user = await this.getUserFromToken(authorizationHeader);
    const response = new GetUserDto();
    response.name = user.name;
    response.description = user.description;
    response.email = user.email;
    return response;
  }

  async patchUserInfo(
    authorizationHeader: string,
    patchUserDto: UpdateUserDto,
  ) {
    try {
      const user = await this.getUserFromToken(authorizationHeader);
      await this.userRepository.update(user.id, {
        name: patchUserDto.name,
        description: patchUserDto.description,
      });
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async deleteUser(authorizationHeader: string) {
    try {
      const user = await this.getUserFromToken(authorizationHeader);
      await this.userRepository.delete(user.id);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  // Metodo auxiliar para obter usuário a partir do bearer token
  private async getUserFromToken(authorizationHeader: string): Promise<User> {
    try {
      const token = authorizationHeader.split(' ')[1];
      
      if(!this.isTokenValid(token)) throw new UnauthorizedException()
      
      const decoded = this.jwtService.decode(token);
      const user = await this.getUserById(decoded['sub']);
      return user;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  // Metodo auxiliar para validar autenticação do token
  private isTokenValid(authorizationHeader: string): boolean {
    try {
      const decoded = this.jwtService.verify(authorizationHeader, {secret: jwtConstants.secret});
      console.log(decoded)
      return true
    } catch(err) {
      console.error(err)
      return false
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
