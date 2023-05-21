import { AdminGuard, JwtGuard } from '@box-fc/backend/guards';
import { CreateWinnerDto, Winner, WinnersParams } from '@box-fc/shared/types';
import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { WinnersService } from './winners.service';

@ApiTags('winners')
@Controller('')
@ApiBearerAuth()
export class WinnersController {
    constructor(private readonly winnersService: WinnersService) {}

    @Post('winners')
    @UseGuards(JwtGuard, AdminGuard)
    @ApiOperation({ summary: 'Create a winner' })
    createWinner(@Body() dto: CreateWinnerDto): Promise<Winner> {
        return this.winnersService.create(dto);
    }

    @Get('winners')
    @UseGuards(JwtGuard, AdminGuard)
    @ApiOperation({ summary: 'Get all winners' })
    getAll(): Promise<Winner[]> {
        return this.winnersService.getAll();
    }

    @Delete('winners/:winnerId')
    @UseGuards(JwtGuard, AdminGuard)
    @ApiOperation({ summary: 'Delete a winner' })
    deleteWinner(@Param() { winnerId }: WinnersParams): Promise<Winner> {
        return this.winnersService.delete(winnerId);
    }
}
