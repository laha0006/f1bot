let secondLog = [];
let minuteLog = [];

export function gate() {
    const now = performance.now();

    secondLog = secondLog.filter((ts) => now - ts <= 1000);
    minuteLog = minuteLog.filter((ts) => now - ts <= 60000);

    if (secondLog.length >= 5 || minuteLog.length >= 60) {
        return false;
    }
    secondLog.push(now);
    minuteLog.push(now);

    return true;
}
