import { UserCredentials, WithNull } from '@box-fc/shared/types';

export type AuthCredentials = WithNull<UserCredentials> & { userImageSrc: string | null };
