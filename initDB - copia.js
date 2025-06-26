// initDB.js
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Función para abrir la base de datos
async function initDB() {
  const db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      role TEXT NOT NULL
    )
  `);

  console.log('✅ Base de datos inicializada con las tablas necesarias.');
  await db.close();
}

initDB().catch(err => {
  console.error('Error al inicializar la base de datos:', err);
});
