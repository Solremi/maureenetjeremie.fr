import React, { useState, useEffect, useRef } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import axiosInstance from "../../axios/axios";
import { Fireworks } from 'fireworks-js';
import "./Guestbook.scss";

export default function Goldenbook() {
    const [content, setContent] = useState<string>("");
    const [messages, setMessages] = useState<{ content: string; firstname: string }[]>([]);
    const [error, setError] = useState<string>("");
    const [userName, setUserName] = useState<string>(() => {
        // Récupérer les informations utilisateur de localStorage au chargement du composant
        return localStorage.getItem('userName') || '';
    });
    const fireworksContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetchMessages();
    }, []);

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

    const handleSubmit = async (event: React.FormEvent) => {
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
                triggerFireworks();
            }
        } catch (err) {
            setError("Une erreur s'est produite. Veuillez réessayer.");
        }
    };

    const triggerFireworks = () => {
        if (fireworksContainer.current) {
            const fireworks = new Fireworks(fireworksContainer.current, { 
                autoresize: true,
                opacity: 0.5,
                acceleration: 1.02,
                friction: 0.97,
                gravity: 0.8,
                particles: 750,
                explosion: 7,
                boundaries: {
                    x: 50,
                    y: 50,
                    width: fireworksContainer.current.clientWidth,
                    height: fireworksContainer.current.clientHeight
                },
            });
            fireworks.start();
            setTimeout(() => {
                fireworksContainer.current?.classList.add('fade-out');
            }, 4500); // Commencez à estomper après 4.5 secondes
            setTimeout(() => {
                fireworks.stop();
                fireworksContainer.current?.classList.remove('fade-out');
            }, 6000); // Arrêtez les feux d'artifice après 6 secondes
        }
    };

    return (
        <div className="goldenbook">
            <Header />
            <div id="container-global" className="container">
                <div id="div-title" className="box hero-body has-text-centered">
                    <h1 className="title is-2 has-text-white">Livre d'or</h1>
                    <p className="subtitle has-text-centered has-text-white">Écris-nous un petit mot pour notre plus grand plaisir</p>
                </div>
                <div id="paragraph" className="box">
                    <p> ✍️ Ecrivez ce que vous voulez nous partager, avant, pendant ou après le mariage <span className="span-letter">💌</span></p>
                </div>
                <div className="container-field">
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
                    <p id="message" className="title is-4">Messages</p>
                    <div id="container-card" className="box container ">
                        {messages.map((message, index) => (
                            <div key={index} className="column is-full-mobile is-one-third-tablet is-one-quarter-desktop">
                                <div className="card">
                                    <div id="one-card" className="card-content">
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
            <div ref={fireworksContainer} className="fireworks-container" />
        </div>
    );
}
