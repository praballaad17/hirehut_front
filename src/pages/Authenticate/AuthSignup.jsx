import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  emailCheck,
  registerUser,
} from "../../services/authenticationServices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { DASHBOARD } from "../../constants/routes";
import { useUser } from "../../Context/userContext";
import * as ROUTES from "../../constants/routes";

const AuthSignup = ({ user: User }) => {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isCheck, setIsCheck] = useState(0);
  const navigate = useNavigate();

  const { addToast, setLoading } = useUser();
  const checkEmail = async () => {
    const res = await emailCheck(email);
    console.log(res.status, res);
    if (res.status === 400) {
      console.log(res);
      addToast(`${email} is already added`, true);
    } else {
      setIsCheck(1);
    }
  };
  // useEffect(() => {
  //   document.title = "Sign Up - Touch";
  //   setFullName("");
  //   setEmail("");
  //   setPassword("");
  //   setError("");
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isCheck === 0) {
      // if(email.length === 0 ) {

      // }
      try {
        checkEmail();
      } catch (error) {}
    } else if (isCheck === 1) {
      const res = await registerUser(username, fullName, email, password);
      addToast(`${username} is added`);
      window.location.href = ROUTES.DASHBOARD;
    }
  };

  if (User) return <Navigate to={DASHBOARD} />;

  return (
    <>
      <div class="flex justify-center items-center h-screen">
        <div class="bg-white p-10 rounded-lg shadow-lg w-1/3">
          <h2 class="text-2xl font-bold mb-10">Sign Up</h2>
          {isCheck === 0 ? (
            <div>Create an account or sign in.</div>
          ) : (
            <div>Add Details</div>
          )}
          <form>
            {isCheck === 0 ? (
              <div class="mb-5">
                <label for="email" class="block text-gray-700 font-bold mb-2">
                  Email
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  class="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
            ) : (
              <></>
            )}
            {isCheck === 1 ? (
              <>
                <div class="mb-5">
                  <label
                    for="username"
                    class="block text-gray-700 font-bold mb-2"
                  >
                    Username
                  </label>
                  <input
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Enter your username"
                    class="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div class="mb-5">
                  <label for="name" class="block text-gray-700 font-bold mb-2">
                    Name
                  </label>
                  <input
                    onChange={(e) => setFullName(e.target.value)}
                    type="text"
                    id="name"
                    name="Name"
                    placeholder="Enter your Name"
                    class="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div class="mb-5">
                  <label class="block text-gray-700 font-bold mb-2">
                    Password
                  </label>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    class="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
              </>
            ) : (
              <></>
            )}
            <div class="flex justify-between items-center mb-5">
              <Link
                to="/authentication/login"
                class="text-blue-500 hover:text-blue-600"
              >
                Log In
              </Link>
            </div>
            <button
              type="submit"
              class="bg-blue-500 w-full text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300 ease-in-out focus:outline-none focus:ring focus:ring-blue-300"
              onClick={handleSubmit}
            >
              Sign Up <FontAwesomeIcon className="ms-3" icon={faArrowRight} />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AuthSignup;
