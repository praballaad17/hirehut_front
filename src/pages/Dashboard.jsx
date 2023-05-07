import { lazy, Suspense } from "react";
import NavBar from "../components/NavBar";
import Message from "../components/messages/Message";
import * as ROUTES from "../constants/routes";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainLoader from "../components/loader/mainLoader";
import Profile from "../components/profile/Profile";

export default function Dashboard({ user: loggedInUser }) {
  return (
    <div className="w-screen h-screen ">
      <NavBar />

      <Suspense fallback={<MainLoader />}>
        <Routes>
          <Route path={`${ROUTES.MESSAGES}/*`} element={<Message />} />
          <Route path={`${ROUTES.PROFILE}/*`} element={<Profile />} />
        </Routes>
      </Suspense>
    </div>
  );
}
