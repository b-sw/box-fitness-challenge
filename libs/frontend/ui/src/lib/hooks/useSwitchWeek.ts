import { Week, WEEKS } from '@box-fc/frontend/domain';
import { useActivitiesQuery } from '@box-fc/frontend/query';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { getWeek } from '../utils/datetime/week';
import { SwitchDirection } from '../utils/generic-components/ListingSwitcher';
import { useSetState } from './useSetState';

type State = {
    activeWeek: Week;
    isLoadingLeft: boolean;
    isLoadingRight: boolean;
};

export const useSwitchActivities = () => {
    const [state, setState] = useSetState<State>({
        activeWeek: getWeek(dayjs()),
        isLoadingLeft: false,
        isLoadingRight: false,
    });
    const { usersActivitiesAreLoading } = useActivitiesQuery({ ...state.activeWeek });

    useEffect(() => {
        if (!usersActivitiesAreLoading) {
            setState({
                isLoadingLeft: false,
                isLoadingRight: false,
            });
        }
    }, [state.activeWeek, usersActivitiesAreLoading]);

    const getNewWeek = (direction: SwitchDirection): Week => {
        const weeksIds = [...WEEKS.keys()];
        const oldWeekId = weeksIds.indexOf(state.activeWeek.id);
        const shift = direction === SwitchDirection.LEFT ? -1 : 1;
        const newWeekId = weeksIds[(((oldWeekId + shift) % 5) + 5) % 5];

        return WEEKS.get(newWeekId) as Week;
    };

    const switchWeek = (direction: SwitchDirection) => {
        const loadingState = direction === SwitchDirection.LEFT ? { isLoadingLeft: true } : { isLoadingRight: true };
        setState({ activeWeek: getNewWeek(direction), ...loadingState });
    };

    return {
        activeWeek: state.activeWeek,
        switchWeek,
        isLoadingLeft: state.isLoadingLeft,
        isLoadingRight: state.isLoadingRight,
    };
};
