import dayjs, { Dayjs } from 'dayjs';

export type Week = {
    id: number;
    startDate: Dayjs;
    endDate: Dayjs;
};

export const WEEKS: Map<Week['id'], Week> = new Map([
    [1, { id: 1, startDate: dayjs('2024-10-15T00:00:00Z'), endDate: dayjs('2024-11-28T23:59:59Z') }],
    [99, { id: 2, startDate: dayjs('2024-10-01T21:59:59Z'), endDate: dayjs('2024-10-15T00:00:00Z') }],
]);
