import React, { useState, useEffect } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import axiosInstance from "../../axios/axios";
import "./Guestbook.scss";

export default function Goldenbook() {
    const [content, setContent] = useState("");
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState("");

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

    useEffect(() => {
        fetchMessages();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const userName = session.firstname; 
            const response = await axiosInstance.post('/api/guestbook', { content, userName });
            if (response.status === 200) {
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
            <div className="box hero-body has-background-warning-dark">
                <h1 className="title is-2 has-text-white" id="title-gallery">Livre d'or</h1>
                <p className="subtitle has-text-centered has-text-white">Écris-nous un petit mot, ça fait toujours plaisir</p>
            </div>
            <div id="container-message" className="container">
                <form id="form-message" onSubmit={handleSubmit}>
                    <textarea
                        id="content"
                        className="textarea is-warning"
                        name="content"
                        placeholder="Écris ici"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                    {error && <p className="has-text-danger">{error}</p>}
                    <div className="control has-text-centered">
                        <button type="submit" id="button-addMessage" className="button is-warning is-medium">
                            Envoyer
                        </button>
                    </div>
                </form>
                <div>
                    <p className="title is-4 has-text-warning-dark">Messages</p>
                    <div id="messages" className="content">
                        {messages.map((message, index) => (
                            <div key={index} className="box">
                                <p className="subtitle is-6"><strong>{message.userName}:</strong> {message.content}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
