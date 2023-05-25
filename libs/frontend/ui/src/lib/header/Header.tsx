import { useAuthQuery } from '@box-fc/frontend/query';
import { HeaderRaw } from './Header.raw';
import { TeamsButton } from './teams-button/TeamsButton';

export const Header = () => {
    const { isAdmin } = useAuthQuery();

    const buttons = <>{isAdmin && <TeamsButton />}</>;

    return <HeaderRaw title={'Fitness challenge'} buttons={buttons} />;
};
