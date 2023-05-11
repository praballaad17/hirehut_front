import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faBullhorn,
  faUser,
  faBell,
  faSearch,
  faClipboard,
} from "@fortawesome/free-solid-svg-icons";

export default function SideBar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div>
      <div className="h-screen flex overflow-hidden bg-gray-100">
        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 w-64 bg-white border-r overflow-y-auto ${
            isSidebarOpen ? "block" : "hidden"
          }`}
        >
          {/* Button to toggle sidebar */}
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <h2 className="text-lg font-semibold text-gray-800">Sidebar</h2>
            <button
              onClick={toggleSidebar}
              className="text-gray-600 hover:text-gray-800"
            >
              <FontAwesomeIcon icon={faBell} />
            </button>
          </div>
          {/* Navlinks */}
          <nav className="mt-5">
            <ul className="space-y-1">
              <li>
                <a
                  href="#"
                  className="flex items-center px-4 py-2 text-gray-700 hover:text-gray-900"
                >
                  <FontAwesomeIcon icon={faBriefcase} className="mr-2" />
                  <span>Job</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center px-4 py-2 text-gray-700 hover:text-gray-900"
                >
                  <FontAwesomeIcon icon={faBullhorn} className="mr-2" />
                  <span>Campaign</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center px-4 py-2 text-gray-700 hover:text-gray-900"
                >
                  <FontAwesomeIcon icon={faUser} className="mr-2" />
                  <span>Candidates</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center px-4 py-2 text-gray-700 hover:text-gray-900"
                >
                  <FontAwesomeIcon icon={faSearch} className="mr-2" />
                  <span>Search Resume</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center px-4 py-2 text-gray-700 hover:text-gray-900"
                >
                  <FontAwesomeIcon icon={faClipboard} className="mr-2" />
                  <span>Interview</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
