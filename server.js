
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

app.use(express.static(path.join(__dirname, 'dist')));

// Activation CORS
app.use(cors(corsOptions));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 },
  })
);


app.use(router);

/* a mettre en production avec index.html dans le dossier public
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
*/

httpServer.listen(PORT, () => {
});

export default app;
