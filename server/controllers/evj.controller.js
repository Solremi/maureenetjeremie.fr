import EvjDataMapper from "../datamappers/evj.datamapper.js";
import { v4 as uuidv4 } from 'uuid';

// Instancier la classe EvjDataMapper
const evjDataMapper = new EvjDataMapper();

// Fonction pour valider les données d'image
function validateImage(image) {
    if (!image.data || !image.name) {
        throw new Error("Chaque image doit contenir un champ 'data' et 'name'.");
    }

    // Vous pouvez ajouter d'autres validations ici, comme vérifier la taille de l'image ou son type MIME
    return true;
}

export async function uploadImage(req, res) {
    try {
        // Vérifiez si des images sont fournies dans la requête
        const { images } = req.body;
        if (!images || !Array.isArray(images) || images.length === 0) {
            return res.status(400).json({ error: "Aucune image trouvée dans la requête." });
        }

        // Valider et traiter chaque image
        const uploadedImages = await Promise.all(images.map(async (image) => {
            validateImage(image);

            // Nom unique généré si aucun nom n'est fourni
            const imageName = image.name || `${uuidv4()}.jpg`;

            // Appel au dataMapper pour sauvegarder l'image
            const savedImage = await evjDataMapper.create({ name: imageName, data: image.data });
            return savedImage;
        }));

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

        // Ajouter les en-têtes Cache-Control
        // Cache pour 30 jours (2592000 secondes)
        res.setHeader('Cache-Control', 'public, max-age=2592000, must-revalidate');

        // Répondre avec les images récupérées
        res.status(200).json(pictures || []);
    } catch (error) {
        console.error('Erreur dans getImages:', error);
        res.status(500).json({ error: "Une erreur est survenue lors de la récupération des images." });
    }
}
