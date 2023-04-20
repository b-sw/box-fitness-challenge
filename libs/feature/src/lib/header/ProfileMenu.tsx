import { useAuthQuery } from '@box-fc/data-access';
import { ProfileMenuRaw } from '@box-fc/ui-header';

export const ProfileMenu = () => {
    const { isLoggedIn, authQuery } = useAuthQuery();

    return <ProfileMenuRaw isEnabled={isLoggedIn} profilePictureSrc={authQuery.data?.userImageSrc ?? ''} />;
};
