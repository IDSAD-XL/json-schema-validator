export const debounceFunc = (func: TimerHandler, handler: any, delay: number) => {
    clearTimeout(handler);
    return setTimeout(func, delay)
}