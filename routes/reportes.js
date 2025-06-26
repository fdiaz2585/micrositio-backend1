import express from 'express';
import db from '../database.js';

const router = express.Router();

// Obtener todos los reportes
router.get('/', (req, res) => {
  db.all('SELECT * FROM reports', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Crear nuevo reporte
router.post('/', (req, res) => {
  const { title, url } = req.body;
  db.run('INSERT INTO reports (title, url) VALUES (?, ?)', [title, url], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID });
  });
});

// Obtener reportes asignados a un usuario
router.get('/usuario/:userId', (req, res) => {
  const userId = req.params.userId;
  const query = `
    SELECT r.id, r.title, r.url
    FROM reports r
    JOIN user_reports ur ON r.id = ur.report_id
    WHERE ur.user_id = ?
  `;
  db.all(query, [userId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Asignar reporte a usuario
router.post('/asignar', (req, res) => {
  const { user_id, report_id } = req.body;
  db.run('INSERT INTO user_reports (user_id, report_id) VALUES (?, ?)', [user_id, report_id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID });
  });
});

// Eliminar asignación
router.delete('/asignar', (req, res) => {
  const { user_id, report_id } = req.body;
  db.run('DELETE FROM user_reports WHERE user_id = ? AND report_id = ?', [user_id, report_id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Asignación eliminada' });
  });
});

export default router;
