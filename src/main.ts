import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { MulterModule } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(5000);
  // MulterModule.registerAsync({
  //   useFactory: () => ({
  //     dest: './upload',
  //   }),
  // });
}
bootstrap();
