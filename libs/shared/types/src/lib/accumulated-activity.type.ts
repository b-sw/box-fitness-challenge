import { User } from './db-entities/user.entity';

type Activity = { score: number };

export type UserActivity = { userId: User['id'] } & Activity;
export type TeamActivity = { team: User['team'] } & Activity;
