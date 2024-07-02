import React from "react";
import './Header.scss';
import { Link } from 'react-router-dom';


export default function Header() {
    return (
        <header>
            <nav id="nav" className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a className="navbar-item" href="/home">
                    <h2 id="title-header" className="title is-3 ">Maureen & Jérémie</h2>
                    </a>

                    <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    </a>
                </div>
                <div id="navbar" className="navbar-menu">
                    <div className="navbar-end">
                        <Link id="items" className="navbar-item" to="/logout">
                            Déconnexion
                        </Link>
                        <Link id="items" className="navbar-item" to="/livre d'or">
                            Livre d'or
                        </Link>
                        <Link id="items" className="navbar-item" to="/photos">
                            Photos
                        </Link>
                        <Link id="items" className="navbar-item" to="/quizz">
                            Quizz
                        </Link>
                        <Link id="items" className="navbar-item" to="/contact">
                            C'est où ?
                        </Link>

                    </div>
                </div>
            </nav>
        </header>
    );
}

