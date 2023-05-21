import { Type } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { uuid } from '../uuid.type';

@Entity()
export class Week {
    @PrimaryGeneratedColumn('uuid')
    id: uuid;

    @Column({ type: 'datetime' })
    @Type(() => Date)
    startDate: Date;

    @Column({ type: 'datetime' })
    @Type(() => Date)
    endDate: Date;
}
