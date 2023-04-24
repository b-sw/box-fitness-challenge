import { useAuthMutation, useAuthQuery } from '@box-fc/frontend/query';
import { ProfileMenuRaw } from './profile-menu/ProfileMenu.raw';

export const ProfileMenu = () => {
    const { isLoggedIn, authQuery } = useAuthQuery();
    const { logout } = useAuthMutation();

    return (
        <ProfileMenuRaw
            isEnabled={isLoggedIn}
            firstName={authQuery.data?.firstName ?? ''}
            lastName={authQuery.data?.lastName ?? ''}
            email={authQuery.data?.email ?? ''}
            team={authQuery.data?.team ?? ''}
            division={authQuery.data?.division ?? ''}
            profilePictureSrc={authQuery.data?.userImageSrc ?? ''}
            handleLogout={logout}
        />
    );
};
