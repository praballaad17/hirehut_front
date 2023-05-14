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
import PostJob from "../EmployerrComponents/postJob/PostJob";
import JobPage from "../EmployerrComponents/postJob/JobPage";

export default function EmployerDash() {
  return (
    <div>
      <NavBar />
      <div className="pt-16"></div>
      <div className="flex ">
        <div className="">
          <SideBar />
        </div>
        <div className="grow">
          <Suspense fallback={<MainLoader />}>
            <Routes>
              {/* <Route path={`${ROUTES.MESSAGES}`} element={<Message />} /> */}
              <Route path={`${ROUTES.PROFILE}/*`} element={<Profile />} />
              <Route path={`${ROUTES.ADDJOB}`} element={<PostJob />} />
              <Route path={`${ROUTES.JOBPAGE}`} element={<JobPage />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </div>
  );
}
