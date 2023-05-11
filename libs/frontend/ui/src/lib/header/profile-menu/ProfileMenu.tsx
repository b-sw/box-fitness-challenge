import { useAuthMutation, useAuthQuery } from '@box-fc/frontend/query';
import { useAuthStore } from '@box-fc/frontend/store';
import { ProfileMenuRaw } from './ProfileMenu.raw';

export const ProfileMenu = () => {
    const { isLoggedIn } = useAuthQuery();
    const { user } = useAuthStore();
    const { logout } = useAuthMutation({});

    if (!(user.firstName && user.lastName && user.email && user.imageUrl)) {
        return null;
    }

    return (
        <ProfileMenuRaw
            isEnabled={isLoggedIn}
            firstName={user.firstName}
            lastName={user.lastName}
            email={user.email}
            team={user.team ?? 'N/A team'}
            division={user.division ?? 'N/A team'}
            profilePictureSrc={user.imageUrl}
            handleLogout={logout}
        />
    );
};
