import React, { useState, useContext } from 'react';
import './Login.scss';
import axiosInstance from '../../axios/axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App/App'; // Assurez-vous d'importer le contexte correctement

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { setIsAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError('');

        try {
            const response = await axiosInstance.post('/api/login', { email, password });

            if (response.status === 200) {
                const { firstname } = response.data;
                localStorage.setItem('userName', firstname);
                setIsAuthenticated(true);
                navigate('/home');
            }
        } catch (err: any) {
            if (err.response) {
                switch (err.response.status) {
                    case 400:
                        setError('Tous les champs doivent être remplis');
                        break;
                    case 401:
                        setError('Erreur : email et/ou mot de passe incorrect.');
                        break;
                    case 403:
                        navigate('/pending');
                        break;
                    case 500:
                        setError('Erreur interne au serveur. Veuillez réessayer ou attendre les techniciens.');
                        break;
                    default:
                        setError('Une erreur inconnue est survenue. Veuillez réessayer.');
                }
            } else {
                setError('Erreur de connexion. Veuillez vérifier votre connexion internet.');
            }
        }
    };

    return (
        <div id="container-login" className='container is-centered'>
            <form method="post" onSubmit={handleSubmit}>
                        <div className="columns is-centered">
                            <div className="column is-one-third form-connexion">
                                <h1 className="title is-3 has-text-centered">Connecte toi !</h1>
                                <h2 className="subtitle is-5 has-text-centered">
                                    Si tu n'es pas encore inscrit, c'est par <a href="/signup"><strong id='ici'>ici</strong></a>
                                </h2>
                                <div className="field">
                                    <label className="label">Email</label>
                                    <div className="control">
                                        <input
                                            className="input"
                                            type="text"
                                            name="email"
                                            placeholder="Ton email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="field">
                                    <label className="label">Mot de passe</label>
                                    <div className="control">
                                        <input
                                            className="input"
                                            type="password"
                                            name="password"
                                            placeholder="Mot de passe"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {error && <p className="has-text-danger">{error}</p>}

                                <div id="connexion" className="control form-button">
                                    <button id="button-login" className="button ">Connexion</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
    );
}
