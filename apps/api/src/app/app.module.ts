import { ActivitiesModule } from '@box-fc/data-access-activities';
import { UsersModule } from '@box-fc/data-access-users';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from '../../ormconfig';

@Module({
    imports: [TypeOrmModule.forRoot(dbConfig), UsersModule, ActivitiesModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
