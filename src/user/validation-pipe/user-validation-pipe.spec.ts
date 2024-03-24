import { UserValidationPipe } from "./user-validation-pipe";

describe('ValidationPipe', () => {
  it('should be defined', () => {
    expect(new UserValidationPipe()).toBeDefined();
  });
});
