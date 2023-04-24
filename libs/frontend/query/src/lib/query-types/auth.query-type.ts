import { UserCredentials, WithNull } from '@box-fc/shared/types';

export type AuthQuery = WithNull<UserCredentials> & { userImageSrc: string | null };
