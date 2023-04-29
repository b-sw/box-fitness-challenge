import { HeaderRaw } from './header/Header.raw';
import { LoginButton } from './LoginButton';
import { ProfileMenu } from './ProfileMenu';
import { TrainingButton } from './Training.button';

export const Header = () => {
    return (
        <HeaderRaw
            title={'Box fitness challenge'}
            loginButton={<LoginButton />}
            activityButton={<TrainingButton />}
            profileMenu={<ProfileMenu />}
        />
    );
};
