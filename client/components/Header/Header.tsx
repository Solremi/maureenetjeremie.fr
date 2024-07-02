import React from "react";
import './Header.scss';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../axios/axios';

export default function Header() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axiosInstance.post('/api/logout');
            navigate('/login', { replace: true });
        } catch (error) {
            console.error('Erreur lors de la déconnexion', error);
        }
    };

    return (
        <header>
            <nav id="nav" className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <Link className="navbar-item" to="/home">
                        <h2 id="title-header" className="title is-3">Maureen & Jérémie</h2>
                    </Link>

                    <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>
                <div id="navbar" className="navbar-menu">
                    <div className="navbar-end">
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
                        <button id="items" className="navbar-item" onClick={handleLogout}>
                            Déconnexion
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    );
}
