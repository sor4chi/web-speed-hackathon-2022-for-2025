import fs from "fs/promises";

import sqlite3 from "better-sqlite3";

import { DATABASE_PATH, INITIAL_DATABASE_PATH } from "../paths.js";

export async function initialize() {
  await fs.copyFile(INITIAL_DATABASE_PATH, DATABASE_PATH);
  const db = new sqlite3(DATABASE_PATH);
  await db.exec(`
  CREATE INDEX
    raceId_index
  ON
    odds_item(raceId)
`);
}
