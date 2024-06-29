import React, { useState } from 'react';
import axiosInstance from '../../axios/axios';
import Footer from '../Footer/Footer';
import './Signup.scss';

export default function Signup() {
    const [formData, setFormData] = useState({
        lastname: '',
        firstname: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errorMessage, setErrorMessage] = useState('');

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
                throw new Error('Le mot de passe doit contenir au moins 8 caractères');
            }
            if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(formData.password)) {
                throw new Error('Le mot de passe doit contenir au moins 1 majuscule, 1 minuscule et 1 chiffre');
            }

            setErrorMessage('');

            const response = await axiosInstance.post('/api/signup', formData);
            console.log('Form submitted successfully:', response.data);

        } catch (error) {
            // Handle errors
            if (error.response) {
                setErrorMessage(error.response.data.message || 'Erreur du serveur');
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
                                <button type="submit" className="button is-primary">S'inscrire</button>
                            </div>
                        </form>
                        {errorMessage && (
                            <div className="container">
                                <p className="error-message has-text-danger">{errorMessage}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer /> 
        </>
    );
}
