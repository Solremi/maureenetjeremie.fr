import React from "react";
import './Header.scss';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../axios/axios';

export default function Header() {
    const navigate = useNavigate();

    const handleBurger = () => {
        const burger = document.querySelector('.navbar-burger');
        const menu = document.querySelector('.navbar-menu');
        if (burger && menu) {
            burger.classList.toggle('is-active');
            menu.classList.toggle('is-active');
        }
    }

    const handleLogout = async () => {
        try {
            await axiosInstance.post('/logout');
            navigate('/login', { replace: true });
        } catch (error) {
        }
    };

    return (
        <header>
            <nav id="nav" className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <Link id="items-title" className="navbar-item" to="/home">
                        Maureen & Jérémie 
                    </Link>

                    <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" onClick={handleBurger}>
                        <span className="white-line" aria-hidden="true"></span>
                        <span className="white-line" aria-hidden="true"></span>
                        <span className="white-line" aria-hidden="true"></span>
                        <span className="white-line" aria-hidden="true"></span>
                    </a>
                </div>
                <div id="navbar" className="navbar-menu">
                    <div id="navbar-items" className="navbar-end">
                        <Link id="items" className="navbar-item" to="/guestbook">
                        📖 Livre d'or
                        </Link>
                        <Link id="items" className="navbar-item" to="/pictures">
                        📸 Photos
                        </Link>
                        <Link id="items" className="navbar-item" to="/thePlaceToBe">
                        🗺️ C'est où et quand ?
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
