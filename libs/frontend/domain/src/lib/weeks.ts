import dayjs, { Dayjs } from 'dayjs';

export type Week = {
    id: number;
    startDate: Dayjs;
    endDate: Dayjs;
};

export type DatesRange = { startDate: Dayjs; endDate: Dayjs };

export const WEEKS: Map<Week['id'], Week> = new Map([
    [1, { id: 1, startDate: dayjs('2023-05-15T21:59:59Z'), endDate: dayjs('2023-05-21T22:00:00Z') }],
    [2, { id: 2, startDate: dayjs('2023-05-21T21:59:59Z'), endDate: dayjs('2023-05-28T22:00:00Z') }],
    [3, { id: 3, startDate: dayjs('2023-05-28T21:59:59Z'), endDate: dayjs('2023-06-04T22:00:00Z') }],
    [4, { id: 4, startDate: dayjs('2023-06-04T21:59:59Z'), endDate: dayjs('2023-06-11T22:00:00Z') }],
    [5, { id: 5, startDate: dayjs('2023-06-11T21:59:59Z'), endDate: dayjs('2023-06-18T22:00:00Z') }],
]);
