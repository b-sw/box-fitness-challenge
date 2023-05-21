import { CreateWinnerDto, Week, Winner } from '@box-fc/shared/types';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class WinnersService {
    private static readonly WINNER_NOT_FOUND = 'Winner not found';

    constructor(
        @InjectRepository(Winner) private winnersRepository: Repository<Winner>,
        @InjectRepository(Week) private weeksRepository: Repository<Week>,
    ) {}

    create(dto: CreateWinnerDto): Promise<Winner> {
        const winner = this.winnersRepository.create(dto);

        return this.winnersRepository.save(winner);
    }

    getAll(): Promise<Winner[]> {
        return this.winnersRepository.find();
    }

    getWeeks(): Promise<Week[]> {
        return this.weeksRepository.find({ order: { startDate: 'ASC' } });
    }

    async delete(winnerId: Winner['id']): Promise<Winner> {
        const winner = await this.winnersRepository.findOne({ where: { id: winnerId } });

        if (!winner) {
            throw new HttpException(WinnersService.WINNER_NOT_FOUND, 400);
        }

        await this.winnersRepository.delete(winner as Winner);

        return winner;
    }
}
