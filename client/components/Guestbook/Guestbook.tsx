import React, { useState, useEffect } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import axiosInstance from "../../axios/axios";
import "./Guestbook.scss";

export default function Goldenbook() {
    const [content, setContent] = useState("");
    const [messages, setMessages] = useState<{ content: string; firstname: string }[]>([]);
    const [error, setError] = useState("");
    const [userName, setUserName] = useState("");

    const fetchMessages = async () => {
        try {
            const response = await axiosInstance.get('/api/guestbook');
            if (response.status === 200) {
                setMessages(response.data);
            }
        } catch (err) {
            setError("Impossible de récupérer les messages.");
        }
    };

    const fetchUser = async () => {
        try {
            const response = await axiosInstance.get('/api/session');
            if (response.status === 200) {
                setUserName(response.data.firstname);
            }
        } catch (err) {
            setError("Impossible de récupérer les informations de l'utilisateur.");
        }
    };

    useEffect(() => {
        fetchMessages();
        fetchUser();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!userName) {
            setError("Vous devez être connecté pour créer un message.");
            return;
        }

        try {
            const response = await axiosInstance.post('/api/guestbook', { content });
            if (response.status === 201) {
                setContent("");
                setError("");
                fetchMessages();
                alert('Message envoyé avec succès');
            }
        } catch (err) {
            setError("Une erreur s'est produite. Veuillez réessayer.");
        }
    };

    return (
        <div className="goldenbook">
            <Header />
            <div id="container-global" className="container">
                <div id="div-title" className="box hero-body has-text-centered">
                    <h1 className="title is-2 has-text-white">Livre d'or</h1>
                    <p className="subtitle has-text-centered has-text-white">Écris-nous un petit mot, ça fait toujours plaisir</p>
                </div>
                <div className="container">
                    <form onSubmit={handleSubmit}>
                        <div className="field">
                            <div className="control">
                                <textarea
                                    className="textarea is-warning"
                                    name="content"
                                    placeholder="Écris ici"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        {error && <p className="has-text-danger">{error}</p>}
                        <div className="control has-text-centered">
                            <button id="button" type="submit" className="button  is-medium">
                                Envoyer
                            </button>
                        </div>
                    </form>
                </div>
                <div>
                    <p className="title is-4">Messages</p>
                    <div id="container-card" className="columns is-multiline">
                        {messages.map((message, index) => (
                            <div id="cards" key={index} className="column is-one-third">
                                <div  className="card">
                                    <div className="card-content">
                                        <p className="message-content">{message.content}</p>
                                        <p className="message-author has-text-right">{message.firstname}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
