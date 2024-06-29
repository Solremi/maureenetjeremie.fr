import React, { useState } from 'react';
import Footer from '../Footer/Footer';
import './Signup.scss';

export default function Signup() {
    // State variables if needed for form data
    const [formData, setFormData] = useState({
        lastname: '',
        firstname: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    // Function to handle form input changes
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        // Add your form submission logic here (e.g., validation, API call)
        console.log('Form submitted:', formData);
    };

    return (
        <>
            <div className="container" id="form-login">
                <div className="columns is-centered">
                    <div className="column is-half">
                        <h2 className="title is-3 has-text-centered">Inscription ou <a href="/connexion">Connexion</a>
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
                                        placeholder="Votre mot de passe"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        required
                                    />
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
                        <div className="container">
                            <p className="error-message has-text-danger">{/* Error message display */}</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer /> 
        </>
    );
}
