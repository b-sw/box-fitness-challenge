import { ActivitiesModule } from '@box-fc/backend/activities';
import { AuthModule } from '@box-fc/backend/auth';
import { UsersModule } from '@box-fc/backend/users';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from '../../ormconfig';

@Module({
    imports: [TypeOrmModule.forRoot(dbConfig), UsersModule, ActivitiesModule, AuthModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
