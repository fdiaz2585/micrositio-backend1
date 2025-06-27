import bcrypt from 'bcrypt';
import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./database.sqlite');
const saltRounds = 10;
const plainPassword = 'admin123'; // contraseña real

bcrypt.hash(plainPassword, saltRounds, function(err, hash) {
  db.run(
    `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`,
    ['SuperAdmin', 'comunicacion@lubriagsa.com.mx', hash, 'admin123'],
    function(err) {
      if (err) return console.error('ERROR:', err.message);
      console.log('Usuario admin creado con contraseña:', plainPassword);
      db.close();
    }
  );
});

