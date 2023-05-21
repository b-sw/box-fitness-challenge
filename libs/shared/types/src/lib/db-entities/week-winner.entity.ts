import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { uuid } from '../uuid.type';
import { User } from './user.entity';
import { Week } from './week.entity';

@Entity()
export class WeekWinner {
    @PrimaryGeneratedColumn('uuid')
    id: uuid;

    @Column()
    userId: uuid;

    @Column()
    weekId: uuid;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user: User;

    @ManyToOne(() => Week, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'weekId' })
    week: Week;
}
