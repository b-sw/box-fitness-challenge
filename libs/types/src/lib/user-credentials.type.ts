import { AccessToken } from './access-token.type';
import { uuid } from './uuid.type';

export type UserCredentials = {
    id: uuid;
    accessToken: AccessToken;
    firstName: string;
    lastName: string;
    email: string;
};