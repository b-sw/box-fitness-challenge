import { HeaderRaw } from './header/Header.raw';
import { ProfileMenu } from './ProfileMenu';
import { TrainingButton } from './Training.button';

export const Header = () => {
    return (
        <HeaderRaw title={'Box fitness challenge'} trainingButton={<TrainingButton />} profileMenu={<ProfileMenu />} />
    );
};
