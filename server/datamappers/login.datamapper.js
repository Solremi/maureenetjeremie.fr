

export default class LoginDataMapper {
  constructor(pool) {
    this.pool = pool;
  }

  async findUserByName(email) {
    const query = `
    SELECT *
    FROM "user"
    WHERE "email" = $1;
    `;

    const values = [email];
    try {
      const { rows } = await this.pool.query(query, values);
      return rows[0];
    } catch (error) {
      throw error;
    }
  } 
}
