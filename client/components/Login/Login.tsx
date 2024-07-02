import React, { useState } from 'react';
import './Login.scss';
import axiosInstance from '../../axios/axios';
import Footer from '../Footer/Footer';
import { useNavigate } from 'react-router-dom';


export default function Login() {
    const [firstname, setFirstname] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const response = await axiosInstance.post('/api/login', {
                firstname: firstname,
                password: password
            });
            console.log(response.data);
            navigate('/home');

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <form method="post" onSubmit={handleSubmit}>
                <div className="columns is-centered">
                    <div className="column is-one-third form-connexion"> 
                        <h1 className="title is-3 has-text-centered">Connecte toi !</h1>
                        <h2 className="subtitle is-5 has-text-centered">
                            Si tu n'es pas encore inscrit, c'est par <a href="/"><strong id='ici'>ici</strong></a>    
                        </h2> 
                        <div className="field">
                            <label className="label">Prénom</label>
                            <div className="control">
                                <input 
                                    className="input" 
                                    type="text" 
                                    name="firstname" 
                                    placeholder="Ton prénom" 
                                    value={firstname}
                                    onChange={(e) => setFirstname(e.target.value)}
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

                        <div className="control form-button">
                            <button id="button-login" className="button is-primary is-danger">Connexion</button>
                        </div>
                    </div>
                </div>
            </form>
            <Footer />
        </>
    );
}