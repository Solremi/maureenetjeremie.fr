import PictureDataMapper from "../datamappers/picture.datamapper.js";
import { v4 as uuidv4 } from 'uuid';

const pictureDataMapper = new PictureDataMapper();

export async function uploadImage(req, res) {
    try {
        const { data } = req.body;
        const name = req.body.name || `${uuidv4()}.jpg`; // Génère un nom de fichier unique si non fourni
        console.log('Uploading image with name:', name); // Log pour débogage
        const picture = await pictureDataMapper.create({ name, data });
        res.status(201).json(picture);
    } catch (error) {
        console.error('Error in uploadImage:', error); // Log pour débogage
        res.status(500).json({ error: error.message });
    }
}

export async function getImages(req, res) {
    try {
        console.log('Fetching images'); // Log pour débogage
        const pictures = await pictureDataMapper.findAll();
        res.status(200).json(pictures);
    } catch (error) {
        console.error('Error in getImages:', error); // Log pour débogage
        res.status(500).json({ error: error.message });
    }
}
