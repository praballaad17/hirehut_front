import { lazy, Suspense } from "react";
import NavBar from "../components/NavBar";
import Message from "../commonComponents/messages/Message";
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
import FindJob from "../components/job/FindJob";
import { JobseekerDataProvider } from "../Context/JobseekerDataContext";
import SavedJobs from "../components/job/SavedJobs";
import AppliedJob from "../components/job/AppliedJob";

export default function Dashboard({ user }) {
  if (!user) return <Navigate to={`/authentication${ROUTES.LOGIN}`} />;

  const dashPropery = {
    height: "calc(100vh - 50px)",
  };

  return (
    <JobseekerDataProvider user={user}>
      <div className="w-screen h-screen ">
        <NavBar />
        <div className="pt-20 dash-box">
          <Suspense fallback={<MainLoader />}>
            <Routes>
              <Route path={`${ROUTES.MESSAGES}`} element={<Message />} />
              <Route path={`${ROUTES.PROFILE}/*`} element={<Profile />} />
              <Route path={`${ROUTES.FINDJOB}/*`} element={<FindJob />} />
              <Route path={`${ROUTES.HOME}`} element={<Home />} />
              <Route path={`${ROUTES.SAVEDJOB}`} element={<SavedJobs />} />
              <Route path={`${ROUTES.APPLIEDJOB}`} element={<AppliedJob />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </JobseekerDataProvider>
  );
}
