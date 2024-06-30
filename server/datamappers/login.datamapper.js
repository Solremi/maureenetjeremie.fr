class LoginDataMapper {
  constructor(pool) {
    this.pool = pool;
  }

  async findUserByNameAndPassword(firstname) {
    const query = `
    SELECT *
    FROM "user"
    INNER JOIN "password"
    ON "user".id = "password".id
    WHERE "firstname" = $1; 
    `;

    const values = [firstname];
    try {
      const { rows } = await this.pool.query(query, values);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }
}

export default LoginDataMapper;