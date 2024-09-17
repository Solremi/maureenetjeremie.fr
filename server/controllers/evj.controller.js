import EvjDataMapper from "../datamappers/evj.datamapper.js";
import { v4 as uuidv4 } from 'uuid';

// Instancier la classe EvjDataMapper
const evjDataMapper = new EvjDataMapper();

export async function uploadImage(req, res) {
    try {
        // Vérifiez si des images sont fournies dans la requête
        const { images } = req.body;
        if (!images || !Array.isArray(images) || images.length === 0) {
            return res.status(400).json({ error: "Aucune image trouvée dans la requête." });
        }

        // Valider chaque image
        const uploadedImages = [];
        for (const image of images) {
            if (!image.data || !image.name) {
                return res.status(400).json({ error: "Chaque image doit contenir un champ 'data' et 'name'." });
            }

            // Nom unique généré si aucun nom n'est fourni
            const imageName = image.name || `${uuidv4()}.jpg`;

            // Appel au dataMapper pour sauvegarder l'image
            const savedImage = await evjDataMapper.create({ name: imageName, data: image.data });
            uploadedImages.push(savedImage);
        }

        // Retourner toutes les images téléchargées avec un statut 201 (Créé)
        res.status(201).json(uploadedImages);
    } catch (error) {
        console.error('Erreur dans uploadImage:', error);
        res.status(500).json({ error: "Une erreur est survenue lors de l'upload des images." });
    }
}

export async function getImages(req, res) {
    try {
        const pictures = await evjDataMapper.findAll();
        res.status(200).json(pictures || []);
    } catch (error) {
        console.error('Erreur dans getImages:', error);
        res.status(500).json({ error: "Une erreur est survenue lors de la récupération des images." });
    }
}
