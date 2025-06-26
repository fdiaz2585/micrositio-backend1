import express from 'express';

const router = express.Router();

// Ruta para obtener todos los usuarios (ejemplo de prueba)
router.get('/usuarios', (req, res) => {
  res.json({ mensaje: 'Ruta de usuarios funcionando' });
});

export default router;
