import GuestbookDataMapper from "../datamappers/guestbook.datamapper.js";
import pool from '../../config/pg.config.js';

const guestbookDataMapper = new GuestbookDataMapper(pool);

export const addMessage = async (req, res) => {
    const { message } = req.body;

    if ( !message) {
        return res.status(400).json({ error: "Tu dois écrire un message" });
    }

    try {
        const entry = await guestbookDataMapper.addEntry(req.body);
        return res.status(201).json(entry);

    } catch (error) {
        return res.status(500).json({ error: "Erreur interne du serveur" });
    }
}

export const getMessage = async (req, res) => {
    try {
        const entries = await guestbookDataMapper.getEntries();
        return res.status(200).json(entries);

    } catch (error) {
        return res.status(500).json({ error: "Erreur interne du serveur" });
    }
}