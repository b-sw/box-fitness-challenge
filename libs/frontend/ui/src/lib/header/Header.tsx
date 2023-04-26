import { ActivityButton } from './ActivityButton';
import { HeaderRaw } from './header/Header.raw';
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
