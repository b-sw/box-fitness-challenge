import { Type } from 'class-transformer';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { uuid } from '../uuid.type';
import { User } from './user.entity';

@Entity()
export class Activity {
    @PrimaryGeneratedColumn('uuid')
    id: uuid;

    @Column()
    userId: uuid;

    @Column()
    type: string;

    @Column()
    duration: number;

    @Column({ type: 'datetime' })
    @Type(() => Date)
    trainingDate: Date;

    @Column({ type: 'datetime' })
    @Type(() => Date)
    registrationDate: Date;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user: User;
}
