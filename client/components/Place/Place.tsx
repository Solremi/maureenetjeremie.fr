import React from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./Place.scss";

export default function Place() {
    return (
        <div className="place">
            <Header />
            <div id="contain-page" className="container">
                <div id="box" className="box hero-body is-mobile ">
                    <h1 title="Lieu de la cérémonie" className="title is-1  has-text-centered" id="title-gallery">
                        Informations utiles
                    </h1>
                </div>
                <div id="date" className="is-desktop"> </div>
                    <div id="box-date" className="column box">
                        <h2 className="title">Date et heure</h2>
                        <strong><p>Le 02 novembre 2024 - 15h</p></strong>
                    </div>
                    <div id="box-lieu" className="column is-full box">
                        <h2 className="title">Lieu : 51 Rue d'Anchin, 59146 Pecquencourt</h2>

                        <img id="photo-1" src="/public/images/salleGoogle.png" alt="plan de la salle des fêtes" />

                        <img id="photo-2" src="/public/images/entreeSalle.png" alt="photo de la salle des fêtes" />
                        
                    <div id="box-fin" className="box">
                         <strong><p>Ensuite, il y a deux entrées on commence à droite !</p></strong>
                        <p>Possibilité de se garer sur le parking.</p>
                        <p>Celui-ci sera fermé pour davantage de sécurité au cours de la soirée</p>
                    </div>
                       

                    </div>
                   
               
            </div>
            <Footer />
        </div>
    );
}
