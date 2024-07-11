import pool from '../../config/pg.config.js';

export default class GuestbookDataMapper {
  constructor() {
    this.pool = pool;
  }

  async addEntry({ content, firstname }) {
    const query = `
      INSERT INTO "message" (content, firstname, created_at)
      VALUES ($1, $2, NOW())
      RETURNING *;
    `;
    const values = [content, firstname];
    try {
      const result = await this.pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  async getEntries() {
    const query = `
      SELECT content, created_at, firstname 
      FROM "message" 
      ORDER BY created_at DESC;
    `;
    try {
      const result = await this.pool.query(query);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }
}
