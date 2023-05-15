import React from "react";

export default function JobSearch() {
  return (
    <div className=" flex">
      <div className="border border-gray-400 p-2  rounded-lg focus:outline-none mr-5">
        <label>What</label>
        <input
          className="focus:border-blue-400 focus:outline-none ml-2 w-56"
          placeholder="Job Title, Position, Company"
        />
      </div>
      <div className="border border-gray-400 p-2  rounded-lg focus:outline-none mr-4">
        <label>where</label>
        <input
          className="focus:border-blue-400 focus:outline-none ml-2 w-56"
          placeholder="City, State, Pincode"
        />
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300 ease-in-out focus:outline-none focus:ring focus:ring-blue-300">
        Find
      </button>
    </div>
  );
}
