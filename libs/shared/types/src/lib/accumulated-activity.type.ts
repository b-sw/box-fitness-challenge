import { User } from './db-entities/user.entity';

export type AccumulatedUserActivity = { userId: User['id']; activeTime: number; activitiesCount: number };
export type AccumulatedTeamActivity = { team: User['team']; activeTime: number; activitiesCount: number };
