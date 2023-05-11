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
import { useUser } from "../../Context/userContext";

export default function PostJob() {
  const { branches } = useData();
  const { setLoading, loading } = useUser();
  const [jobDetails, setJobDetails] = useState(JOBDETAILS);
  const [PDFFile, setPDFFile] = useState();

  const handlePdf = (e) => {
    setLoading(true);
    if (e.target.files && e.target.files[0]) {
      setPDFFile(e.target.files[0]);
    }
    setLoading(false);
  };

  const handleCheck = (property, type) => {
    let newproperty = jobDetails[property];
    if (jobDetails[property].has(type)) {
      newproperty.delete(type);
    } else {
      newproperty.add(type);
    }
    setJobDetails({
      ...jobDetails,
      [property]: newproperty,
    });
  };

  console.log(jobDetails);

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
              onClick={() => handleCheck("jobType", item.code)}
              className={` inline-block rounded-full ${
                jobDetails.jobType.has(item.code)
                  ? "bg-gray-500 "
                  : "bg-white hover:bg-blue-200"
              } px-2 py-2  cursor-pointer`}
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
              onClick={() => handleCheck("shift", item.code)}
              className={` inline-block rounded-full ${
                jobDetails.shift.has(item.code)
                  ? "bg-gray-500 "
                  : "bg-white hover:bg-blue-200"
              } px-2 py-2  cursor-pointer`}
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
              onClick={() => handleCheck("supplementPay", item.code)}
              className={` inline-block rounded-full ${
                jobDetails.supplementPay.has(item.code)
                  ? "bg-gray-500 "
                  : "bg-white hover:bg-blue-200"
              } px-2 py-2  cursor-pointer`}
            >
              + {item.name}
            </div>
          ))}
        </div>
      </div>

      <div className="mb-5 bg-gray-200 p-10 rounded-lg w-3/4">
        <label for="email" className="block text-gray-700 font-bold mb-2">
          Are any of the following benefits offered?
        </label>
        <div className="flex gap-2 flex-wrap">
          {BENEFITS.map((item) => (
            <div
              key={item.code}
              onClick={() => handleCheck("benefits", item.code)}
              className={` inline-block rounded-full ${
                jobDetails.benefits.has(item.code)
                  ? "bg-gray-500 "
                  : "bg-white hover:bg-blue-200"
              } px-2 py-2  cursor-pointer`}
            >
              + {item.name}
            </div>
          ))}
        </div>
      </div>

      <div className="mb-5 bg-gray-200 p-10 rounded-lg w-3/4">
        <div>
          <label className="flex justify-between w-full  text-gray-700 font-bold mb-2">
            Job Description
          </label>
          <textarea
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="border border-gray-400 w-full h-40 p-3"
          />
        </div>
        <div className="fonr-bold text-xl text-center">or</div>
        <div className=" border-2 border-slate-300 p-5 mt-5">
          <label className="border-2 border-slate-400 border-dotted w-full col-span-2 flex items-center justify-center">
            <p className="text-blue-500">Upload PDF</p>
            <input className="sr-only" type="file" onChange={handlePdf} />
          </label>

          {PDFFile && (
            <div className="border-2 border-slate-300 p-5 mt-5">
              <p2 className="block font-bold">{PDFFile.name}</p2>
              <span className="text-gray-500">
                {loading ? (
                  " Uploading..."
                ) : (
                  <>
                    <i
                      class="fa-solid fa-circle-check"
                      style={{ color: "#00d123" }}
                    ></i>{" "}
                    "File Selected"
                  </>
                )}
              </span>
              <div
                onClick={() => setPDFFile(null)}
                className="text-blue-500 underline cursor-pointer"
              >
                remove file
              </div>
            </div>
          )}
        </div>
      </div>

      <div class="flex justify-end mb-5 bg-gray-200 p-10 rounded-lg w-3/4 items-center">
        <div className="font-bold text-blue-600 cursor-pointer mr-4">
          Show Preview
        </div>
        <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2">
          Save
        </button>
        <button class="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">
          Cancel
        </button>
      </div>
    </div>
  );
}
