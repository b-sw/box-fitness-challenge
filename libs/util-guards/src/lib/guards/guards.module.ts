import { Activity, User } from '@box-fc/util-types';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminGuard } from './admin';
import { JwtGuard } from './jwt';

@Module({
    imports: [TypeOrmModule.forFeature([User, Activity])],
    exports: [AdminGuard, JwtGuard],
})
export class GuardsModule {}
