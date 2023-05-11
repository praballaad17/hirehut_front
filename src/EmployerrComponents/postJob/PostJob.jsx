import React, { useState } from "react";
import { useData } from "../../Context/DataContext";
import {
  BENEFITS,
  JOBDETAILS,
  JOBTYPE,
  SHIFT,
  SUPPLEMENTPAY,
} from "../../constants/variables";
import PayRate from "./PayRate";

export default function PostJob() {
  const { branches } = useData();
  const [jobDetails, setJobDetails] = useState(JOBDETAILS);

  return (
    <div className="grid grid-cols-1 gap-4 mt-4">
      <div className="bg-gray-200 p-10 rounded-lg w-3/4 text-2xl font-bold">
        Provide Basic Information
      </div>
      <div className="mb-5 bg-gray-200 p-10 rounded-lg w-3/4">
        <label for="email" className="block text-gray-700 font-bold mb-2">
          Job Title
        </label>
        <input
          onChange={(e) =>
            setJobDetails({ ...jobDetails, title: e.target.value })
          }
          className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-5 bg-gray-200 p-10 rounded-lg w-3/4">
        <label for="email" className="block text-gray-700 font-bold mb-2">
          Where will Employee Will Report To work?
        </label>
        <select
          onChange={(e) => setForm({ ...form, employeecount: e.target.value })}
          className="border border-gray-400 capitalize p-2 w-96 rounded-lg focus:outline-none focus:border-blue-500"
        >
          {branches.map((item) => (
            <option key={item.name}>{item.name}</option>
          ))}
        </select>
      </div>

      <div className="mb-5 bg-gray-200 p-10 rounded-lg w-3/4 ">
        <label for="email" className="block text-gray-700 font-bold mb-2">
          What is the job type?*
        </label>
        <div className="flex gap-2 flex-wrap">
          {JOBTYPE.map((item) => (
            <div
              key={item.code}
              className="inline-block rounded-full bg-white px-2 py-2 hover:bg-blue-200"
            >
              + {item.name}
            </div>
          ))}
        </div>
      </div>

      <div className="mb-5 bg-gray-200 p-10 rounded-lg w-3/4">
        <label for="email" className="block text-gray-700 font-bold mb-2">
          What is the schedule for this job?
        </label>
        <div className="flex gap-2 flex-wrap">
          {SHIFT.map((item) => (
            <div
              key={item.code}
              className="inline-block rounded-full bg-white px-2 py-2 hover:bg-blue-200"
            >
              + {item.name}
            </div>
          ))}
        </div>
      </div>

      <div className="mb-5 bg-gray-200 p-10 rounded-lg w-3/4">
        <div>
          <label for="email" className="block text-gray-700 font-bold mb-2">
            How many people do you want to hire for this opening?*
          </label>
          <input
            type="number"
            onChange={(e) =>
              setJobDetails({ ...jobDetails, opening: e.target.value })
            }
            className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mt-5">
          <label for="email" className="block text-gray-700 font-bold mb-2">
            How quickly do you need to hire?*
          </label>
          <select className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-500">
            <option></option>
          </select>
        </div>
      </div>

      <div className="mb-5 bg-gray-200 p-10 rounded-lg w-3/4">
        <PayRate />
      </div>

      <div className="mb-5 bg-gray-200 p-10 rounded-lg w-3/4">
        <label for="email" className="block text-gray-700 font-bold mb-2">
          What is the schedule for this job?
        </label>
        <div className="flex gap-2 flex-wrap">
          {SUPPLEMENTPAY.map((item) => (
            <div
              key={item.code}
              className="inline-block rounded-full bg-white px-2 py-2 hover:bg-blue-200"
            >
              + {item.name}
            </div>
          ))}
        </div>
      </div>

      <div className="mb-5 bg-gray-200 p-10 rounded-lg w-3/4">
        <label for="email" className="block text-gray-700 font-bold mb-2">
          What is the schedule for this job?
        </label>
        <div className="flex gap-2 flex-wrap">
          {BENEFITS.map((item) => (
            <div
              key={item.code}
              className="inline-block rounded-full bg-white px-2 py-2 hover:bg-blue-200"
            >
              + {item.name}
            </div>
          ))}
        </div>
      </div>

      <div className="mb-5 bg-gray-200 p-10 rounded-lg w-3/4">
        <label className="flex justify-between w-full  text-gray-700 font-bold mb-2">
          Job Description
        </label>
        <textarea
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border border-gray-400 w-full h-40 p-3"
        />
      </div>
    </div>
  );
}
