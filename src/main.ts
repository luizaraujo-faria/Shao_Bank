import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) => {
        const formatted = errors.map((err) => ({
          field: err.property,
          errors: Object.values(err.constraints ?? {}),
        }));

        return new BadRequestException({
          message: 'Dados inválidos',
          errors: formatted,
        });
      },
    }),
  );

  await app.listen(3000);
}

void bootstrap();
