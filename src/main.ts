import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CreateUserValidationPipe } from './user/validation-pipe/user-validation-pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new CreateUserValidationPipe())
  await app.listen(3000);
}
bootstrap();
