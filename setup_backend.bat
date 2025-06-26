@echo off
REM Script para configurar y correr el backend del micrositio

cd /d %~dp0backend

echo Creando package.json...
(
echo {
echo   "name": "micrositio-backend",
echo   "version": "1.0.0",
echo   "description": "Backend para micrositio de Power BI",
echo   "main": "index.js",
echo   "type": "module",
echo   "scripts": {
echo     "start": "node index.js",
echo     "init-db": "node initDatabase.js"
echo   },
echo   "dependencies": {
echo     "cors": "^2.8.5",
echo     "dotenv": "^16.0.3",
echo     "express": "^4.18.2",
echo     "jsonwebtoken": "^9.0.0",
echo     "sqlite": "^4.1.2",
echo     "sqlite3": "^5.1.6"
echo   }
echo }
) > package.json

echo Instalando dependencias...
npm install

echo Iniciando backend...
npm run start
pause
