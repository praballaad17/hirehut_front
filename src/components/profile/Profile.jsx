import React, { Suspense } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { PROFILENAV } from "../../constants/variables";
import ProfileBox from "./ProfileBox";
import Resume from "./Resume";
import MainLoader from "../loader/mainLoader";

export default function Profile() {
  let location = useLocation();
  const type = location.pathname.split("/")[2];

  return (
    <div className="flex flex-col h-full justify-items-center p-8 ">
      <h1 className="text-4xl">Edit Your Profile</h1>
      <div className="flex flex-col mt-3 ">
        <div>
          <ul className="flex border-b-2">
            <li
              className={`mx-5 ${
                type === PROFILENAV.OVERVIEW ? "border-b-2" : ""
              } border-slate-600`}
            >
              <Link to="/profile/overview">Profile </Link>
            </li>
            <li
              className={`mx-5  ${
                type === PROFILENAV.RESUME ? "border-b-2" : ""
              } border-slate-600`}
            >
              <Link to="/profile/resume">Resume / CV</Link>
            </li>
          </ul>
        </div>
        <div>
          <Suspense fallback={<MainLoader />}>
            <Routes>
              <Route path="/overview" element={<ProfileBox />} />
              <Route path="/resume" element={<Resume />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </div>
  );
}
