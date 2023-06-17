import { User, Winner } from '@box-fc/shared/types';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinnersController } from './winners.controller';
import { WinnersService } from './winners.service';

@Module({
    imports: [TypeOrmModule.forFeature([Winner, User])],
    controllers: [WinnersController],
    providers: [WinnersService],
})
export class WinnersModule {}
