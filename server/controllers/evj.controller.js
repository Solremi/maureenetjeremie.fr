import EvjDataMapper from "../datamappers/evj.datamapper.js"; // Import correct
import { v4 as uuidv4 } from 'uuid';

// Assurez-vous d'instancier la classe EvjDataMapper
const evjDataMapper = new EvjDataMapper();  // Ajout de cette ligne

export async function uploadImage(req, res) {
    try {
        const { data } = req.body;
        if (!data) {
            throw new Error("Image data is required");
        }
        const name = req.body.name || `${uuidv4()}.jpg`;

        // Utilisez l'instance de evjDataMapper
        const picture = await evjDataMapper.create({ name, data });
        res.status(201).json(picture);
    } catch (error) {
        console.error('Error in uploadImage:', error);
        res.status(500).json({ error: error.message });
    }
}

export async function getImages(req, res) {
    try {
        // Utilisez l'instance de evjDataMapper
        const pictures = await evjDataMapper.findAll();
        res.status(200).json(pictures);
    } catch (error) {
        console.error('Error in getImages:', error);
        res.status(500).json({ error: error.message });
    }
}
