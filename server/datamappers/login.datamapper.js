

export default class LoginDataMapper {
  constructor(pool) {
    this.pool = pool;
  }

  async findUserByName(firstname) {
    const query = `
    SELECT *
    FROM "user"
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
