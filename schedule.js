import { getToken } from "./login.js";

const year = new Date().getFullYear();
const MEETINGS_ENDPOINT = `https://api.openf1.org/v1/meetings?year=${year}`;
const SESSIONS_ENDPOINT = `https://api.openf1.org/v1/sessions?year=${year}`;

async function getScheduleCurrentYear() {
    const responseMeetings = await fetch(MEETINGS_ENDPOINT);
    const responseSessions = await fetch(SESSIONS_ENDPOINT);
    const jsonMeetings = await responseMeetings.json();
    const jsonSessions = await responseSessions.json();
    return (jsonMeetings, jsonSessions);
}

function createScheduleObject(meetings, sessions) {
    const sched = {};
    meetings.forEach((meet) => (sched[meet.key] = meet));
    sessions.forEach((sess) => {
        const meet = sched[sess.meetKey];
        if (!meet) return;
        meet.session = sess;
    });
}

console.log(MEETINGS_ENDPOINT);
console.log(SESSIONS_ENDPOINT);
console.log(await getScheduleCurrentYear());
