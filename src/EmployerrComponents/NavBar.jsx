import {
  faAngleDown,
  faBell,
  faMessage,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HOME, MESSAGES, PROFILE, PROFILEOVERVIEW } from "../constants/routes";
import { logout } from "../services/authenticationServices";
import { useUser } from "../Context/userContext";

export default function NavBar() {
  const { profile } = useUser();
  const [open, setOpen] = useState(false);

  console.log(profile);
  return (
    <nav className="bg-white shadow-lg fixed w-full">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <Link to={HOME} className="flex-shrink-0 flex items-center">
            <img
              className="block lg:hidden h-8 w-auto"
              src="/img/logos/workflow-mark-on-white.svg"
              alt="Hire Hut"
            />
            <img
              className="hidden lg:block h-8 w-auto"
              src="/img/logos/workflow-logo-on-white.svg"
              alt="Hire Hut"
            />
          </Link>
          <div className="flex items-center">
            <div className="inline-flex px-3 hover:bg-slate-300 h-full  items-center mx-2">
              <FontAwesomeIcon icon={faBell} />
            </div>
            <Link
              to={MESSAGES}
              className="inline-flex px-3 hover:bg-slate-300 h-full  items-center mx-2"
            >
              <FontAwesomeIcon icon={faMessage} />
            </Link>
            <div className="relative inline-block  text-black my-auto">
              <button
                onClick={() => setOpen(!open)}
                className="inline-flex items-center justify-center w-full  hover:bg-blue-100 border rounded-md px-4 py-1 focus:outline-none"
              >
                <img
                  src={profile?.profileUrl}
                  alt="profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <svg
                  className="fill-current h-4 w-4 ml-2 -mr-1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 14l6-6-1.41-1.41L10 11.17l-4.59-4.58L4 8l6 6z" />
                </svg>
              </button>
              {open ? (
                <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-3">
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <span>Profile</span>
                    <Link
                      to={PROFILEOVERVIEW}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white"
                    >
                      Edit Profile
                    </Link>
                    <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white">
                      Settings
                    </Link>

                    <span>Support</span>
                    <Link
                      to={HOME}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white"
                    >
                      Help
                    </Link>
                    <Link
                      onClick={logout}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white"
                    >
                      LogOut
                    </Link>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
