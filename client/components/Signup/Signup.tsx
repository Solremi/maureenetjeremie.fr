import React, { useState, ChangeEvent, FormEvent } from 'react';
import axiosInstance from '../../axios/axios';
import './Signup.scss';

export default function Signup() {
    // États du formulaire
    const [formData, setFormData] = useState({
        lastname: '',
        firstname: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    // États des messages
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Gestion des changements des champs du formulaire
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Validation du formulaire
    const validateForm = () => {
        const { password, confirmPassword, email, firstname, lastname } = formData;

        if (!email || !firstname || !lastname) {
            return 'Tous les champs doivent être remplis';
        }

        if (password !== confirmPassword) {
            return 'Les mots de passe ne correspondent pas';
        }

        if (password.length < 9) {
            return 'Le mot de passe doit contenir au moins 9 caractères';
        }

        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{9,}$/.test(password)) {
            return 'Le mot de passe doit contenir au moins 1 majuscule, 1 minuscule, 1 chiffre et avoir une longueur minimale de 9 caractères.';
        }

        return '';
    };

    // Soumission du formulaire
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const validationError = validateForm();

        if (validationError) {
            setErrorMessage(validationError);
            return;
        }

        try {
            setErrorMessage('');
            setSuccessMessage('');
            setIsLoading(true);
            const response = await axiosInstance.post('/api/signup', formData);
            setSuccessMessage('SUPER ! Inscription effectuée avec succès. Maintenant tu dois attendre que je valide ton inscription. Merci de ta patience.');
        } catch (error: any) {
            if (error.response) {
                if (error.response.status === 409) {
                    setErrorMessage('Vas-y molo sur le bouton moussaillon. Cet utilisateur est déjà inscrit, maintenant tu dois attendre d\'être validé par l\'administrateur. Mais tu peux aussi essayer de te connecter on ne sait jamais ^^');
                } else {
                    setErrorMessage(error.response.data.message || 'Erreur du serveur');
                }
            } else if (error.request) {
                setErrorMessage('Pas de réponse du serveur');
            } else {
                setErrorMessage(error.message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container-signup" id="form-login">
            <div className="columns is-centered">
                <div className="column is-half">
                    <h2 id="h2-signup" className="title is-3 has-text-centered">
                        Inscription ou <a href="/" id="connexion">Connexion</a>
                    </h2>
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
                            <label className="label" htmlFor="firstname">Prénom</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="text"
                                    id="firstname"
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
                                    placeholder="Mot de passe"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                />
                                <p className="password-requirements">
                                    Minimum: 1 majuscule + 1 minuscule + 1 chiffre (longueur minimale de 9 caractères)
                                </p>
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
                            <button type="submit" className="button" disabled={isLoading}>
                                {isLoading ? 'Chargement...' : 'S\'inscrire'}
                            </button>
                        </div>
                    </form>
                    {successMessage && (
                        <div className="container">
                            <p className="success-message">{successMessage}</p>
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
    );
}
