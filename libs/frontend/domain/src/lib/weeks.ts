export type DatesRange = { startDate: Date; endDate: Date };

export const WEEKS: Record<'1' | '2' | '3' | '4' | '5', DatesRange> = {
    '1': { startDate: new Date('2023-05-15'), endDate: new Date('2023-05-21') },
    '2': { startDate: new Date('2023-05-22'), endDate: new Date('2023-05-28') },
    '3': { startDate: new Date('2023-05-29'), endDate: new Date('2023-06-04') },
    '4': { startDate: new Date('2023-06-05'), endDate: new Date('2023-06-11') },
    '5': { startDate: new Date('2023-06-12'), endDate: new Date('2023-06-18') },
};
