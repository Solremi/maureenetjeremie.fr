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
        throw error;
    }
  }

  async findUserByEmail(email) {
    const query = 'SELECT * FROM "user" WHERE email = $1';
    const values = [email];
    try {
        const { rows } = await this.pool.query(query, values);
        return rows[0];
    } catch (error) {
        throw error;
    }
  }
}

export default SignupDataMapper;