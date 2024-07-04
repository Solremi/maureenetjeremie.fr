import PictureDataMapper from "../datamappers/picture.datamapper.js";
import { v4 as uuidv4 } from 'uuid';

const pictureDataMapper = new PictureDataMapper();

export async function uploadImage(req, res) {
    try {
        const { data } = req.body;
        if (!data) {
            throw new Error("Image data is required");
        }
        const name = req.body.name || `${uuidv4()}.jpg`;
        console.log('Uploading image with name:', name);
        console.log('Image data:', data.slice(0, 100)); // Log pour débogage (premiers 100 caractères)

        const picture = await pictureDataMapper.create({ name, data });
        res.status(201).json(picture);
    } catch (error) {
        console.error('Error in uploadImage:', error);
        res.status(500).json({ error: error.message });
    }
}

export async function getImages(req, res) {
    try {
        console.log('Fetching images');
        const pictures = await pictureDataMapper.findAll();
        res.status(200).json(pictures);
    } catch (error) {
        console.error('Error in getImages:', error);
        res.status(500).json({ error: error.message });
    }
}
