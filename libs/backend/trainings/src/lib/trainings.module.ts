import { Training, User } from '@box-fc/shared/types';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainingsController } from './trainings.controller';
import { TrainingsService } from './trainings.service';

@Module({
    imports: [TypeOrmModule.forFeature([Training, User])],
    controllers: [TrainingsController],
    providers: [TrainingsService],
    exports: [TrainingsService],
})
export class TrainingsModule {}
