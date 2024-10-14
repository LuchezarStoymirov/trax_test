import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export const openDb = async () => {
    const db = await open({
        filename: './database.db',
        driver: sqlite3.Database
    });

    await db.exec(`
        CREATE TABLE IF NOT EXISTS entries (
            id TEXT PRIMARY KEY,
            brand TEXT NOT NULL,
            model TEXT NOT NULL,
            registration_plate TEXT NOT NULL,
            year_of_manufacturing INTEGER NOT NULL
        );
    `);

    return db;
};
