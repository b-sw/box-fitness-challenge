import { WEEKS } from '@box-fc/frontend/domain';
import dayjs from 'dayjs';
import { getWeek } from './week';

describe('week', () => {
    it('should get week', () => {
        const date = dayjs(new Date('2023-05-29T21:59:59Z'));

        const week = getWeek(date);

        expect(week).toEqual(WEEKS.get(3));
    });

    it('should get null week', () => {
        const date = dayjs(new Date('2023-05-15T20:00:00Z'));

        const getsInvalidWeek = () => getWeek(date);

        expect(getsInvalidWeek).toThrow();
    });
});
