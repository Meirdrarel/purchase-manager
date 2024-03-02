import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        cors: {
            origin: 'http://localhost:4200', // Autoriser uniquement votre frontend
            allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        }
    });

    await app.listen(3000);
    console.log(`Application is running on: ${ await app.getUrl() }`);
}

bootstrap();
