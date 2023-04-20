import { HeaderRaw } from '@box-fc/ui-header';
import { LoginButton } from './LoginButton';
import { ProfileMenu } from './ProfileMenu';

export const Header = () => {
    return <HeaderRaw title={'Big freaking header'} loginButton={<LoginButton />} profileMenu={<ProfileMenu />} />;
};
