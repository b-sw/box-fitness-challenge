import { useAuthQuery } from '@box-fc/frontend/query';
import { HeaderRaw } from './Header.raw';
import { InfoButton } from './info-button/Info.button';
import { ProfileMenu } from './profile-menu/ProfileMenu';
import { TeamsButton } from './teams-button/TeamsButton';
import { TrainingButton } from './training-button/Training.button';

export const Header = () => {
    const { isAdmin } = useAuthQuery();

    const buttons = (
        <>
            {isAdmin && <TeamsButton />}
            <TrainingButton />
            <InfoButton />
            <ProfileMenu />
        </>
    );

    return <HeaderRaw title={'Fitness challenge'} buttons={buttons} />;
};
