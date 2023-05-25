import { Week, WEEKS } from '@box-fc/frontend/domain';
import dayjs, { Dayjs } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

export const getWeek = (date: Dayjs): Week => {
    const week = [...WEEKS.entries()].find(([, { startDate: weekStart, endDate: weekEnd }]) => {
        return date.isBetween(weekStart, weekEnd, 'second', '[]');
    });

    if (!week) {
        throw new Error('Week not found');
    }

    return week[1];
};
