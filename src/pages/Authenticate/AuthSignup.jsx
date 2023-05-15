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
  const [isEmployeer, setIsEmployeer] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isCheck, setIsCheck] = useState(0);
  const navigate = useNavigate();

  const { addToast, setLoading, loading } = useUser();

  const validateEmail = (email) => {
    const emailReg =
      /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    return emailReg.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (isCheck === 0) {
      // if(email.length === 0 ) {

      // }
      console.log(validateEmail(email));
      if (validateEmail(email)) {
        try {
          const res = await emailCheck(email);
          if (res.status === 400) {
            addToast(`${email} is already added`, true);
          } else {
            setIsCheck(1);
          }
        } catch (error) {}
      } else {
        addToast("Enter valid email", true);
        setLoading(false);
        return;
      }
    } else if (isCheck === 1) {
      const res = await registerUser(email, password, isEmployeer);
      addToast(`${email} is added`);
      window.location.href = ROUTES.DASHBOARD;
    }
    setLoading(false);
  };

  if (User) return <Navigate to={DASHBOARD} />;

  return (
    <>
      <div class="flex justify-center items-center h-screen">
        <div class="bg-white p-10 rounded-lg shadow-lg w-1/3">
          <h2 class="text-2xl font-bold mb-10">
            Create Your {isEmployeer ? "Employeer" : ""} Account
          </h2>
          {isCheck === 0 ? (
            <div>Create an account or sign in.</div>
          ) : (
            <div></div>
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

                <h2
                  className="font-bold cursor-pointer my-3 hover:text-blue-600"
                  onClick={() => setIsEmployeer(!isEmployeer)}
                >
                  {!isEmployeer
                    ? "Sign In as Employer"
                    : "Sign In as Jobseeker"}{" "}
                  <FontAwesomeIcon icon={faArrowRight} />
                </h2>
              </>
            ) : (
              <></>
            )}

            <button
              type="submit"
              class="bg-blue-500 w-full text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300 ease-in-out focus:outline-none focus:ring focus:ring-blue-300"
              onClick={handleSubmit}
            >
              {loading ? (
                <svg
                  class="animate-spin h-5 w-5 mr-3 inline-block"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <></>
              )}
              Sign Up <FontAwesomeIcon className="ms-3" icon={faArrowRight} />
            </button>
            <div class="flex justify-between items-center mb-5">
              <Link
                to="/authentication/login"
                class="text-blue-500 hover:text-blue-600"
              >
                Log In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AuthSignup;
