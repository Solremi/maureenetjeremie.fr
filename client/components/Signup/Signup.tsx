import React, { useState } from 'react';
import axiosInstance from '../../axios/axios';
import Footer from '../Footer/Footer';
import './Signup.scss';
import { set } from 'zod';

export default function Signup() {
    const [formData, setFormData] = useState({
        lastname: '',
        firstname: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [message, setMessage] = useState('');


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (formData.password !== formData.confirmPassword) {
                throw new Error('Les mots de passe ne correspondent pas');
            }
            if (formData.password.length < 3) {
                throw new Error('Le mot de passe doit contenir au moins 3 caractères');
            }
            if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(formData.password)) {
                throw new Error('Le mot de passe doit contenir au moins 1 majuscule, 1 minuscule et 1 chiffre');
            }

            setErrorMessage('');
            setMessage('');
            const response = await axiosInstance.post('/api/signup', formData);

            setMessage('SUPER ! Inscription effectuée avec succès. Maintenant tu dois attendre que je valide ton inscription. Merci de ta patience.');


        } catch (error) {
            if (error.response) {
                if (error.response.status === 409) {
                    setErrorMessage('ah ben non, cet utilisateur est déjà inscrit');
                } else {
                    setErrorMessage(error.response.data.message || 'Erreur du serveur');
                }
            } else if (error.request) {
                setErrorMessage('Pas de réponse du serveur');
            } else {
                setErrorMessage(error.message);
            }
        }
    };

    return (
        <>
            <div className="container" id="form-login">
                <div className="columns is-centered">
                    <div className="column is-half">
                        <h2 id='h2-signup' className="title is-3 has-text-centered">Inscription ou <a href="/connexion">Connexion</a></h2> 
                        <form id="signupForm" onSubmit={handleSubmit}>
                            <div className="field">
                                <label className="label" htmlFor="lastname">Nom</label>
                                <div className="control">
                                    <input
                                        className="input"
                                        type="text"
                                        id="lastname"
                                        name="lastname"
                                        placeholder="Votre nom"
                                        value={formData.lastname}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="field">
                                <label className="label" htmlFor="name">Prénom</label>
                                <div className="control">
                                    <input
                                        className="input"
                                        type="text"
                                        id="name"
                                        name="firstname"
                                        placeholder="Votre prénom"
                                        value={formData.firstname}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="field">
                                <label className="label" htmlFor="email">Email</label>
                                <div className="control">
                                    <input
                                        className="input"
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="exemple: utilisateur@example.com"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="field">
                                <label className="label" htmlFor="password">Mot de passe</label>
                                <div className="control">
                                    <input
                                        className="input"
                                        type="password"
                                        id="password"
                                        name="password"
                                        placeholder="exemple: Motdepasse1"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <em> minimum: 1 majuscule + 1 minuscule + 1 chiffre</em>
                                </div>
                            </div>

                            <div className="field">
                                <label className="label" htmlFor="confirmPassword">Confirmation</label>
                                <div className="control">
                                    <input
                                        className="input"
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        placeholder="Confirmez votre mot de passe"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="control form-button">
                                <button type="submit" className="button">S'inscrire</button>
                            </div>
                        </form>
                        {message && (
                            <div className="container">
                                <p className="success-message">{message}</p>
                            </div>
                        )}
                        {errorMessage && (
                            <div className="container">
                                <p className="error-message">{errorMessage}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer /> 
        </>
    );
}
