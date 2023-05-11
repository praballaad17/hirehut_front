import { lazy, Suspense } from "react";
import * as ROUTES from "../constants/routes";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import MainLoader from "../components/loader/mainLoader";
import NavBar from "../EmployerrComponents/NavBar";
import Profile from "../EmployerrComponents/profile/Profile";
import SideBar from "../EmployerrComponents/SideBar";

export default function EmployerDash() {
  return (
    <div>
      <NavBar />
      <SideBar />
      <div className="pt-24"></div>
      <Suspense fallback={<MainLoader />}>
        <Routes>
          {/* <Route path={`${ROUTES.MESSAGES}`} element={<Message />} /> */}
          <Route path={`${ROUTES.PROFILE}/*`} element={<Profile />} />
          {/* <Route path={`${ROUTES.HOME}`} element={<Home />} /> */}
        </Routes>
      </Suspense>
    </div>
  );
}
