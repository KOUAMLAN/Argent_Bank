import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { logout } from '../store/authSlice';
import ArgentBankLogo from './ArgentBankLogo';

const Navbar: React.FC = () => {
  const { token, user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className="flex justify-between items-center px-5 py-2 bg-white border-b border-gray-200">
      <Link to="/" className="flex items-center gap-2">
        {/* GREEN CODE: Réutilisation du composant Logo au lieu de réécrire l'image */}
        <ArgentBankLogo />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {token && user ? (
          <div className="flex items-center gap-4">
            <Link to="/profile" className="font-bold text-[#2c3e50] hover:underline flex items-center gap-1">
              <i className="fa fa-user-circle"></i>
              {user.userName}
            </Link>
            <a href="/" onClick={handleLogout} className="font-bold text-[#2c3e50] hover:underline flex items-center gap-1 cursor-pointer">
              <i className="fa fa-sign-out"></i>
              Sign Out
            </a>
          </div>
        ) : (
          <Link to="/login" className="font-bold text-[#2c3e50] hover:underline flex items-center gap-1">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;