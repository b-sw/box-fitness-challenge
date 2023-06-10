export const scrollToPercentage = (percentage: number): void => {
    const scrollHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const scrollTo = (scrollHeight - windowHeight) * percentage;

    window.scrollTo({
        top: scrollTo,
        behavior: 'smooth',
    });
};
