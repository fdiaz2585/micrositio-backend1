import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export async function getDBConnection() {
  return open({
    filename: './database.sqlite',
    driver: sqlite3.Database
  });
}
