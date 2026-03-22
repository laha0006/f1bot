import { DatabaseSync } from "node:sqlite";
import { readFile } from "node:fs/promises";

const db = new DatabaseSync("f1.db");
const sql = await readFile(new URL("./schema.sql", import.meta.url), "utf8");
// circuit_key
// circuit_image
// circuit_info_url
// circuit_short_name
// circuit_type
// country_code
// country_flag
// country_key
// country_name
// date_end	The
// date_start
// gmt_offset
// location
// meeting_key
// meeting_name
// meeting_official_name
// year

db.exec(sql);
db.exec("INSERT INTO meeting VALUES(100,200)");
db.exec("INSERT INTO meeting VALUES(200,200)");
db.exec("INSERT INTO session VALUES(1337,100)");

const meetings = db.prepare("SELECT * FROM meeting;");
const sessions = db.prepare("SELECT * FROM session;");
const rowsMeetings = meetings.all();
const rowsSessions = sessions.all();
console.log(rowsMeetings);
console.log(rowsSessions);
