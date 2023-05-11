import { User } from './db-entities/user.entity';

type Activity = { score: number };
type MeanActivity = { meanScore: number };

export type UserActivity = { userId: User['id'] } & Activity;
export type TeamActivity = { team: string } & Activity & MeanActivity;
