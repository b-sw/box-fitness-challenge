export type DatesRange = { startDate: Date; endDate: Date };

export const WEEKS: Record<'1' | '2' | '3' | '4' | '5', DatesRange> = {
    '1': { startDate: new Date('2023-05-15T21:59:59Z'), endDate: new Date('2023-05-21T22:00:00Z') },
    '2': { startDate: new Date('2023-05-21T21:59:59Z'), endDate: new Date('2023-05-28T22:00:00Z') },
    '3': { startDate: new Date('2023-05-28T21:59:59Z'), endDate: new Date('2023-06-04T22:00:00Z') },
    '4': { startDate: new Date('2023-06-04T21:59:59Z'), endDate: new Date('2023-06-11T22:00:00Z') },
    '5': { startDate: new Date('2023-06-11T21:59:59Z'), endDate: new Date('2023-06-18T22:00:00Z') },
};
