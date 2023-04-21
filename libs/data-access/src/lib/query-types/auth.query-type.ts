import { UserCredentials, WithNull } from '@box-fc/util-types';

export type AuthQuery = WithNull<UserCredentials> & { userImageSrc: string | null };
