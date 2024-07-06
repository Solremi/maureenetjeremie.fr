import React from 'react';
import './404.scss';

export default function NotFound() {
    return (
        <div className="not-found">
            <div id="box-error" className="container box-error">
            <img src="/public/images/404.webp" alt="erreur 404" />
            </div>
        </div>
    );
}