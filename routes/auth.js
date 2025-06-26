import express from 'express';
import bcrypt from 'bcrypt';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const router = express.Router();

const dbPromise = open({
  filename: './database.sqlite',
  driver: sqlite3.Database
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const db = await dbPromise;

  try {
    const user = await db.get('SELECT * FROM users WHERE email = ?', email);
    if (!user) return res.status(401).json({ message: 'Usuario no encontrado' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ message: 'Contraseña incorrecta' });

    res.json({
      message: 'Login exitoso',
      user: { id: user.id, name: user.name, role: user.role }
    });
  } catch (err) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

export default router;
