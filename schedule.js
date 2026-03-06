import { getToken } from "./login.js";

const year = new Date().getFullYear();
const MEETINGS_ENDPOINT = `https://api.openf1.org/v1/meetings?year=${year}`;
const SESSIONS_ENDPOINT = `https://api.openf1.org/v1/sessions?year=${year}`;

async function getScheduleCurrentYear() {
    const responseMeetings = await fetch(MEETINGS_ENDPOINT);
    const responseSessions = await fetch(SESSIONS_ENDPOINT);
    const jsonMeetings = await responseMeetings.json();
    const jsonSessions = await responseSessions.json();
    return { meetings: jsonMeetings, sessions: jsonSessions };
}

function createScheduleObject(meetings, sessions) {
    console.log(sessions);
    console.log(meetings);
    const sched = {};
    meetings.forEach(
        (meet) => (sched[meet.meeting_key] = { meet, sessions: {} }),
    );
    sessions.forEach((sess) => {
        const meet = sched[sess.meeting_key];
        if (!meet) return;
        meet.sessions[sess.session_key] = sess;
    });
    return sched;
}

//console.log(MEETINGS_ENDPOINT);
//console.log(SESSIONS_ENDPOINT);
const { meetings, sessions } = await getScheduleCurrentYear();
//console.log(sessions);
console.log(createScheduleObject(meetings, sessions));
