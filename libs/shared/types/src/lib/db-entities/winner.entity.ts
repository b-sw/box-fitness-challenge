import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Place } from '../place';
import { uuid } from '../uuid.type';
import { User } from './user.entity';
import { Week } from './week.entity';

@Entity()
export class Winner {
    @PrimaryGeneratedColumn('uuid')
    id: uuid;

    @Column()
    userId: uuid;

    @Column()
    weekId: uuid;

    @Column({ type: 'enum', enum: Place })
    place: Place;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user: User;

    @ManyToOne(() => Week, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'weekId' })
    week: Week;
}
