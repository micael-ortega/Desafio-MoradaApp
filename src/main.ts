import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UserValidationPipe } from './user/validation-pipe/user-validation-pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new UserValidationPipe());
  await app.listen(3000);
}
bootstrap();
