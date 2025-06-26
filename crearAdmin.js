import db from './database.js';
import bcrypt from 'bcrypt';

const crearAdmin = async () => {
  try {
    db.get(`SELECT * FROM users WHERE email = ?`, ['soporte@lubriagsa.com'], async (err, row) => {
      if (err) {
        console.error('Error consultando el usuario:', err.message);
      } else if (row) {
        console.log('❌ Ya existe un usuario con ese correo.');
      } else {
        const passwordPlain = 'admin123';
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(passwordPlain, saltRounds);

        db.run(
          `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`,
          ['Admin', 'soluinfomatica@gmail.com', hashedPassword, 'admin123'],
          function (err) {
            if (err) {
              console.error('Error insertando el usuario:', err.message);
            } else {
              console.log('✅ Usuario administrador creado con ID:', this.lastID);
            }
          }
        );
      }
    });
  } catch (error) {
    console.error('Error creando admin:', error);
  }
};

crearAdmin();

