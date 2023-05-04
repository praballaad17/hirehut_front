import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "../../css/authenticationstyle.css";
import { registerUser } from "../../services/authenticationServices";
import { DASHBOARD } from "../../constants/routes";
import { useUser } from "../../Context/userContext";

const AuthSignup = ({ user: User }) => {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const { addToast, setLoading } = useUser();

  const [error, setError] = useState("");
  const isInvalid = password === "" || emailAddress === "";

  const handleSignUp = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await registerUser(username, fullName, emailAddress, password);
      addToast(`${username} is registered`);
      setLoading(false);
    } catch (error) {
      console.log(error.response);
      setLoading(false);
      setFullName("");
      setEmailAddress("");
      setPassword("");
      setError(error.message);
    }
    // } else {
    //   setUsername('');
    //   setError('That username is already taken, please try another.');
    // }
  };
  useEffect(() => {
    document.title = "Sign Up - Touch";
    setFullName("");
    setEmailAddress("");
    setPassword("");
    setError("");
  }, []);

  if (User) return <Navigate to={DASHBOARD} />;
  return (
    <>
      <div className="form-container sign-in-container">
        <form className="auth-form" onSubmit={handleSignUp} method="POST">
          <h1 className="auth-heading">Create Account</h1>
          <div className="social-container">
            <a href="#" className="social">
              <i className="fa fa-facebook"></i>
            </a>
            <a href="#" className="social">
              <i className="fa fa-google"></i>
            </a>
            <a href="#" className="social">
              <i className="fa fa-linkedin"></i>
            </a>
          </div>
          <span className="auth-span">or use your email for registration</span>
          {error && <p className="login__box--error">{error}</p>}
          <input
            className="auth-input"
            type="text"
            name="username"
            placeholder="Userame"
            onChange={({ target }) => setUsername(target.value)}
            value={username}
          />
          <input
            className="auth-input"
            type="text"
            name="fullname"
            placeholder="Full Name"
            onChange={({ target }) => setFullName(target.value)}
            value={fullName}
          />
          <input
            className="auth-input"
            type="email"
            name="email"
            placeholder="Email"
            onChange={({ target }) => setEmailAddress(target.value)}
            value={emailAddress}
          />
          <input
            className="auth-input"
            type="password"
            name="password"
            placeholder="Password"
            onChange={({ target }) => setPassword(target.value)}
            value={password}
          />
          <button
            type="submit"
            className={`auth-btn
            ${isInvalid && "u-opacity-50"}`}
            disabled={isInvalid}
          >
            SignUp
          </button>
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-right">
            <h1 className="auth-heading">Welcome Back!</h1>
            <p className="auth-p">
              To keep connected with us please login with your personal info
            </p>

            <Link to="/authentication/login">
              <button className="ghost" id="signIn">
                Sign In
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthSignup;
