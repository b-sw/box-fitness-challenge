export type DatesRange = { startDate: Date; endDate: Date };

export const WEEKS: Record<'1' | '2' | '3' | '4' | '5', DatesRange> = {
    '1': { startDate: new Date('2023-05-15T12:00:00'), endDate: new Date('2023-05-22T12:00:00') },
    '2': { startDate: new Date('2023-05-22T12:00:00'), endDate: new Date('2023-05-29T12:00:00') },
    '3': { startDate: new Date('2023-05-29T12:00:00'), endDate: new Date('2023-06-05T12:00:00') },
    '4': { startDate: new Date('2023-06-05T12:00:00'), endDate: new Date('2023-06-12T12:00:00') },
    '5': { startDate: new Date('2023-06-12T12:00:00'), endDate: new Date('2023-06-18T12:00:00') },
};
