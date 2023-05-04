import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthSignup from "./AuthSignup";
import AuthLogin from "./AuthLogin";
import { SIGN_UP, LOGIN, DASHBOARD } from "../../constants/routes";
import ForgotPass from "./ForgotPass";
const Authentication = ({ user: User }) => {
  if (User) return <Navigate to={DASHBOARD} />;

  return (
    <div className="authentication-main">
      <div className="auth-container" id="auth-container">
        <Routes>
          <Route path={SIGN_UP} element={<AuthSignup user={User} />} />
          <Route path={LOGIN} element={<AuthLogin user={User} />} />
          <Route path="/forgot-password" element={<ForgotPass user={User} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Authentication;
