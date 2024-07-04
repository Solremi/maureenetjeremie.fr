import React from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./Quizz.scss";

export default function Quizz() {
    return (
        <div className="quizz">
            <Header />
            <div className="box hero-body has-background-danger">
                <h1 title="Quizz" className="title is-1 has-text-white has-text-centered" id="title-gallery">
                    Quizz
                </h1>
                <br />
                <p className="subtitle has-text-centered has-text-white">
                    Répondez à ce quizz pour tester vos connaissances sur les mariés.
                </p>
            </div>
            <Footer />
        </div>
    );
}