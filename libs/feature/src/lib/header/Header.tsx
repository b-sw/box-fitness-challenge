import { HeaderRaw } from '@box-fc/ui-header';
import { ActivityButton } from './ActivityButton';
import { LoginButton } from './LoginButton';
import { ProfileMenu } from './ProfileMenu';

export const Header = () => {
    return (
        <HeaderRaw
            title={'Big freaking header'}
            loginButton={<LoginButton />}
            activityButton={<ActivityButton />}
            profileMenu={<ProfileMenu />}
        />
    );
};
