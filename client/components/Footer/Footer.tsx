import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

export default function Footer() {
    return (
        <footer>
            <div className="footer-container has-text-centered">
                <div className="footer-section">
                    <p>© 2024 Maureen & Jérémie | Téléphone Maureen: 06.47.57.98.47 </p>
                    <p>
                        <strong>WebSite</strong> by <strong>louxelweb.fr </strong> The source code is privacy.
                    </p>
                </div>
                <div className="footer-section">
                    <p>
                        <Link to="/mentions-legales">Mentions légales</Link> | <Link to="/conditions-cookies">Politique de Cookies</Link>
                    </p>
                </div>
            </div>
        </footer>
    );
}
