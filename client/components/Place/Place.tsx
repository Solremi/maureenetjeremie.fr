import React from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./Place.scss";

export default function Place() {
    return (
        <div className="place">
            <Header />
            <div id="container-page" className="container">
                <div id="box" className="box hero-body">
                    <h1 title="Lieu de la cérémonie" className="title is-1 has-text-white has-text-centered" id="title-gallery">
                        Informations utiles
                    </h1>
                </div>
            </div>
            <Footer />
        </div>
    );
}