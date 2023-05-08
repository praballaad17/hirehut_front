import React, { useEffect, useState } from "react";
import * as ROUTES from "../../constants/routes";
import { login } from "../../services/authenticationServices";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useUser } from "../../Context/userContext";

const AuthLogin = ({ user: User }) => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { addToast, setLoading } = useUser();

  const handleLogin = async (e) => {
    console.log("login");
    e.preventDefault();
    setLoading(true);
    try {
      await login(emailAddress, password);
      setLoading(false);
      console.log(ROUTES.HOME);
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
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AuthLogin;
