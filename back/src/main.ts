import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerGlobalMiddleware } from './middlewares/logger.middleware';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cors from 'cors';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);



  const options = new DocumentBuilder()
    .setTitle('Documentación RutaViajera')
    .setDescription('Esta es la documentación del back end del sitio web Ruta Viajera en donde encontrarán todas las rutas y los datos que se necesitan enviar para que funcionen.')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build()
  
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, document)

  app.enableCors();
  app.use(cors());
  app.use(LoggerGlobalMiddleware);
  app.useGlobalPipes(new ValidationPipe({whitelist: true}));
  await app.listen(3000);
  console.log('Server listening on http://localhost:3000');
}
bootstrap();
