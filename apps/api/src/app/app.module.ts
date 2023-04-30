import { AuthModule } from '@box-fc/backend/auth';
import { TrainingsModule } from '@box-fc/backend/trainings';
import { UsersModule } from '@box-fc/backend/users';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from '../../ormconfig';

@Module({
    imports: [TypeOrmModule.forRoot(dbConfig), UsersModule, TrainingsModule, AuthModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
