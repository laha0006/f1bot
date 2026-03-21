import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync("f1.db");

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

const meetingsTableSql = `
    CREATE TABLE meetings (
        meeting_key INT PRIMARY KEY,
    )
`;

console.log(db);
