import { useAuthMutation, useAuthQuery } from '@box-fc/data-access';
import { ProfileMenuRaw } from '@box-fc/ui-header';

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
