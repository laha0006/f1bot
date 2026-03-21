import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync("f1.db");

// circuit_key	The unique identifier for the circuit where the event takes place.
// circuit_image	An image of the circuit.
// circuit_info_url	A URL to a JSON containing detailed circuit info. See FastF1 documentation for details. Data provided by MultiViewer.
// circuit_short_name	The short or common name of the circuit where the event takes place.
// circuit_type	The type of the circuit ("Permanent", "Temporary - Street", or "Temporary - Road")
// country_code	A code that uniquely identifies the country.
// country_flag	An image of the country flag.
// country_key	The unique identifier for the country where the event takes place.
// country_name	The full name of the country where the event takes place.
// date_end	The UTC ending date and time, in ISO 8601 format.
// date_start	The UTC starting date and time, in ISO 8601 format.
// gmt_offset	The difference in hours and minutes between local time at the location of the event and Greenwich Mean Time (GMT).
// location	The city or geographical location where the event takes place.
// meeting_key	The unique identifier for the meeting. Use latest to identify the latest or current meeting.
// meeting_name	The name of the meeting.
// meeting_official_name	The official name of the meeting.
// year	The year the event takes place.

const meetingsTableSql = `
    CREATE TABLE meetings (
        meeting_key INT PRIMARY KEY,
    )
`;

console.log(db);
