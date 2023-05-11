import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faBullhorn,
  faUser,
  faBell,
  faSearch,
  faClipboard,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { SIDEBAR } from "../constants/variables";
import { Link } from "react-router-dom";
import { ADDJOB } from "../constants/routes";

export default function SideBar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div class="flex flex-row flex-wrap flex-auto  w-56">
      <div
        class={`fixed flex flex-col flex-shrink-0 bg-white border-r border-gray-200 ${
          isSidebarOpen ? "w-56" : "w-12"
        } ease-in-out duration-300`}
      >
        <div class="flex flex-col h-full">
          <div
            onClick={toggleSidebar}
            class="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 rounded-lg hover:text-gray-900 hover:bg-gray-300 focus:bg-gray-300 focus:outline-none focus:text-gray-900"
          >
            {isSidebarOpen ? (
              <>
                <FontAwesomeIcon className="text-xl" icon={faTimes} />
                <div className="ml-3 inline-block">Collapse</div>
              </>
            ) : (
              <FontAwesomeIcon className="text-2xl" icon={faBars} />
            )}
          </div>
          <div class="block py-2 my-2 pl-3  text-sm font-semibold text-white bg-gray-900  rounded-lg  hover:bg-gray-500  focus:outline-none">
            <div className="inline-block text-xl">+</div>
            {isSidebarOpen ? (
              <Link to={ADDJOB} className="inline-block ml-3">
                Post a job
              </Link>
            ) : (
              <></>
            )}
          </div>
          <nav class="">
            {SIDEBAR.map((item) => (
              <a
                href="#"
                class="block py-2 pl-3  text-sm font-semibold text-gray-900  rounded-lg hover:text-gray-900 hover:bg-gray-300 focus:bg-gray-300 focus:outline-none focus:text-gray-900"
              >
                <div className="text-xl inline-block">{item.icon}</div>
                <div className="ml-3 inline-block">
                  {isSidebarOpen ? item.data : ""}
                </div>
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
