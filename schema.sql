DROP TABLE IF EXISTS meeting;
DROP TABLE IF EXISTS session;

CREATE TABLE IF NOT EXISTS meeting (
    meeting_key INT PRIMARY KEY,
    circuit_key INT
);

CREATE TABLE IF NOT EXISTS session (
    session_key INT PRIMARY KEY,
    meeting_key INT 
);