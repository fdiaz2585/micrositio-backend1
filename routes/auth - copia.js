import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getDBConnection } from '../db.js';

const router = express.Router();

// Ruta de login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const db = await getDBConnection();
    const user = await db.get("SELECT * FROM users WHERE email = ?", [email]);

    if (!user) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, 'secreto', {
      expiresIn: '1h',
    });

    res.json({ token, role: user.role });
  } catch (error) {
    console.error("Error al autenticar:", error.message);
    res.status(500).json({ message: "Error del servidor" });
  }
});

export default router;
