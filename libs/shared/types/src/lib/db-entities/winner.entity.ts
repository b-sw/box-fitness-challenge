import { Type } from 'class-transformer';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PodiumPlace } from '../podium-place';
import { uuid } from '../uuid.type';
import { User } from './user.entity';

@Entity()
export class Winner {
    @PrimaryGeneratedColumn('uuid')
    id: uuid;

    @Column()
    userId: uuid;

    @Column({ type: 'datetime' })
    @Type(() => Date)
    date: Date;

    @Column({ type: 'enum', enum: PodiumPlace })
    podiumPlace: PodiumPlace;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user: User;
}
