import { ActivityButton } from 'libs/frontend/ui/src/lib/header/ActivityButton';
import { LoginButton } from 'libs/frontend/ui/src/lib/header/LoginButton';
import { ProfileMenu } from 'libs/frontend/ui/src/lib/header/ProfileMenu';
import { HeaderRaw } from './header/Header.raw';

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
