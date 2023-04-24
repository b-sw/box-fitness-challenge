import { Activity, User } from '@box-fc/shared/types';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminGuard } from 'libs/backend/guards/src/lib/admin';
import { JwtGuard } from 'libs/backend/guards/src/lib/jwt';

@Module({
    imports: [TypeOrmModule.forFeature([User, Activity])],
    exports: [AdminGuard, JwtGuard],
})
export class GuardsModule {}
