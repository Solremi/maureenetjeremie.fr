import React, { useState, createContext, ReactNode, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from '../Home/Home';
import Signup from '../Signup/Signup';
import Login from '../Login/Login';
import Guestbook from '../Guestbook/Guestbook';
import Picture from '../Picture/Picture';
import Place from '../Place/Place';
import Quizz from '../Quizz/Quizz';
import NotFound from '../404/404';
import Pending from '../Pending/Pending';
import MentionsLegales from '../MentionsLegales/MentionsLegales';
import ConditionCookie from '../ConditionCookie/ConditionCookie.tsx';
import './App.scss';

// Create the Authentication Context
interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

// Create the Protected Route Component
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/guestbook" element={<ProtectedRoute><Guestbook /></ProtectedRoute>} />
            <Route path="/pictures" element={<ProtectedRoute><Picture /></ProtectedRoute>} />
            <Route path="/ThePlaceToBe" element={<ProtectedRoute><Place /></ProtectedRoute>} />
            <Route path="/quizz" element={<ProtectedRoute><Quizz /></ProtectedRoute>} />
            <Route path="/pending" element={<Pending />} />
            <Route path="/mentions-legales" element={<MentionsLegales />} />
            <Route path="/conditions-cookies" element={<ConditionCookie />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
