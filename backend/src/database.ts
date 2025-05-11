// src/database.ts
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export let db: Awaited<ReturnType<typeof open>>;

export const initDb = async () => {
  db = await open({
    filename: './sustainability.db',
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS queries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      query TEXT NOT NULL,
      response TEXT NOT NULL,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
};
