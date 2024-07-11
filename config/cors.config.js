const corsOptions = {
  origin: ['http://localhost:5173', 'https://maureenetjeremie.fr'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

export default corsOptions;

