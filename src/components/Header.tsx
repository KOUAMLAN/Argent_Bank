import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { logout } from '../store/authSlice';
import ArgentBankLogo from './ArgentBankLogo';

const Header: React.FC = () => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className="flex justify-between items-center px-4 sm:px-5 py-2 bg-white border-b border-gray-200 gap-2">
      <Link to="/" className="flex items-center min-w-0">
        <div className="w-24 sm:w-32 md:w-auto shrink-0">
             <ArgentBankLogo />
        </div>
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {isAuthenticated && user ? (
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <Link to="/profile" className="flex items-center gap-1 sm:gap-2 text-[#2c3e50] hover:underline font-bold min-w-0">
              <span className="text-sm sm:text-base md:text-lg text-[#00bc77] truncate max-w-[80px] sm:max-w-none">{user.userName}</span>
              <i className="fa-solid fa-circle-user text-xl md:text-2xl text-[#00bc77]"></i>
            </Link>
            
            <Link to="#" className="text-[#2c3e50]">
               <i className="fa-solid fa-gear text-xl md:text-2xl text-[#00bc77]"></i>
            </Link>

            <a 
              href="/" 
              onClick={handleLogout} 
              className="text-[#2c3e50] cursor-pointer ml-1"
              title="Sign Out"
            >
              <i className="fa-solid fa-power-off text-xl md:text-2xl text-[#00bc77]"></i>
            </a>
          </div>
        ) : (
          <Link to="/login" className="flex items-center font-bold text-[#2c3e50] hover:underline gap-2 no-underline">
            <i className="fa fa-user-circle text-lg"></i>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;