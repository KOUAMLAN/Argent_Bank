import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { logout } from "../store/authSlice";
import ArgentBankLogo from "./ArgentBankLogo";

const Header: React.FC = () => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className="bg-white">
      <nav className="flex items-center justify-between px-4 sm:px-5 py-3">
        <Link to="/" className="shrink-0">
          <ArgentBankLogo />
        </Link>

        <div>
          {isAuthenticated && user ? (
            <div className="flex items-center gap-4">
              <Link
                to="/profile"
                className="flex items-center gap-2 font-bold text-[#2c3e50] hover:underline"
              >
                <i className="fa-solid fa-circle-user text-xl text-[#00bc77]" />
                <span>{user.userName}</span>
              </Link>

              <button
                type="button"
                className="text-[#2c3e50]"
                aria-label="Settings"
              >
                <i className="fa-solid fa-gear text-xl text-[#00bc77]" />
              </button>

              <a
                href="/"
                onClick={handleLogout}
                className="text-[#2c3e50]"
                title="Sign Out"
              >
                <i className="fa-solid fa-power-off text-xl text-[#00bc77]" />
              </a>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 font-bold text-[#2c3e50] hover:underline"
            >
              <i className="fa-solid fa-circle-user text-xl" />
              <span>Sign In</span>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;