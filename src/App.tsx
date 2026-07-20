import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store/store';
import { fetchUserProfile } from './store/authSlice';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
// Import par défaut crucial pour éviter "does not provide an export named default"
import Transactions from './pages/Transactions'; 
import Header from './components/Header';
import Footer from './components/Footer';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { token, isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (token && !user) {
      dispatch(fetchUserProfile(token));
    }
  }, [token, user, dispatch]);

  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen font-sans text-[#2c3e50]">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/login" 
            element={isAuthenticated ? <Navigate to="/profile" replace /> : <Login />} 
          />
          <Route 
            path="/profile" 
            element={isAuthenticated ? <Profile /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/transactions/:accountId" 
            element={isAuthenticated ? <Transactions /> : <Navigate to="/login" replace />} 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;