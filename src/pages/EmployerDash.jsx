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
import { DataProvider } from "../Context/EmployeerDataContext";
import SingleJob from "../EmployerrComponents/postJob/SingleJob";
import Candidate from "../EmployerrComponents/Candidate/Candidate";
import SingleJobCand from "../EmployerrComponents/Candidate/SingleJobCand";

export default function EmployerDash({ user }) {
  if (!user) return <Navigate to={`/authentication${ROUTES.LOGIN}`} />;

  return (
    <DataProvider user={user}>
      <div>
        <NavBar />
        <div className="pt-16"></div>
        <div className="flex ">
          <div className="">
            <SideBar />
          </div>
          <div className="grow justify-items-center">
            <Suspense fallback={<MainLoader />}>
              <Routes>
                {/* <Route path={`${ROUTES.MESSAGES}`} element={<Message />} /> */}
                <Route path={`${ROUTES.PROFILE}/*`} element={<Profile />} />
                <Route path={`${ROUTES.ADDJOB}`} element={<PostJob />} />
                <Route path={`${ROUTES.EDITJOB}`} element={<PostJob />} />
                <Route path={`${ROUTES.JOBPAGE}`} element={<JobPage />} />
                <Route path={`${ROUTES.SINGLEJOB}`} element={<SingleJob />} />
                <Route path={`${ROUTES.CANDIDATES}`} element={<Candidate />} />
                <Route
                  path={`${ROUTES.SINGLECANDIDATES}`}
                  element={<SingleJobCand />}
                />
              </Routes>
            </Suspense>
          </div>
        </div>
      </div>
    </DataProvider>
  );
}
