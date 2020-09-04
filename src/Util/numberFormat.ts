export const formatNumber = (input: number): string => {
    if (input < 100) {
        input = Math.round(10 * input) / 10;
    } else {
        input = Math.round(input);
    }
    return input.toLocaleString();
};