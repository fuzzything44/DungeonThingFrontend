// Returns a promise that resolves after the given number of seconds
export const pause = (seconds: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}