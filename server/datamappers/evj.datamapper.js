import pool from '../../config/pg.config.js';


export default class EvjDataMapper {
    constructor() {
        this.pool = pool;
    }

    async create({ name, data }) {
        const result = await this.pool.query(
            `INSERT INTO "evj" (name, data, created_at) VALUES ($1, $2, NOW()) RETURNING *`,
            [name, data]
        );
        return result.rows[0];
    }

    async findAll() {
        const result = await this.pool.query(`SELECT * FROM "evj" ORDER BY created_at DESC`);
        return result.rows;
    }
}