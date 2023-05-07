import {
  faAngleDown,
  faBell,
  faMessage,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HOME, MESSAGES } from "../constants/routes";
import { logout } from "../services/authenticationServices";

export default function NavBar() {
  const [open, setOpen] = useState(false);
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
          <div>
            <div className="inline-flex px-3 hover:bg-slate-300 h-full flex items-center mx-2">
              <FontAwesomeIcon icon={faBell} />
            </div>
            <Link
              to={MESSAGES}
              className="inline-flex px-3 hover:bg-slate-300 h-full flex items-center mx-2"
            >
              <FontAwesomeIcon icon={faMessage} />
            </Link>
            <div className="relative inline-block mt-4 lg:mt-0 text-blue-200">
              <button
                onClick={() => setOpen(!open)}
                className="inline-flex items-center justify-center w-full rounded-md border border-blue-400 hover:text-white hover:border-white px-4 py-2 focus:outline-none"
              >
                <span>Dropdown</span>
                <svg
                  className="fill-current h-4 w-4 ml-2 -mr-1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 14l6-6-1.41-1.41L10 11.17l-4.59-4.58L4 8l6 6z" />
                </svg>
              </button>
              {open ? (
                <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <span>Profile</span>
                    <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white">
                      Edit Profile
                    </Link>
                    <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white">
                      Setting
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
