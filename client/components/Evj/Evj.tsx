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
    const [loadingImages, setLoadingImages] = useState<boolean>(true); // Gestion du chargement des images
    const [uploading, setUploading] = useState<boolean>(false);

    // Fetch des images depuis le backend
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axiosInstance.get("/api/evj");
                const imagesData = Array.isArray(response.data) ? response.data : [];
                setImages(imagesData);
            } catch (error) {
                console.error("Erreur lors du chargement des images :", error);
                setError("Erreur lors du chargement des images.");
            } finally {
                setLoadingImages(false);
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
        setError(null);
        if (selectedFiles.length === 0) {
            setError("Choisi des images à partager.");
            return;
        }
        if (selectedFiles.length > 10) {
            setError("Tu ne peux pas uploader plus de 10 photos à la fois.");
            return;
        }

        setUploading(true);

        try {
            const imagesToUpload = await Promise.all(
                selectedFiles.map((file) => {
                    return new Promise<{ data: string; name: string }>((resolve, reject) => {
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

            await axiosInstance.post("/api/evj", { images: imagesToUpload });
            setSelectedFiles([]);
            // Réactualiser la liste des images
            const response = await axiosInstance.get("/api/evj");
            setImages(response.data);
        } catch (error) {
            console.error("Erreur lors de l'upload des images :", error);
            setError("Erreur lors de l'upload des images.");
        } finally {
            setUploading(false);
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

    // Fermeture de la modal avec le bouton "Escape"
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                closeModal();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <div className="pictureevj">
            <Header />
            <div id="container-page">
                <div id="container-box" className="box hero-body">
                    <h1 className="title is-1 has-text-centered" id="title-gallery">
                        Souvenirs de <s>son</s> 🐐, notre enterrement 🙊
                    </h1>
                    <p className="subtitle has-text-centered">
                        On a passé un moment inoubliable 🥰,<br />nous avons beaucoup de chance de vous avoir. <br />
                        On vous aime très fort 🫶
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
                                            multiple
                                            onChange={handleFileChange}
                                        />
                                        <div id="choose-box" className="box">
                                            <span className="file-cta">
                                                <span className="file-label">Choisi max 10 photos ici 🖖</span>
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
                                <button id="button-transferer" className="button" type="submit" disabled={uploading}>
                                    {uploading ? "Transfert en cours..." : "Transférer"}
                                </button>
                                {error && <p className="has-text-danger">{error}</p>}
                            </div>
                        </form>
                    </div>
                </div>

                {/* Affichage des images */}
                <div className="box container is-flex-wrap-wrap" id="picture-container">
                    {images.length > 0 ? (
                        images.map((image, index) => (
                            <div className="column is-full-mobile is-one-third-tablet is-one-quarter-desktop" key={index}>
                                <div className="card">
                                    <div className="card-image">
                                        <figure className="image">
                                            <img
                                                loading="lazy"
                                                src={image.data}
                                                alt={image.name}
                                                style={{ width: "100vw", height: "auto" }}
                                                onClick={() => handleImageClick(image.data)}
                                                role="button"
                                            />
                                        </figure>
                                    </div>
                                    <div className="card-content has-text-centered">
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

                {/* Modal de chargement des images */}
                {loadingImages && (
                    <div className="modal is-active">
                        <div className="modal-background" onClick={() => setLoadingImages(false)}></div>
                        <div className="modal-content is-small box has-text-centered">
                            <p>Chargement des images... Dsl c'est un server pas cher 😅</p>
                        </div>
                        {/* Bouton pour fermer la modal */}
                        <button className="delete" onClick={() => setLoadingImages(false)} aria-label="close"></button>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default ImageUploader;
