import 'dotenv/config';
import express from 'express';
import { createServer } from 'node:http';
import router from './server/routers/main.router.js';
import session from 'express-session';
import cors from 'cors';
import corsOptions from './config/cors.config.js';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 5000;

// Middleware pour parser les corps de requêtes
app.use(bodyParser.json({ limit: '10mb' })); // Support for large image payloads
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// Activation CORS
app.use(cors(corsOptions));

// Middleware pour parser les corps de requêtes (redondant, déjà fait avec bodyParser)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuration de la session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production', // En production, utilisez des cookies sécurisés
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true
    },
  })
);

// Servir les fichiers statiques depuis le dossier 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Utilisation du router
app.use(router);

// Gestion des routes inconnues
app.use('*', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, 'public') });
});

// Middleware de gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

// Démarrage du serveur
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
