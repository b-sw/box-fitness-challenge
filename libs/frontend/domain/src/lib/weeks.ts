export type DatesRange = { startDate: Date; endDate: Date };

export const WEEKS: Record<'1' | '2' | '3' | '4' | '5', DatesRange> = {
    '1': { startDate: new Date('2023-05-15T10:00:00Z'), endDate: new Date('2023-05-22T10:00:00Z') },
    '2': { startDate: new Date('2023-05-22T10:00:00Z'), endDate: new Date('2023-05-29T10:00:00Z') },
    '3': { startDate: new Date('2023-05-29T10:00:00Z'), endDate: new Date('2023-06-05T10:00:00Z') },
    '4': { startDate: new Date('2023-06-05T10:00:00Z'), endDate: new Date('2023-06-12T10:00:00Z') },
    '5': { startDate: new Date('2023-06-12T10:00:00Z'), endDate: new Date('2023-06-18T10:00:00Z') },
};
