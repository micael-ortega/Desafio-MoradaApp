import { Test, TestingModule } from '@nestjs/testing';
import { describe } from 'node:test';
import { UserService } from '../user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../dto/createUser.dto';
import { UpdateUserDto } from '../dto/patchUser.dto';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<User>;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
            decode: jest.fn(),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      const createUserDto = new CreateUserDto();
      createUserDto.email = 'mock@mail.com';
      createUserDto.password = 'password';

      const user = new User();
      user.email = createUserDto.email;
      user.password = createUserDto.password;

      jest.spyOn(userRepository, 'save').mockResolvedValue(user);
      jest.spyOn(userService, 'login').mockResolvedValue({
        accessToken: 'token',
      });

      const response = await userService.createUser(createUserDto);
      expect(response.accessToken).toBe('token');
    });
  });

  describe('login', () => {
    it('should login a user', async () => {
      const email = 'mock@mail.com';

      const password = 'password';

      const user = new User();
      user.email = email;

      jest.spyOn(userService, 'getUserByEmail').mockResolvedValue(user);
      jest.spyOn(userService, 'isPasswordCorrect').mockReturnValue(true);
      jest.spyOn(jwtService, 'signAsync').mockResolvedValue('token');

      const response = await userService.login(email, password);
      expect(response.accessToken).toBe('token');
    });

    it('should throw an error when the password is incorrect', async () => {
      const email = 'mock@mail.com';

      const password = 'password';

      const user = new User();
      user.email = email;

      jest.spyOn(userService, 'getUserByEmail').mockResolvedValue(user);
      jest.spyOn(userService, 'isPasswordCorrect').mockReturnValue(false);

      await expect(userService.login(email, password)).rejects.toThrow();
    });

    it('should throw an error when the user is not found', async () => {
      const email = 'mock@mail.com';
      const password = 'password';

      jest.spyOn(userService, 'getUserByEmail').mockResolvedValue(null);

      await expect(userService.login(email, password)).rejects.toThrow();
    });
  });

  describe('getUserInfo', () => {
    it('should get user info', async () => {
      const userId = 'useruuid';

      const user = new User();
      user.email = 'mock@mail.com';
      user.name = 'name';
      user.description = 'description';

      jest.spyOn(userService, 'getUserById').mockResolvedValue(user);

      const response = await userService.getUserInfo(userId);
      expect(response.email).toBe(user.email);
    });

    it('should throw an error when the user is not found', async () => {
      const userId = 'useruuid';

      jest.spyOn(userService, 'getUserFromToken').mockResolvedValue(null);

      await expect(userService.getUserInfo(userId)).rejects.toThrow();
    });
  });

  describe('patchUserInfo', () => {
    it('should patch user info', async () => {
      const userId = 'useruuid';

      const user = new User();
      user.id = 'useruuid';
      user.name = 'new name';
      user.description = 'new description';


      const userDto = new UpdateUserDto();
      userDto.name = 'new name';
      userDto.description = 'new description';

      jest.spyOn(userRepository, 'update').mockResolvedValue(undefined);
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);


      await userService.patchUserInfo(userId, userDto);

      expect(userRepository.update).toHaveBeenCalledWith(userId, userDto);

      expect(user.id).toBe(userId);
      expect(user.name).toBe(userDto.name);
      expect(user.description).toBe(userDto.description);
    });

    it('should throw an error when the user is not found', async () => {
      const userId = 'useruuid';

      const patchUserDto = {
        name: 'namee',
        description: 'description',
      };

      await expect(
        userService.patchUserInfo(userId, patchUserDto),
      ).rejects.toThrow();
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      const userId = 'useruuid';

      const user = new User();
      user.id = userId;

      jest
        .spyOn(userRepository, 'delete')
        .mockResolvedValue({ affected: 1 } as any);

      await userService.deleteUser(userId);

      expect(userRepository.delete).toHaveBeenCalledWith(userId);
    });

    it('should throw an error when the user is not found', async () => {
      const userId = 'useruuid';

      jest.spyOn(userService, 'getUserFromToken').mockResolvedValue(null);

      await expect(userService.deleteUser(userId)).rejects.toThrow();
    });
  });

  describe('getUserFromToken', () => {
    it('should get user from token', async () => {
      const authorization = 'Bearer token tokentoken';

      const user = new User();
      user.id = 'uuid';

      const decoded = { sub: user.id };

      jest.spyOn(jwtService, 'decode').mockReturnValue(decoded);
      jest.spyOn(userService, 'isTokenValid').mockReturnValue(true);
      jest.spyOn(userService, 'getUserById').mockResolvedValue(user);

      const response = await userService.getUserFromToken(authorization);

      expect(response.id).toBe(user.id);
    });

    it('should throw an error when the token is invalid', async () => {
      const authorization = 'Bearer token tokentoken';

      jest.spyOn(jwtService, 'decode').mockReturnValue(null);

      await expect(
        userService.getUserFromToken(authorization),
      ).rejects.toThrow();
    });
  });
});
