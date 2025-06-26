import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import usuariosRoutes from './routes/usuarios.js';
import reportesRoutes from './routes/reportes.js';

const app = express();

// Aquí la configuración CORRECTA de CORS:
app.use(cors({
  origin: 'https://micrositiolubriagsa.netlify.app',
  credentials: true
}));

app.use(express.json());

app.use('/api', authRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/reportes', reportesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});
