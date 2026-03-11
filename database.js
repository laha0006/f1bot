import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync("f1.db");

console.log(db);
