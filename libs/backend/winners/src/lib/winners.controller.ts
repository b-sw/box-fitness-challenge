import { AdminGuard, JwtGuard } from '@box-fc/backend/guards';
import { CreateWinnerDto, Optional, WeekWinnerDto, Winner, WinnerParams } from '@box-fc/shared/types';
import { Body, Controller, Delete, HttpCode, Param, Post, UseGuards } from '@nestjs/common';
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
    create(@Body() dto: CreateWinnerDto): Promise<Winner> {
        return this.winnersService.create(dto);
    }

    @Post('winners/date')
    @HttpCode(200)
    @UseGuards(JwtGuard)
    @ApiOperation({ summary: 'Get winners' })
    getByDate(@Body() { date }: WeekWinnerDto): Promise<Winner[]> {
        return this.winnersService.getByDate(date);
    }

    @Delete('winners/:winnerId')
    @UseGuards(JwtGuard, AdminGuard)
    @ApiOperation({ summary: 'Delete a winner' })
    delete(@Param() { winnerId }: WinnerParams): Promise<Optional<Winner>> {
        return this.winnersService.delete(winnerId);
    }
}
