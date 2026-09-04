import { useEffect } from "react";
import {
  HashRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Transactions from "./pages/Transactions";

import { fetchUserProfile } from "./store/authSlice";
import type {
  RootState,
  AppDispatch,
} from "./store/store";

function App() {
  const dispatch = useDispatch<AppDispatch>();

  const {
    token,
    isAuthenticated,
  } = useSelector(
    (state: RootState) => state.auth
  );

  /**
   * Récupération du profil uniquement
   * lorsqu'un token existe.
   */
  useEffect(() => {
    if (token) {
      dispatch(fetchUserProfile(token));
    }
  }, [dispatch, token]);

  return (
    <HashRouter>
      <div className="flex min-h-screen flex-col bg-[#12002b] font-sans text-[#2c3e50]">
        <Header />

        <main className="flex-1">
          <Routes>
            {/* HOME */}
            <Route
              path="/"
              element={<Home />}
            />

            {/* LOGIN */}
            <Route
              path="/login"
              element={
                isAuthenticated && token ? (
                  <Navigate
                    to="/profile"
                    replace
                  />
                ) : (
                  <Login />
                )
              }
            />

            {/* PROFILE */}
            <Route
              path="/profile"
              element={
                isAuthenticated && token ? (
                  <Profile />
                ) : (
                  <Navigate
                    to="/login"
                    replace
                  />
                )
              }
            />

            {/* TRANSACTIONS */}
            <Route
              path="/transactions/:accountId"
              element={
                isAuthenticated && token ? (
                  <Transactions />
                ) : (
                  <Navigate
                    to="/login"
                    replace
                  />
                )
              }
            />

            {/* UNKNOWN ROUTE */}
            <Route
              path="*"
              element={
                <Navigate
                  to="/"
                  replace
                />
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;