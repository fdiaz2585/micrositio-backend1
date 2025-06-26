import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import usuariosRoutes from './routes/usuarios.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api/usuarios', usuariosRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});
