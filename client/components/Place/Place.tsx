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
               
                    <div id="box-lieu" className="column is-full box">
                        <h2 className="title">Lieu</h2>
                        <p>51 Rue d'Anchin, 59146 Pecquencourt</p>
                        <img src="/public/images/salleGoogle.png" alt="plan de la salle des fêtes" />
                    </div>
                    <div id="date-lieu" className="is-desktop">
                    <div id="box-date" className="column is-full box">
                        <h2 className="title">Date</h2>
                        <p>Le 02 novembre 2024 - 15h</p>
                        <p>Possibilité de se garer sur le parking.</p>
                        <img src="/public/images/entreeSalle.png" alt="photo de la salle des fêtes" />
                        <p>Ensuite, il y a deux entrées on commence à droite !</p>

                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
