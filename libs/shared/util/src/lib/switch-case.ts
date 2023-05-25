export const switchCase =
    <T>(cases: Record<string | number, T>) =>
    (value: string | number) => {
        return cases[value] ?? cases['default'];
    };
