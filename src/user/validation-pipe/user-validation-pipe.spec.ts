import { CreateUserValidationPipe } from "./user-validation-pipe";

describe('ValidationPipe', () => {
  it('should be defined', () => {
    expect(new CreateUserValidationPipe()).toBeDefined();
  });
});
