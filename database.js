import sqlite3 from 'sqlite3';

const sqlite3Verbose = sqlite3.verbose();

const db = new sqlite3Verbose.Database('./database.sqlite', (err) => {
  if (err) {
    console.error('Error al abrir la base de datos:', err.message);
  } else {
    console.log('Conectado a la base de datos SQLite.');
  }
});

export default db;

