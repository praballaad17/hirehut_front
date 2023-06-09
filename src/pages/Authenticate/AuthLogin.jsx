import React, { useEffect, useState } from "react";
import * as ROUTES from "../../constants/routes";
import { login } from "../../services/authenticationServices";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useUser } from "../../Context/userContext";

const AuthLogin = ({ user: User }) => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { addToast, setLoading, loading } = useUser();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(emailAddress, password);
      setLoading(false);
      // navigate(ROUTES.DASHBOARD);
      window.location.href = ROUTES.DASHBOARD;
    } catch (error) {
      // setEmailAddress("");
      setPassword("");
      addToast(error.message, true);
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {};

  if (User) return <Navigate to={ROUTES.DASHBOARD} />;

  return (
    <>
      <div className="flex justify-center items-center h-screen ">
        <div className="bg-white p-10 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-10">Login</h2>
          <form>
            <div className="mb-5">
              <label for="email" className="block text-gray-700 font-bold mb-2">
                Email/Username
              </label>
              <input
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                type="text"
                id="email"
                name="email"
                placeholder="Enter your email or username"
                className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-5">
              <label
                for="password"
                className="block text-gray-700 font-bold mb-2"
              >
                Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <input
                type="checkbox"
                onChange={(e) => console.log(e.target.value)}
              />
              <label>Employer Login</label>
            </div>
            <div className="flex justify-between items-center mb-5">
              <a href="#" className="text-blue-500 hover:text-blue-600">
                Forgot Password?
              </a>
              <Link
                to="/authentication/signup"
                className="text-blue-500 hover:text-blue-600 ms-24"
              >
                Not registered? Sign In
              </Link>
            </div>
            <button
              onClick={handleLogin}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300 ease-in-out focus:outline-none focus:ring focus:ring-blue-300"
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 mr-3 inline-block"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <></>
              )}
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AuthLogin;
