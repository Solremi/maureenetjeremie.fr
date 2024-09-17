import React, { useState, useEffect } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import axiosInstance from "../../axios/axios";
import "./Evj.scss";

function ImageUploader() {
    const [images, setImages] = useState<{ data: string, name: string }[]>([]);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [modalImage, setModalImage] = useState<string | null>(null);

    // Fetch les images depuis le backend
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axiosInstance.get('/api/evj');
                setImages(Array.isArray(response.data) ? response.data : []); // Vérification pour être sûr d'avoir un tableau
            } catch (error) {
                setError('Erreur lors de la récupération des images');
            }
        };
        fetchImages();
    }, []);

    // Gestion de la sélection de plusieurs fichiers
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setSelectedFiles(Array.from(e.target.files)); // Conversion en tableau
        }
    };

    // Soumettre le formulaire pour uploader plusieurs images
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (selectedFiles.length === 0) {
            setError("Choisi des images à partager.");
            return;
        }

        try {
            const imagesToUpload = await Promise.all(
                selectedFiles.map(file => {
                    return new Promise<{ data: string, name: string }>((resolve, reject) => {
                        const reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onloadend = () => {
                            if (reader.result) {
                                resolve({ data: reader.result as string, name: file.name });
                            } else {
                                reject(new Error("Erreur lors de la lecture du fichier"));
                            }
                        };
                    });
                })
            );

            await axiosInstance.post('/api/evj', { images: imagesToUpload });
            setSelectedFiles([]);
            // Réactualiser la liste des images
            const response = await axiosInstance.get('/api/evj');
            setImages(response.data);
        } catch (error) {
            setError('Erreur lors de l\'upload des images');
        }
    };

    // Fonction pour ouvrir la modal avec l'image
    const handleImageClick = (imageSrc: string) => {
        setModalImage(imageSrc);
    };

    // Fonction pour fermer la modal
    const closeModal = () => {
        setModalImage(null);
    };

    return (
        <div className="pictureevj">
            <Header />
            <div id="container-page">
                <div id="container-box" className="box hero-body">
                    <h1 title="Galerie des souvenirs" className="title is-1 has-text-centered" id="title-gallery">
                        Souvenirs de <s>son</s> notre enterrement 🙊
                    </h1>
                    <p id="text" className="subtitle has-text-centered">
                        Nous avons passé un moment inoubliable 🥰,<br />nous avons beaucoup de chance de vous avoir.
                    </p>
                </div>

                <div className="container" id="form-gallery">
                    <div className="columns is-vcentered is-centered">
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <div className="field">
                                <div className="file is-light">
                                    <label className="file-label">
                                        <input
                                            className="file-input"
                                            type="file"
                                            name="images"
                                            accept="image/*"
                                            multiple // Permet la sélection multiple
                                            onChange={handleFileChange}
                                        />
                                        <div id="choose-box" className="box">
                                            <span id="chooseFile" className="file-cta">
                                                <span className="file-label">Choisi des photos ici…</span>
                                            </span>
                                            <span id="choosenFile">
                                                {selectedFiles.length > 0 && (
                                                    <div className="field has-text-centered">
                                                        <p>{selectedFiles.length} fichier(s) sélectionné(s)</p>
                                                    </div>
                                                )}
                                            </span>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <div className="field has-text-centered">
                                <button id="button-transferer" className="button" type="submit">Transférer</button>
                                {error && <p className="has-text-danger">{error}</p>}
                            </div>
                        </form>
                    </div>
                </div>

                <div className="box container is-flex-wrap-wrap" id="picture-container">
                    {images.length > 0 ? (
                        images.map((image, index) => (
                            <div id="Onecard" className="column is-full-mobile is-one-third-tablet is-one-quarter-desktop" key={index}>
                                <div className="card">
                                    <div className="card-image">
                                        <figure className="image">
                                            {/* Clic sur l'image pour ouvrir la modal */}
                                            <img
                                                src={image.data}
                                                alt={image.name}
                                                style={{ width: "100vw", height: "auto" }}
                                                onClick={() => handleImageClick(image.data)}
                                                role="button"
                                            />
                                        </figure>
                                    </div>
                                    <div id="card-content" className="card-content">
                                        {/* Lien pour télécharger l'image */}
                                        <a href={image.data} download={image.name} className="button is-small">
                                            Télécharger
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Aucune image disponible.</p>
                    )}
                </div>

                {/* Modal pour afficher l'image en grand */}
                {modalImage && (
                    <div className="modal is-active">
                        <div className="modal-background" onClick={closeModal}></div>
                        <div className="modal-content">
                            <p className="image">
                                <img src={modalImage} alt="Modal content" />
                            </p>
                        </div>
                        <button className="modal-close is-large" aria-label="close" onClick={closeModal}></button>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default ImageUploader;
