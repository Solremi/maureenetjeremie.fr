import pool from '../../config/pg.config.js';
import bcrypt from 'bcryptjs';
import LoginDataMapper from '../datamappers/login.datamapper.js';

const loginDataMapper = new LoginDataMapper(pool);

export const loginUser = async (req, res) => {
    const { firstname, password } = req.body;

    if (!firstname || !password) {
        return res.status(400).json({ error: "Tous les champs doivent être remplis" });
    }

    try {
        const user = await loginDataMapper.findUserByName(firstname);

        if (!user) {
            return res.status(401).json({ error: "Prénom ou mot de passe incorrect" });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        
        if (!validPassword) {
            return res.status(401).json({ error: "Prénom ou mot de passe incorrect" });
        }
        return res.status(200).json({ message: "Connexion réussie" });

    } catch (error) {
        return res.status(500).json({ error: "Erreur interne du serveur" });
    }
};

export const logoutUser = async (req, res) => {
    try {
        req.session.destroy();
        return res.status(200).json({ message: "Déconnexion réussie" });

    } catch (error) {
        return res.status(500).json({ error: "Erreur interne du serveur" });
    }
}
