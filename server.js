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

app.use(bodyParser.json({ limit: '10mb' })); // Support for large image payloads
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// Middleware pour parser les corps de requêtes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Servir les fichiers statiques depuis le dossier 'public'
app.use(express.static('./public'));
// Activation CORS
app.use(cors(corsOptions));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    httpOnly: true,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 },
  })
);

app.use(router);

app.use('*', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, './public') });
});

httpServer.listen(PORT, () => {
});

export default app;
