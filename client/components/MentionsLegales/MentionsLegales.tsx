import React from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import './MentionsLegales.scss';

export default function MentionsLegales() {
    return (
        <div className="mentions-legales">
            <Header />
            <div id="container-global-mentions" className='container'>
                <h1>Mentions Légales</h1>
            <h2>Éditeur du site</h2>
            <p>
                Nom de l'entreprise : Jérémie SARL<br />
                Adresse : 2 rue de l'étoile polaire, France<br />
                Téléphone : +33 4 24 57 98 96 74 81 36<br />
                Email : contact@exemple.com<br />
                Numéro d'inscription au RCS : 123 456 789 RCS Paris<br />
                Numéro de TVA intracommunautaire : FR1234567890145457878<br />
                Directeur de la publication : jérémie Rocquet
            </p>
            
            <h2>Hébergeur du site</h2>
            <p>
                Nom de l'hébergeur : O2switch<br />
                Adresse : CHE DES PARDIAUX 63000 CLERMONT FERRAND. France<br />
                Téléphone : +33 9 72 10 10 07 84 sais plus
            </p>
            
            <h2>Conditions d'utilisation</h2>
            <p>
                Le contenu de ce site est protégé par les droits d'auteur. Toute reproduction, même partielle, est interdite sans autorisation préalable.<br />
                L'éditeur du site décline toute responsabilité en cas d'erreurs ou d'omissions dans le contenu du site. L'utilisation des liens externes est aux risques et périls des utilisateurs.
            </p>
            
            <h2>Politique de confidentialité</h2>
            <p>
                Les données personnelles collectées sur ce site sont traitées conformément à la réglementation en vigueur. Pour plus d'informations, consultez notre <a href="/politique-de-confidentialite">politique de confidentialité</a>.
            </p>
            
            <h2>Cookies</h2>
            <p>
                Ce site utilise des cookies pour améliorer l'expérience utilisateur. Pour plus d'informations, consultez notre <a href="/politique-de-cookies">politique de cookies</a>.
            </p>
            </div>
            
            <Footer />
        </div>
    );
}


