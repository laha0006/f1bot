const second = 1000;
const minute = 60000;

let limit = 60;
let started = undefined;
let startedBurst = undefined;
let burstCount = 5;

let requests = 0;

function refreshBurst() {
    burstCount = 5;
}
function refreshLimit() {
    limit = 60;
}

export function gate() {
    const now = performance.now();

    let timeSinceStartedBurst;
    let timeSinceStarted;

    if (started !== undefined) {
        timeSinceStartedBurst = now - startedBurst;
        timeSinceStarted = now - started;
    }

    if (timeSinceStartedBurst < second) {
        if (burstCount > 0) burstCount--;
    } else {
        startedBurst = now;
        refreshBurst();
    }

    if (timeSinceStarted < minute) {
        if (limit > 0) limit--;
    } else {
        started = now;
        refreshLimit();
    }

    console.log(`limit: ${limit} , burst: ${burstCount}`);

    if (limit === 0) {
        console.log("LIMIT BREAK");
        console.log(timeSinceStarted);
        console.log("reqeusts", requests);
        return false;
    }

    if (burstCount === 0) {
        console.log("BURSTED");
        console.log(timeSinceStartedBurst);

        console.log("limit", limit);
        console.log("burst", burstCount);
        console.log("now          ", now);
        console.log("startedBurst ", startedBurst);
        console.log("reqeusts", requests);

        return false;
    }
    requests++;
    return true;
}

export function sanity() {
    const now = Date.now();
    console.log(now);
    return now;
}
