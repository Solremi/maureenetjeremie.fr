import GuestbookDataMapper from '../datamappers/guestbook.datamapper.js';
import pool from '../../config/pg.config.js';

const guestbookDataMapper = new GuestbookDataMapper(pool);

export const createMessage = async (req, res) => {
  try {
    const { content, firstname } = req.body;

    if (!content || !firstname) {
      return res.status(400).json({ error: 'Content and firstname are required' });
    }

    const newMessage = await guestbookDataMapper.addEntry({ content, firstname });
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const showGuestbookMessages = async (req, res) => {
  try {
    const messages = await guestbookDataMapper.getEntries();
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
