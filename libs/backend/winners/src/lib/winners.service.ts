import { Optional, uuid, Winner } from '@box-fc/shared/types';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWinnerDto } from '../../../../shared/types/src/lib/dto/winners/create-winner.dto';

@Injectable()
export class WinnersService {
    constructor(@InjectRepository(Winner) private readonly winnersRepository: Repository<Winner>) {}

    async create(dto: CreateWinnerDto): Promise<Winner> {
        const existingWinner = await this.winnersRepository.findOne({
            where: {
                date: dto.date,
                podiumPlace: dto.podiumPlace,
            },
        });
        if (existingWinner) {
            await this.winnersRepository.delete(existingWinner.id);
        }

        const winner = this.winnersRepository.create(dto);

        return this.winnersRepository.save(winner);
    }

    getByDate(date: Date): Promise<Winner[]> {
        return this.winnersRepository.find({ where: { date } });
    }

    async delete(winnerId: uuid): Promise<Optional<Winner>> {
        const winner = this.winnersRepository.findOne({ where: { id: winnerId } });

        await this.winnersRepository.delete(winnerId);

        return winner;
    }
}
