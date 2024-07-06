import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axiosInstance from '../../axios/axios';
import Home from '../Home/Home';
import Signup from '../Signup/Signup';
import Login from '../Login/Login';
import Guestbook from '../Guestbook/Guestbook';
import Picture from '../Picture/Picture';
import Place from '../Place/Place';
import Quizz from '../Quizz/Quizz';
import NotFound from '../404/404';
import Pending from '../Pending/Pending';
import './App.scss';

// Définition de la route privée
const PrivateRoute = ({ element: Element, ...rest }) => {
    const [isAuthenticated, setIsAuthenticated] = React.useState(true);

    React.useEffect(() => {
        axiosInstance.get('/path/to/auth/endpoint')
            .then(res => {
                if (res.status === 403) {
                    setIsAuthenticated(false);
                } else {
                    setIsAuthenticated(true);
                }
            })
            .catch(() => setIsAuthenticated(false));
    }, []);

    if (isAuthenticated) {
        return <Element {...rest} />;
    } else {
        return <Navigate to="/404" />;
    }
};

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/guestbook" element={<PrivateRoute element={Guestbook} />} />
                    <Route path="/pictures" element={<PrivateRoute element={Picture} />} />
                    <Route path="/ThePlaceToBe" element={<PrivateRoute element={Place} />} />
                    <Route path="/quizz" element={<PrivateRoute element={Quizz} />} />
                    <Route path="*" element={<NotFound />} />
                    <Route path="/pending" element={<Pending />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
