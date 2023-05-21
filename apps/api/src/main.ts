import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app/app.module';

async function bootstrap() {
    // So that TypeORM can retrieve the correct date from DB
    process.env.TZ = 'Etc/Universal';

    const app = await NestFactory.create(AppModule, {
        logger: ['error', 'warn', 'log'],
    });
    app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: false }));
    const config = new DocumentBuilder().setTitle('Box-fc api').setVersion('1.0').addBearerAuth().build();
    const document = SwaggerModule.createDocument(app, config);

    app.enableCors({
        origin: '*',
        allowedHeaders:
            'Content-Type, Access-Control-Allow-Headers, Access-Control-Expose-Headers, Content-Disposition, Authorization, X-Requested-With',
        exposedHeaders: 'Content-Disposition',
    });
    SwaggerModule.setup('api', app, document);
    await app.listen(3333);
}

bootstrap();
