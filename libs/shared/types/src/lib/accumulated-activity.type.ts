import { User } from './db-entities/user.entity';

export type UserActivity = { userId: User['id']; activeTime: number; trainingsCount: number };
export type TeamActivity = { team: User['team']; activeTime: number; trainingsCount: number };
