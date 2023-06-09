import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      // quando o nest usar essa validação, ele vai ignorar de forma silenciosa todas as propriedades do json que não estiverem no nosso dto
      whitelist: true,
      // lançar um erro se alguém mandar um dado no json que não esta no nosso dto
      forbidNonWhitelisted: true
    })
  );
  
  //o class validator vai resolver as classes do mesmo jeito q o nest resolve as dependencias
  useContainer(app.select(AppModule),{fallbackOnErrors: true});

  await app.listen(3000);
}
bootstrap();
