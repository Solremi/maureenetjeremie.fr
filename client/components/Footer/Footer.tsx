import React from 'react';
import './Footer.scss';

export default function Footer() {
    return (
        <footer>
            <div className="footer-container has-text-centered">
                <div className="footer-section">
                    <p>© 2024 Maureen & Jérémie | Téléphone Maureen: 06.47.57.98.47 </p>
                    <p>
                        <strong>WebSite</strong> by <a href="https://louxelweb.fr" target="_blank" rel="noopener noreferrer">LouxelWeb</a>. The source code is privacy.
                    </p>
                </div>
                <div className="footer-section">
                  
                    <p>
                    <a href="/mentions-legales">Mentions légales</a> | <a href="/conditions-cookies">Politique de Cookies</a>

                    </p>
                </div>
            </div>
        </footer>
    );
}
