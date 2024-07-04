
export default class PictureDataMapper {

    constructor(pool) {
        this.pool = pool;
      }

    async create({ name, data }) {
        const result = await this.pool.query(
            `INSERT INTO "picture" (name, data, created_at) VALUES ($1, $2, NOW()) RETURNING *`,
            [name, data]
        );
        return result.rows[0];
    }

    async findAll() {
        const result = await this.pool.query(`SELECT * FROM "picture" ORDER BY created_at DESC`);
        return result.rows;
    }
}