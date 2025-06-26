import db from './database.js';
import bcrypt from 'bcrypt';

const crearAdmin = async () => {
  try {
    const passwordPlain = '123456'; // Cambia la contraseña aquí si quieres
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(passwordPlain, saltRounds);

    db.run(
      `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`,
      ['Admin', 'soporte@lubriagsa.com', hashedPassword, 'admin123'],
      function (err) {
        if (err) {
          console.error('Error insertando el usuario:', err.message);
        } else {
          console.log('Usuario administrador creado con ID:', this.lastID);
        }
      }
    );
  } catch (error) {
    console.error('Error creando admin:', error);
  }
};

crearAdmin();
