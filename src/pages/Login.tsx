import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { clearError, loginUser } from "../store/authSlice";

const DEMO_MODE = import.meta.env.VITE_DEMO_MODE === "true";

const Login: React.FC = () => {
  const [email, setEmail] = useState("tony@stark.com");
  const [password, setPassword] = useState("password123");
  const [rememberMe, setRememberMe] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const { status, error } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(
      loginUser({
        email,
        password,
      })
    );
  };

  return (
    <main className="flex-1 bg-[#12002b] flex justify-center items-center py-8 sm:py-12 px-4 sm:px-6">
      <section className="box-border bg-white w-full max-w-[340px] p-6 sm:p-8 text-center shadow-md">
        <i
          className="fa fa-user-circle text-5xl text-[#2c3e50] mb-4"
          aria-hidden="true"
        />

        <h1 className="text-2xl font-bold text-[#2c3e50] mb-6">
          Sign In
        </h1>

        {DEMO_MODE && (
          <p className="bg-blue-50 border border-blue-200 text-blue-800 px-3 py-2 rounded text-xs mb-4">
            Mode démo en ligne — identifiants : tony@stark.com /
            password123
          </p>
        )}

        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 text-sm font-bold"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col text-left mb-4">
            <label
              htmlFor="email"
              className="font-bold text-[#2c3e50]"
            >
              Username
            </label>

            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 text-lg border border-gray-400 mt-1 w-full box-border"
              required
              autoComplete="username"
            />
          </div>

          <div className="flex flex-col text-left mb-4">
            <label
              htmlFor="password"
              className="font-bold text-[#2c3e50]"
            >
              Password
            </label>

            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 text-lg border border-gray-400 mt-1 w-full box-border"
              required
              autoComplete="current-password"
            />
          </div>

          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="remember-me"
              className="mr-2"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />

            <label
              htmlFor="remember-me"
              className="text-[#2c3e50]"
            >
              Remember me
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-[#00bc77] text-white font-bold py-2 text-lg border-none hover:bg-[#00a568] transition-colors underline disabled:opacity-50 cursor-pointer"
            disabled={status === "loading"}
          >
            {status === "loading"
              ? "Signing In..."
              : "Sign In"}
          </button>
        </form>
      </section>
    </main>
  );
};

export default Login;