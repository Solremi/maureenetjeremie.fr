import bcrypt from 'bcryptjs';
import pool from '../../config/pg.config.js';
import SignupDataMapper from '../datamappers/signup.datamapper.js';
import emailValidator from 'email-validator';
import { userSchema } from '../../config/userValidator.config.js';
import { sendInvitationEmail } from '../../config/nodemailer.config.js'; // Assurez-vous d'importer correctement votre fonction

const signDataMapper = new SignupDataMapper(pool);

export const createUser = async (req, res) => {
    const { lastname, firstname, email, password, confirmPassword } = req.body;

    try {
        userSchema.parse({ lastname, firstname, password });
    } catch (e) {
        return res.status(400).json({ error: "Données invalides", details: e.errors });
    }

    if (!email || !lastname || !firstname || !password || !confirmPassword) {
        return res.status(400).json({ error: "Tous les champs doivent être remplis" });
    }

    const existingUser = await signDataMapper.findUserByEmail(email);
    if (existingUser) {
        return res.status(409).json({ error: "Cet email est déjà utilisé" });
    }

    if (!emailValidator.validate(email)) {
        return res.status(400).json({ error: "Cet email n'est pas valide" });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ error: "Les mots de passe ne correspondent pas" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await signDataMapper.createUser(lastname, firstname, email, hashedPassword);

    try {
        await sendInvitationEmail(email); 
    } catch (error) {
        return res.status(500).json({ error: "Erreur lors de l'envoi de l'email" });
    }

    return res.status(201).json({ message: "Utilisateur créé et email envoyé" });
};
