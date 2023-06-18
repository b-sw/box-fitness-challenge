import { Week, WEEKS } from '@box-fc/frontend/domain';
import { useActivitiesQuery } from '@box-fc/frontend/query';
import dayjs from 'dayjs';
import { ReactNode, useEffect } from 'react';
import { useSetState } from '../../hooks';
import { getWeek } from '../datetime/week';
import { Dashboard } from './Dashboard';
import { ListingSwitcher, SwitchDirection } from './ListingSwitcher';

type Props = {
    week: Week;
    setWeek: (week: Week) => void;
    children: ReactNode;
};

type State = {
    queryWeek: Week;
    isLoadingLeft: boolean;
    isLoadingRight: boolean;
};

export const WeekDashboard = ({ week, setWeek, children }: Props) => {
    const [{ queryWeek, isLoadingLeft, isLoadingRight }, setState] = useSetState<State>({
        queryWeek: getWeek(dayjs()),
        isLoadingLeft: false,
        isLoadingRight: false,
    });
    const { usersActivitiesAreLoading } = useActivitiesQuery({ ...queryWeek });

    useEffect(() => {
        if (!usersActivitiesAreLoading) {
            setState({ isLoadingLeft: false, isLoadingRight: false });
            setWeek(queryWeek);
        }
    }, [queryWeek, usersActivitiesAreLoading]);

    const getNewWeek = (direction: SwitchDirection): Week => {
        const weeksIds = [...WEEKS.keys()];
        const oldWeekId = weeksIds.indexOf(queryWeek.id);
        const shift = direction === SwitchDirection.LEFT ? -1 : 1;
        const newWeekId = weeksIds[(((oldWeekId + shift) % 5) + 5) % 5];

        return WEEKS.get(newWeekId) as Week;
    };

    const switchWeek = (direction: SwitchDirection) => {
        const newLoadingState = direction === SwitchDirection.LEFT ? { isLoadingLeft: true } : { isLoadingRight: true };
        setState({ queryWeek: getNewWeek(direction), ...newLoadingState });
    };

    return (
        <Dashboard>
            {children}

            <ListingSwitcher
                activeListing={`Week ${week.id}`}
                switchListing={switchWeek}
                size={'sm'}
                isLoadingLeft={isLoadingLeft}
                isLoadingRight={isLoadingRight}
            />
        </Dashboard>
    );
};
