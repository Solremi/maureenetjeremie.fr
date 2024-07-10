import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './ConditionCookie.scss';

export default function ConditionsCookies() {
    return (
        <div className="conditions-cookies">
            <Header />
            <div id='container-global-cookie' className='container'>
                 <h1>Politique de Cookies</h1>

            <p>Cette politique de cookies explique comment NOUS utilise des cookies et technologies similaires sur notre site web.</p>
            
            <h2>Qu'est-ce qu'un cookie?</h2>
            <p>Un cookie est un petit fichier texte que notre site web place sur votre ordinateur ou appareil mobile lorsque vous visitez notre site. Les cookies nous permettent de reconnaître votre appareil et de mémoriser vos préférences et actions passées.</p>
            
            <h2>Types de cookies utilisés</h2>
            <p>Nous utilisons les types de cookies suivants :</p>
            <ul>
                <li><strong  className='has-text-black'>Cookies strictement nécessaires:</strong> Ces cookies sont essentiels pour vous permettre de naviguer sur le site et d'utiliser ses fonctionnalités, telles que l'accès aux zones sécurisées du site.</li>
                <li><strong  className='has-text-black'>Cookies de performance:</strong> Ces cookies collectent des informations sur la façon dont les visiteurs utilisent un site web, par exemple les pages que les visiteurs consultent le plus souvent, et s'ils reçoivent des messages d'erreur des pages web.</li>
                <li><strong  className='has-text-black'>Cookies de fonctionnalité:</strong> Ces cookies permettent au site de se souvenir des choix que vous faites (comme votre nom d'utilisateur, la langue ou la région dans laquelle vous vous trouvez) et fournissent des fonctionnalités améliorées et plus personnelles.</li>
                <li><strong  className='has-text-black'>Cookies de ciblage/publicité:</strong> Ces cookies sont utilisés pour diffuser des publicités plus pertinentes pour vous et vos intérêts. Ils sont également utilisés pour limiter le nombre de fois que vous voyez une publicité ainsi que pour aider à mesurer l'efficacité des campagnes publicitaires.</li>
            </ul>
            
            <h2>Comment gérer les cookies?</h2>
            <p>Vous pouvez contrôler et/ou supprimer les cookies comme vous le souhaitez – pour plus de détails, consultez aboutcookies.org. Vous pouvez supprimer tous les cookies déjà stockés sur votre ordinateur et vous pouvez configurer la plupart des navigateurs pour empêcher l'installation de cookies. Cependant, si vous le faites, vous devrez peut-être ajuster manuellement certaines préférences chaque fois que vous visitez un site et certains services et fonctionnalités peuvent ne pas fonctionner.</p>
            
            <h2>Modifications de cette politique</h2>
            <p>Nous pouvons mettre à jour cette politique de cookies de temps en temps afin de refléter, par exemple, des changements à nos pratiques ou pour d'autres raisons opérationnelles, légales ou réglementaires.</p>
            
            <h2>Contactez-nous</h2>
            <p>Pour plus d'informations sur notre utilisation des cookies ou si vous avez des questions, veuillez nous contacter à : <a href="mailto:contact@exemple.com">contact@exemple.com</a>.</p> 
            </div>
          
            <Footer />
        </div>
    );
}
