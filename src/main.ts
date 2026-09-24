import { NestFactory } from '@nestjs/core';
import { AppModule} from './app.module.js';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
   origin: [
    'http://localhost:5173',
    'https://mokamtola-efootball-tournament.netlify.app',
    'https://YOUR-NETLIFY-SITE.netlify.app',
  ],
});
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const PORT : number =Number(process.env.PORT) ;

  await app.listen(PORT, '0.0.0.0');

  console.log(`\n==================================================`);
  console.log(`🚀 Server running on: http://0.0.0.0:${PORT}`);
  console.log(`🔗 Teams API: http://0.0.0.0:${PORT}/teams`);
  console.log(`==================================================\n`);
}
await bootstrap();
