
class GuestbookDataMapper {
    constructor(pool) {
      this.pool = pool;
    }
  
    async addEntry({ content, userId }) {
      const query = 'INSERT INTO "message" (content, user_id) VALUES ($1, $2) RETURNING *';
      const values = [content, userId];
  
      try {
        const result = await this.pool.query(query, values);
        return result.rows[0];
      } catch (error) {
        console.error('Error executing query:', error.message);
        throw error;
      }
    }
  
    async getEntries() {
      const query = `
        SELECT "message".content, "message".created_at, "user".firstname 
        FROM "message" 
        JOIN "user" ON "message".user_id = "user".id 
        ORDER BY "message".created_at DESC
      `;
      try {
        const result = await this.pool.query(query);
        return result.rows;
      } catch (error) {
        console.error('Error executing query:', error.message);
        throw error;
      }
    }
  }
  
  export default GuestbookDataMapper;
