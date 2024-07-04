import React, { useState, useEffect } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import axiosInstance from "../../axios/axios";
import "./Picture.scss";

function ImageUploader() {
    const [image, setImage] = useState<string | ArrayBuffer | null>(null);
    const [name, setName] = useState('');
    const [images, setImages] = useState<{ data: string, name: string }[]>([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axiosInstance.get('/api/picture');
                setImages(response.data);
            } catch (error) {
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
        try {
            await axiosInstance.post('/api/picture', { image, name });
            alert('Image uploaded successfully');
            setImage(null);
            setName('');
            // Refresh the image list
            const response = await axiosInstance.get('/api/picture');
            setImages(response.data);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    return (
        <div className="picture">
            <Header />
            <div className="box hero-body has-background-danger">
                <h1 title="Gallerie des souvenirs" className="title is-1 has-text-white has-text-centered" id="title-gallery">
                    Gallerie des souvenirs
                </h1>
                <br />
                <p className="subtitle has-text-centered has-text-white">
                    Partagez vos plus belles photos avec les mariés <em>formats (.png .jpeg .jpg )</em>
                </p>
            </div>

            <div className="container" id="form-gallery">
                <div className="columns is-vcentered is-centered">
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="field">
                            <div className="file is-light">
                                <label className="file-label">
                                    <input className="file-input" type="file" name="image" accept="image/*" onChange={handleFileChange} />
                                    <span className="file-cta">
                                        <span className="file-label">Choose a file…</span>
                                    </span>
                                </label>
                            </div>
                        </div>
                        <div className="field has-text-centered">
                            <button className="button is-success" type="submit">Uploader</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="box container is-flex is-flex-wrap-wrap" id="picture-container">
                {images.length > 0 ? (
                    images.map((image, index) => (
                        <div className="column is-one-quarter" key={index}>
                            <div className="card">
                                <div className="card-image">
                                    <figure className="image">
                                        <img src={`data:image/jpeg;base64,${image.data}`} alt={image.name} style={{ width: "100%", height: "auto" }} />
                                    </figure>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Aucune image disponible.</p>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default ImageUploader;
