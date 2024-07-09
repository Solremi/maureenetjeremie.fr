import React, { useState, useEffect } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import axiosInstance from "../../axios/axios";
import "./Picture.scss";

function ImageUploader() {
    const [image, setImage] = useState<string | ArrayBuffer | null>(null);
    const [name, setName] = useState('');
    const [images, setImages] = useState<{ data: string, name: string }[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axiosInstance.get('/api/picture');
                setImages(response.data);
            } catch (error) {
                setError('Error fetching images');
                console.error('Error fetching images:', error);
            }
        };
        fetchImages();
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setImage(reader.result);
                setName(file.name);
            };
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!image) {
            setError("Choisi une image à partager.");
            return;
        }
        try {
            await axiosInstance.post('/api/picture', { data: image, name });
            alert('Image uploaded successfully');
            setImage(null);
            setName('');
            // Refresh the image list
            const response = await axiosInstance.get('/api/picture');
            setImages(response.data);
        } catch (error) {
            setError('Error uploading image');
            console.error('Error uploading image:', error);
        }
    };

    return (
        <div className="picture">
            <Header />
            <div id="container-page"> 
                <div id="container-box" className="box hero-body ">
                    <h1 title="Gallerie des souvenirs" className="title is-1  has-text-centered" id="title-gallery">
                        Gallerie des souvenirs
                    </h1>
                    <br />
                    <p id="text" className="subtitle has-text-centered ">
                        Partagez vos plus belles photos avec nous. <br /> <em>formats (.png .jpeg .jpg, .webp )</em>
                    </p>
                    <p id="text" className="subtitle has-text-centered ">
                        Vous pouvez télécharger les photos qui s'affichent ci-dessous en faisant un clique droit à la souris, puis télécharger "enregistrer l'image sous ".
                    </p>
                </div>

                <div className="container" id="form-gallery">
                    <div className="columns is-vcentered is-centered">
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <div className="field">
                                <div className="file is-light">
                                    <label className="file-label">
                                        <input className="file-input" type="file" name="image" accept="image/*" onChange={handleFileChange} />
                                        <span id="chooseFile" className="file-cta">
                                            <span className="file-label">Choisi une photo ici…</span>
                                        </span>
                                    </label>
                                </div>
                            </div>
                            <div className="field has-text-centered">
                                <button className="button is-success" type="submit">transférer</button>
                            </div>
                        </form>
                    </div>
                </div>

                {error && <p className="has-text-danger">{error}</p>}

                <div className="box container is-flex-wrap-wrap" id="picture-container">
                    {images.length > 0 ? (
                        images.map((image, index) => (
                            <div id="Onecard" className="column is-full-mobile is-one-third-tablet is-one-quarter-desktop" key={index}>
                                <div className="card">
                                    <div className="card-image">
                                        <figure className="image">
                                            <img src={image.data} alt={image.name} style={{ width: "100vw", height: "auto" }} />
                                        </figure>
                                    </div>
                                    <div id="card-content" className="card-content">
                                        <p id="picture-name" className="title has-text-white">{image.name}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Aucune image disponible.</p>
                    )}
                </div>
            </div>
            
            <Footer />
        </div>
    );
}

export default ImageUploader;
