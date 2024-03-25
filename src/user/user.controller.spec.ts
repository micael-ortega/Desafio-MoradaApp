import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { CreateUserResponseDto } from './dto/createUser.response.dto';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  describe('create user', () => {
    it('must return contract defined response', async () => {
      const payload = new CreateUserDto();
      payload.name = 'micael';
      payload.email = 'micael.braga@mail.com';
      payload.description = 'descricao';
      payload.password = '123456';

      const result = new CreateUserResponseDto();

      jest.spyOn(service, 'createUser').mockImplementation(async () => result);

      expect(await controller.createUser(payload)).toBe(result);
    });
  });
});
