import { useAuthQuery } from '@box-fc/frontend/query';
import { HeaderRaw } from './Header.raw';
import { ProfileMenu } from './profile-menu/ProfileMenu';
import { TeamsButton } from './teams-button/TeamsButton';
import { TrainingButton } from './training-button/Training.button';

export const Header = () => {
    const { isAdmin } = useAuthQuery();

    const buttons = (
        <>
            {isAdmin && <TeamsButton />}
            <TrainingButton />
            <ProfileMenu />
        </>
    );

    return <HeaderRaw title={'Fitness challenge'} buttons={buttons} />;
};
