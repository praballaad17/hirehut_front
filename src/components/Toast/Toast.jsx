import React, { useEffect, useState } from "react";
import { useUser } from "../../Context/userContext";

export default function ToastItem({ toast, idx }) {
  const { removeToast } = useUser();
  const toggleShowA = () => {
    removeToast(idx);
  };

  return (
    <div
      className={`${
        toast.isError ? "bg-red-500" : "bg-white"
      } rounded-lg shadow-lg p-4 my-3`}
    >
      <div className="flex flex-row items-center">
        <div className="rounded-full text-2xl text-white h-8 w-8 flex items-center justify-center">
          {toast.isError ? (
            <i
              className="fa-solid fa-circle-exclamation"
              style={{ color: "#ffffff" }}
            ></i>
          ) : (
            <i
              className="fa-regular fa-circle-check"
              style={{ color: "#03b300" }}
            ></i>
          )}
        </div>
        <div className="ml-2 mr-6">
          <p className="font-bold"> Hire Hut</p>
          <p className={`${toast.isError ? "text-white" : ""}`}>
            {toast.message}
          </p>
        </div>
        <div className="flex-grow"></div>
        <div onClick={toggleShowA} className="flex-shrink">
          <button
            type="button"
            className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
              <path
                fill-rule="evenodd"
                d="M18.2929 5.29289C18.6834 4.90237 19.3166 4.90237 19.7071 5.29289C20.0976 5.68342 20.0976 6.31658 19.7071 6.70711L13.4142 13L19.7071 19.2929C20.0976 19.6834 20.0976 20.3166 19.7071 20.7071C19.3166 21.0976 18.6834 21.0976 18.2929 20.7071L12 14.4142L5.70711 20.7071C5.31658 21.0976 4.68342 21.0976 4.29289 20.7071C3.90237 20.3166 3.90237 19.6834 4.29289 19.2929L11.5858 13L4.29289 6.70711C3.90237 6.31658 3.90237 5.68342 4.29289 5.29289C4.68342 4.90237 5.31658 4.90237 5.70711 5.29289L12 11.5858L18.2929 5.29289Z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
