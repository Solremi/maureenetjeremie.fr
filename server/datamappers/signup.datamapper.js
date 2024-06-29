class SignupDataMapper {

  constructor(pool) {
    this.pool = pool;
  }

  async createUser(lastname, firstname, email, hashedPassword) {
    const query = 'INSERT INTO "user" (lastname, firstname, email, password) VALUES ($1, $2, $3, $4)';
    const values = [lastname, firstname, email, hashedPassword];
    try {
        await this.pool.query(query, values);
    } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur:', error);
        throw error;
    }
}
}

export default SignupDataMapper;