import { AccessToken } from './access-token.type';
import { uuid } from './uuid.type';

export type UserInfo = {
    id: uuid;
    accessToken: AccessToken;
    firstName: string;
    lastName: string;
    email: string;
    team?: string;
    division?: string;
    role: string;
    imageUrl: string;
};
