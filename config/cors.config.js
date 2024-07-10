const corsOptions = {
  origin: ['http://localhost:5173', 'https://maureenetjeremie.fr'], // adresse du front
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'], // En-têtes autorisés
  credentials: true, 
};

export default corsOptions;

