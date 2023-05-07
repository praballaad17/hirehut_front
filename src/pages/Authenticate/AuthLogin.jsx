import React, { useEffect, useState } from "react";
import * as ROUTES from "../../constants/routes";
import { login } from "../../services/authenticationServices";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../Context/userContext";

const AuthLogin = ({ user: User }) => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { addToast } = useUser();

  const [error, setError] = useState("");
  const isInvalid = password === "" || emailAddress === "";

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(emailAddress, password);
      setLoading(false);
      navigate(ROUTES.HOME);
    } catch (error) {
      // setEmailAddress("");
      setPassword("");
      addToast(error.message, true);
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {};

  useEffect(() => {
    document.title = "Login - Touch";
    setPassword("");
    setEmailAddress("");
  }, []);

  if (User) return <Navigate to={ROUTES.DASHBOARD} />;

  return (
    <>
      <div class="flex justify-center items-center h-screen ">
        <div class="bg-white p-10 rounded-lg shadow-lg">
          <h2 class="text-2xl font-bold mb-10">Login</h2>
          <form>
            <div class="mb-5">
              <label for="email" class="block text-gray-700 font-bold mb-2">
                Email/Username
              </label>
              <input
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                type="text"
                id="email"
                name="email"
                placeholder="Enter your email or username"
                class="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div class="mb-5">
              <label for="password" class="block text-gray-700 font-bold mb-2">
                Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                class="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div class="flex justify-between items-center mb-5">
              <a href="#" class="text-blue-500 hover:text-blue-600">
                Forgot Password?
              </a>
              <Link
                to="/authentication/signup"
                class="text-blue-500 hover:text-blue-600 ms-24"
              >
                Not registered? Sign In
              </Link>
            </div>
            <button
              onClick={handleLogin}
              class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300 ease-in-out focus:outline-none focus:ring focus:ring-blue-300"
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
