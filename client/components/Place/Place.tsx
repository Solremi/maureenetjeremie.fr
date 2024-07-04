import React from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./Place.scss";

export default function Place() {
    return (
        <div className="place">
            <Header />
            <div className="box hero-body has-background-danger">
                <h1 title="Lieu de la cérémonie" className="title is-1 has-text-white has-text-centered" id="title-gallery">
                    Lieu de la cérémonie
                </h1>
                <br />
                <p className="subtitle has-text-centered has-text-white">
                    La cérémonie aura lieu à la mairie de la ville de Pecquencourt.
                </p>
            </div>
            <Footer />
        </div>
    );
}