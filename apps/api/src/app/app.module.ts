import { UsersModule } from '@box-fc/data-access-users';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from '../../ormconfig';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
    imports: [TypeOrmModule.forRoot(dbConfig), UsersModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
