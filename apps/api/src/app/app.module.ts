import { AuthModule } from '@box-fc/backend/auth';
import { TrainingsModule } from '@box-fc/backend/trainings';
import { UsersModule } from '@box-fc/backend/users';
import { WinnersModule } from '@box-fc/backend/winners';
import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from '../../ormconfig';

@Module({
    imports: [
        AuthModule,
        UsersModule,
        ThrottlerModule.forRoot({ ttl: 60, limit: 300 }),
        TrainingsModule,
        WinnersModule,
        TypeOrmModule.forRoot(dbConfig),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
