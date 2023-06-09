import React, { useEffect, useState } from "react";
import {
  BENEFITSOBJ,
  JOBTYPEOBJ,
  SHIFTOBJ,
  SUPPLEMENTPAYOBJ,
} from "../../constants/variables";
import { useUser } from "../../Context/userContext";
import { applyJob } from "../../services/jobseekerServices";
import { useJobSeeker } from "../../Context/JobseekerDataContext";

export default function JobOverviewModal({ job }) {
  const { user, addToast } = useUser();
  const {
    checkJobApliedContext,
    applyJobcontext,
    addToSavedJobsContext,
    checkJobSavedContext,
  } = useJobSeeker();
  const [applied, setApplied] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const res = checkJobApliedContext(job._id);
      const isSaved = checkJobSavedContext(job._id);
      setSaved(isSaved);
      console.log("is applied", res);
      setApplied(res);
    } catch (error) {}
  }, []);

  const handleApply = async () => {
    try {
      // const res = await applyJob(user.id, job._id, "applied");
      applyJobcontext(job._id);
      addToast(`Applied for ${job.title} at ${job.profileId.name}`);
    } catch (error) {
      addToast("error", true);
      console.log(error);
    }
  };

  console.log(applied);

  return (
    <div className="grid grid-cols-3">
      <div className="col-span-2">
        <h1 className="text-2xl font-bold">{job.title}</h1>
        <div>
          {job.jobType.map((item) => (
            <div className="bg-gray-200 py-1 px-2 rounded-md inline-block mx-1">
              <i className="fa-solid fa-briefcase mr-2"></i>
              {JOBTYPEOBJ[item]}
            </div>
          ))}
        </div>
        <p>{job.description}</p>
      </div>
      <div>
        <div>
          <button
            disabled={saved}
            onClick={() => addToSavedJobsContext(job)}
            className={`bg-white text-gray-900 px-4 py-2 rounded-lg border border-gray-900 mx-4 hover:bg-gray-900 hover:text-white transition-colors duration-300 ease-in-out focus:outline-none focus:ring focus:ring-blue-300`}
          >
            {saved ? "saved" : "save"}
          </button>
          <button
            disabled={applied}
            onClick={handleApply}
            className={` text-white px-4 py-2 rounded-lg ${
              applied ? "bg-green-600" : "hover:bg-blue-700 bg-gray-900"
            } transition-colors duration-300 ease-in-out focus:outline-none focus:ring focus:ring-blue-300`}
          >
            {applied ? "Applied" : "Apply"}
          </button>
        </div>
        <div className="mt-5">
          <h3 className="font-bold">Location</h3>
          <p className="">
            {job.location.address}, <br />
            {job.location.city}, {job.location.state}
          </p>
          <h3 className="font-bold">Pay / Salary</h3>
          <p className="">
            {" "}
            {job.payRate.start} {job.payRate.end ? job.payRate.end : ""}
          </p>
          <div>
            {job.shift.map((item) => (
              <div className="bg-gray-200 py-1 px-2 rounded-md inline-block mx-1">
                <i className="fa-solid fa-briefcase mr-2"></i>
                {SHIFTOBJ[item]}
              </div>
            ))}
          </div>
          <h3 className="font-bold capitalize">supplement Pay</h3>
          <div>
            {job.supplementPay.map((item) => (
              <div className="bg-gray-200 py-1 px-2 rounded-md inline-block mx-1">
                <i className="fa-solid fa-briefcase mr-2"></i>
                {SUPPLEMENTPAYOBJ[item]}
              </div>
            ))}
          </div>
          <h3 className="font-bold capitalize">BENEFITS</h3>
          <div>
            {job.benefits.map((item) => (
              <div className="bg-gray-200 py-1 px-2 rounded-md inline-block mx-1">
                <i className="fa-solid fa-briefcase mr-2"></i>
                {BENEFITSOBJ[item]}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
