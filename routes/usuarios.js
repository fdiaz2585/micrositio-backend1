import express from 'express';
import db from '../database.js';
import bcrypt from 'bcrypt';

const router = express.Router();

// GET: Obtener todos los usuarios
router.get('/', (req, res) => {
  db.all('SELECT id, name, email, role FROM users', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// POST: Crear un nuevo usuario
router.post('/', async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role) {
    return res.status(400).json({ error: 'Campos incompletos' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    db.run(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, role],
      function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID });
      }
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE: Eliminar usuario
router.delete('/:id', (req, res) => {
  db.run('DELETE FROM users WHERE id = ?', [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Usuario eliminado' });
  });
});

// PUT: Cambiar nombre y email
router.put('/:id', (req, res) => {
  const { name, email } = req.body;
  db.run(
    'UPDATE users SET name = ?, email = ? WHERE id = ?',
    [name, email, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Usuario actualizado' });
    }
  );
});

// PUT: Cambiar rol
router.put('/:id/role', (req, res) => {
  const { role } = req.body;
  db.run(
    'UPDATE users SET role = ? WHERE id = ?',
    [role, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Rol actualizado' });
    }
  );
});

export default router;
