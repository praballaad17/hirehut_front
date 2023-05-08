import { lazy, Suspense } from "react";
import NavBar from "../components/NavBar";
import Message from "../components/messages/Message";
import * as ROUTES from "../constants/routes";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import MainLoader from "../components/loader/mainLoader";
import Profile from "../components/profile/Profile";
import Home from "../components/Home";

export default function Dashboard({ user }) {
  if (!user) return <Navigate to={`/authentication${ROUTES.LOGIN}`} />;

  return (
    <div className="w-screen h-screen ">
      <NavBar />
      <div className="pt-24"></div>
      <Suspense fallback={<MainLoader />}>
        <Routes>
          <Route path={`${ROUTES.MESSAGES}`} element={<Message />} />
          <Route path={`${ROUTES.PROFILE}/*`} element={<Profile />} />
          <Route path={`${ROUTES.HOME}`} element={<Home />} />
        </Routes>
      </Suspense>
    </div>
  );
}
