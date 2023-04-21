export type WithNull<T> = {
    [P in keyof T]: T[P] | null;
};
