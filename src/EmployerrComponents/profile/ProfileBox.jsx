import React, { useEffect, useState } from "react";
import {
  COMPANYDETAILS,
  EMPLOYEERROLES,
  NOOFEMPLOYEE,
} from "../../constants/variables";
import { updateProfile } from "../../services/profileServices";
import { useUser } from "../../Context/userContext";

export default function ProfileBox() {
  const { user, addToast, setLoading, profile, getUserProfileContext } =
    useUser();
  const [form, setForm] = useState(COMPANYDETAILS);
  const [logo, setLogo] = useState("");

  function copyFields(source, destination) {
    for (let key in source) {
      if (source[key] !== "") {
        destination[key] = source[key];
      }
    }
  }

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        await getUserProfileContext();
        setLoading(false);
      } catch (error) {
        addToast("error fetching profile", true);
      }
    };
    fetch();
  }, []);

  useEffect(() => {
    copyFields(profile, form);
  }, [profile]);

  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      const res = await updateProfile(form, user.id);
      addToast("Profile is updated!");
      setLoading(false);
    } catch (error) {
      console.log(error);
      addToast("error updating profile", true);
      setLoading(false);
    }
  };

  const reset = () => {
    setForm(COMPANYDETAILS);
  };

  return (
    <div className="border-2 border-slate-300 w-90 h-full p-5 mt-5">
      <div className="mb-5">
        <label for="email" className="block text-gray-700 font-bold mb-2">
          Your Company
        </label>
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border border-gray-400 p-2 w-96 rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-5">
        <label for="email" className="block text-gray-700 font-bold mb-2">
          Your Role
        </label>
        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          className="border border-gray-400 capitalize p-2 w-96 rounded-lg focus:outline-none focus:border-blue-500"
        >
          <option value={""}>select</option>
          {EMPLOYEERROLES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
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
          value={form.website}
          onChange={(e) => setForm({ ...form, website: e.target.value })}
          className="border border-gray-400 p-2 w-96 rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="mb-5">
        <label for="email" className="block text-gray-700 font-bold mb-2">
          Location
        </label>
        <input
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          className="border border-gray-400 p-2 w-96 rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="mb-5">
        <label for="email" className="block text-gray-700 font-bold mb-2">
          No of Employess
        </label>
        <select
          value={form.employeecount}
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
          value={form.description}
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
          value={form.pitch}
          maxLength={100}
          onChange={(e) => setForm({ ...form, pitch: e.target.value })}
          className="border border-gray-400 p-2 w-1/2 rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="flex justify-start">
        <button
          onClick={handleUpdateProfile}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
        >
          Save
        </button>
        <button
          onClick={reset}
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
        >
          Close
        </button>
      </div>
    </div>
  );
}
