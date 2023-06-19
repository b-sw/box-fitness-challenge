import { Week, WEEKS } from '@box-fc/frontend/domain';
import dayjs, { Dayjs } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

export const getWeek = (date: Dayjs): Week => {
    const week = [...WEEKS.entries()].find(([, { startDate: weekStart, endDate: weekEnd }]) => {
        return date.isBetween(weekStart, weekEnd, 'second', '[]');
    });

    return week?.[1] ?? WEEKS.get(5) as Week;
};
