import React, { useState } from "react";

import { Link } from "react-router-dom";
import {
  changePassword,
  resetPassOtp,
} from "../../services/authenticationServices";
import { useUser } from "../../Context/userContext";

export default function ForgotPass({ user: User }) {
  const [email, setEmail] = useState("");
  const [showOtp, setOtp] = useState(false);
  const [reset, setReset] = useState({
    password: "",
    otp: "",
  });
  const [check, setCheck] = useState(false);
  const [otpId, setOtpId] = useState();

  const { addToast, setLoading } = useUser();

  const sendOtp = async () => {
    setLoading(true);
    try {
      const res = await resetPassOtp(email);
      setLoading(false);
      addToast(res?.message);
      setOtpId(res.otpId);
      setOtp(true);
    } catch (error) {
      setLoading(false);
      addToast(error?.message, true);
    }
  };

  const handleForgotPassword = async () => {
    setLoading(true);

    try {
      await changePassword({ otpId, ...reset });
      setLoading(false);
      addToast("Password is reset");
    } catch (error) {
      addToast("Cannot Update password", true);
      setLoading(false);
    }
  };

  const isInvalid = email === "";
  const isInvalid2 = email === "";
  return (
    <>
      <div className="form-container sign-in-container">
        <form className="auth-form">
          <h1 className="auth-heading">Forgot Password</h1>

          <span className="auth-span">Enter your Email, to send otp.</span>
          <input
            className="auth-input"
            type="email"
            name="email"
            placeholder="Email"
            onChange={({ target }) => setEmail(target.value)}
            value={email}
          />

          <div
            disabled={isInvalid}
            className={`auth-btn
          ${isInvalid && "u-opacity-50"}`}
            onClick={sendOtp}
          >
            Send
          </div>

          {showOtp ? (
            <>
              <span className="auth-span mt-3">Enter your otp.</span>
              <input
                className="auth-input"
                type="text"
                placeholder="OTP"
                onChange={({ target }) =>
                  setReset({ ...reset, otp: target.value })
                }
                value={reset.otp}
              />

              <input
                className="auth-input"
                type="password"
                placeholder="Password"
                onChange={({ target }) =>
                  setReset({ ...reset, password: target.value })
                }
                value={reset.password}
              />

              <input
                className="auth-input"
                type="password"
                placeholder="Enter Again"
                onChange={({ target }) =>
                  reset.password === target.value
                    ? setCheck(true)
                    : setCheck(false)
                }
              />
              {!check ? (
                <div className="fs-4 text-danger">Password Does not Match!</div>
              ) : (
                <></>
              )}

              <div
                disabled={isInvalid}
                className={`auth-btn
          ${isInvalid && "u-opacity-50"}`}
                onClick={handleForgotPassword}
              >
                Update
              </div>
            </>
          ) : (
            <></>
          )}
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-right">
            <h1 className="auth-heading">Hello, Friend!</h1>
            <p className="auth-p">
              Enter your details and start journey with us
            </p>

            <Link to="/authentication/login">
              <button className="ghost" id="signUp">
                Log In
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
