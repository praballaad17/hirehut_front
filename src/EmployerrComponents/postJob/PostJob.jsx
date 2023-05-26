import React, { useEffect, useState } from "react";
import { useData } from "../../Context/EmployeerDataContext";
import {
  BENEFITS,
  HIRETIME,
  JOBDETAILS,
  JOBTYPE,
  SHIFT,
  SUPPLEMENTPAY,
} from "../../constants/variables";
import PayRate from "./PayRate";
import { useUser } from "../../Context/userContext";
import { addJob, editJob } from "../../services/employeerServices";
import { useNavigate, useParams } from "react-router-dom";
import { JOBPAGE } from "../../constants/routes";

export default function PostJob() {
  const { jobId } = useParams();
  const { branches, getAllBranchesContext, getJobContext } = useData();
  const [editMode, setEditMode] = useState(false);
  const { setLoading, addToast, user } = useUser();
  const [jobDetails, setJobDetails] = useState(JOBDETAILS);
  const [PDFFile, setPDFFile] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setJobDetails(JOBDETAILS);
  }, []);

  useEffect(() => {
    if (jobId) {
      setEditMode(true);
      setLoading(true);
      const fetchfun = async () => {
        const res = await getJobContext(jobId);
        setJobDetails(res);
        setLoading(false);
      };

      fetchfun();
    }
  }, [jobId]);

  useEffect(() => {
    getAllBranchesContext();
  }, []);

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

  const handleJobPost = async (e) => {
    e.preventDefault();
    setLoading(true);

    let formData = { ...jobDetails };

    formData.jobType = [...formData.jobType];
    formData.shift = [...formData.shift];
    formData.benefits = [...formData.benefits];
    formData.supplementPay = [...formData.supplementPay];
    formData.userId = user.id;
    formData.profileId = user.profileId;

    try {
      if (editMode) {
        await editJob(formData);
        addToast("Job is successfuly Edited");
        navigate(`/job/${jobId}`);
      } else {
        await addJob(formData);
        addToast("Job is successfuly added");
        navigate(JOBPAGE);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      addToast("error", true);
    }
  };

  console.log(jobDetails, editMode);

  return (
    <div className="grid grid-cols-1 gap-4 mt-4 mx-auto w-3/4">
      <div className="bg-gray-200 p-10 rounded-lg  text-2xl font-bold">
        Provide Basic Information
      </div>
      <div className="mb-5 bg-gray-200 p-10 rounded-lg ">
        <label for="email" className="block text-gray-700 font-bold mb-2">
          Job Title
        </label>
        <input
          value={jobDetails.title}
          onChange={(e) =>
            setJobDetails({ ...jobDetails, title: e.target.value })
          }
          className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-5 bg-gray-200 p-10 rounded-lg ">
        <label for="email" className="block text-gray-700 font-bold mb-2">
          Where will Employee Will Report To work?
        </label>
        <select
          value={jobDetails.location}
          onChange={(e) =>
            setJobDetails({ ...jobDetails, location: e.target.value })
          }
          className="border border-gray-400 capitalize p-2 w-96 rounded-lg focus:outline-none focus:border-blue-500"
        >
          <option value={""}>select</option>
          {branches.map((item) => (
            <option key={item._id} value={item._id}>
              {item.name}, ({item.city},{item.state} )
            </option>
          ))}
        </select>
      </div>

      <div className="mb-5 bg-gray-200 p-10 rounded-lg  ">
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

      <div className="mb-5 bg-gray-200 p-10 rounded-lg ">
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

      <div className="mb-5 bg-gray-200 p-10 rounded-lg ">
        <div>
          <label for="email" className="block text-gray-700 font-bold mb-2">
            How many people do you want to hire for this opening?*
          </label>
          <input
            value={jobDetails.opening}
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
          <select
            value={jobDetails.hireTime}
            onChange={(e) =>
              setJobDetails({ ...jobDetails, hireTime: e.target.value })
            }
            className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-500"
          >
            {HIRETIME.map((item) => (
              <option key={item.code} value={item.code}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-5 bg-gray-200 p-10 rounded-lg ">
        <PayRate jobDetails={jobDetails} setJobDetails={setJobDetails} />
      </div>

      <div className="mb-5 bg-gray-200 p-10 rounded-lg ">
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

      <div className="mb-5 bg-gray-200 p-10 rounded-lg ">
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

      <div className="mb-5 bg-gray-200 p-10 rounded-lg ">
        <div>
          <label className="flex justify-between w-full  text-gray-700 font-bold mb-2">
            Job Description
          </label>
          <textarea
            value={jobDetails.description}
            onChange={(e) =>
              setJobDetails({ ...jobDetails, description: e.target.value })
            }
            className="border border-gray-400 w-full h-40 p-3"
          />
        </div>
        <div className="fonr-bold text-xl text-center">or</div>
        <div className=" border-2 border-slate-300 p-5 mt-5">
          <label className="border-2 border-slate-400 cursor-pointer border-dotted w-full col-span-2 flex items-center justify-center">
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

      <div class="flex justify-end mb-5 bg-gray-200 p-10 rounded-lg  items-center">
        <div className="font-bold text-blue-600 cursor-pointer mr-4">
          Show Preview
        </div>
        <button
          onClick={handleJobPost}
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
        >
          {editMode ? "Update" : "Save"}
        </button>
        <button class="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">
          Cancel
        </button>
      </div>
    </div>
  );
}
