import PictureDataMapper from "../datamappers/picture.datamapper.js";
import { v4 as uuidv4 } from 'uuid';

const pictureDataMapper = new PictureDataMapper();

// Fonction pour valider chaque image
function validateImage(image) {
    if (!image.data || !image.name) {
        throw new Error("Chaque image doit contenir un champ 'data' et 'name'.");
    }
    // Ajoutez des vérifications supplémentaires si nécessaire (ex: taille, type MIME, etc.)
    return true;
}

export async function uploadImage(req, res) {
    try {
        const { images } = req.body; // Accepter un tableau d'images

        if (!images || !Array.isArray(images) || images.length === 0) {
            return res.status(400).json({ error: "Aucune image trouvée dans la requête." });
        }

        // Utiliser Promise.all pour traiter les images en parallèle
        const uploadedImages = await Promise.all(images.map(async (image) => {
            validateImage(image); // Valider l'image

            // Générer un nom unique si nécessaire
            const name = image.name || `${uuidv4()}.jpg`;

            // Sauvegarder l'image dans la base de données via le DataMapper
            const savedImage = await pictureDataMapper.create({ name, data: image.data });
            return savedImage;
        }));

        // Répondre avec les images enregistrées
        res.status(201).json(uploadedImages);
    } catch (error) {
        console.error('Erreur dans uploadImage:', error);
        res.status(500).json({ error: error.message });
    }
}

export async function getImages(req, res) {
    try {
        const pictures = await pictureDataMapper.findAll();

        // Ajouter des en-têtes Cache-Control
        // Le cache est configuré pour 30 jours (2592000 secondes)
        res.setHeader('Cache-Control', 'public, max-age=2592000, must-revalidate');
        
        // Répondre avec les images
        res.status(200).json(pictures || []); // Assurez-vous de renvoyer un tableau vide si aucune image n'est trouvée
    } catch (error) {
        console.error('Erreur dans getImages:', error);
        res.status(500).json({ error: error.message });
    }
}
