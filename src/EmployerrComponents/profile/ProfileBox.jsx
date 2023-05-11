import React, { useState } from "react";
import {
  COMPANYDETAILS,
  EMPLOYEERROLES,
  NOOFEMPLOYEE,
} from "../../constants/variables";
import { updateProfile } from "../../services/profileServices";
import { useUser } from "../../Context/userContext";

export default function ProfileBox() {
  const { user, loading, setLoading } = useUser();
  const [form, setForm] = useState(COMPANYDETAILS);
  const [logo, setLogo] = useState("");

  return (
    <div className="border-2 border-slate-300 w-90 h-full p-5 mt-5">
      <div className="mb-5">
        <label for="email" className="block text-gray-700 font-bold mb-2">
          Your Company
        </label>
        <input
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border border-gray-400 p-2 w-96 rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-5">
        <label for="email" className="block text-gray-700 font-bold mb-2">
          Your Role
        </label>
        <select
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          className="border border-gray-400 capitalize p-2 w-96 rounded-lg focus:outline-none focus:border-blue-500"
        >
          {EMPLOYEERROLES.map((item) => (
            <option>{item}</option>
          ))}
        </select>
      </div>
      <form className="flex items-center space-x-6">
        <div className="shrink-0">
          <img
            className="h-16 w-16 object-cover rounded-full"
            src={logo}
            alt="logo"
          />
        </div>
        <label className="block">
          <span className="sr-only">Choose Your Logo</span>
          <input
            onChange={(e) => setLogo(e.target.value)}
            type="file"
            className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100
    "
          />
        </label>
      </form>

      <div className="mb-5">
        <label for="email" className="block text-gray-700 font-bold mb-2">
          Website
        </label>
        <input
          onChange={(e) => setForm({ ...form, website: e.target.value })}
          className="border border-gray-400 p-2 w-96 rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="mb-5">
        <label for="email" className="block text-gray-700 font-bold mb-2">
          Location
        </label>
        <input
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          className="border border-gray-400 p-2 w-96 rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="mb-5">
        <label for="email" className="block text-gray-700 font-bold mb-2">
          No of Employess
        </label>
        <select
          onChange={(e) => setForm({ ...form, employeecount: e.target.value })}
          className="border border-gray-400 capitalize p-2 w-96 rounded-lg focus:outline-none focus:border-blue-500"
        >
          {NOOFEMPLOYEE.map((item) => (
            <option key={item.key}>{item.data}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="flex justify-between w-1/2  text-gray-700 font-bold mb-2">
          What {form.name} do?
          <div className="inline-block ">{2000 - form.description.length}</div>
        </label>
        <textarea
          maxLength={2000}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border border-gray-400 w-1/2 h-40"
        />
      </div>

      <div className="mb-5">
        <label
          for="email"
          className="flex justify-between w-1/2 text-gray-700 font-bold mb-2 "
        >
          One Line Pitch{" "}
          <div className="inline-block ">{100 - form.pitch.length}</div>
        </label>
        <input
          maxLength={100}
          onChange={(e) => setForm({ ...form, pitch: e.target.value })}
          className="border border-gray-400 p-2 w-1/2 rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>
    </div>
  );
}
