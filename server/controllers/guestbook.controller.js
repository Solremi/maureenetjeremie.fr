import GuestbookDataMapper from '../datamappers/guestbook.datamapper.js';
import pool from '../../config/pg.config.js';

const guestbookDataMapper = new GuestbookDataMapper(pool);

export const createMessage = async (req, res) => {
  try {
    const { content } = req.body;

    if (!req.session.user) {
      console.error('Unauthorized: No user in session');
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const userId = req.session.user.id;
    console.log('User ID:', userId);

    const newMessage = await guestbookDataMapper.addEntry({ content, userId });
    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Error creating message:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const showGuestbookMessages = async (req, res) => {
  try {
    const messages = await guestbookDataMapper.getEntries();
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error.message);
    res.status(500).json({ error: error.message });
  }
};
