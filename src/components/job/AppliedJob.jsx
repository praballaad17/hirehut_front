import React, { useEffect } from "react";
import { useJobSeeker } from "../../Context/JobseekerDataContext";
import { Link } from "react-router-dom";
import { JOBTYPEOBJ } from "../../constants/variables";
import JobDesModal from "./JobDesModal";
import { useUser } from "../../Context/userContext";

export default function AppliedJob() {
  const { appliedJobs, fetchAppliedJobContext } = useJobSeeker();
  useEffect(() => {
    const fetch = async () => {
      await fetchAppliedJobContext();
    };
    fetch();
  }, []);

  return (
    <div className="grid grid-cols-3">
      {appliedJobs.map((job) => (
        <div
          key={job.jobId._id}
          className="col-span-1 px-16 py-8 mx-8 my-4 rounded-lg bg-slate-50 flex justify-between"
        >
          <div>
            <Link
              onClick={() => {
                setSelectedJob(job.jobId);
                setOpen(true);
              }}
              className="text-blue-600 hover:underline text-xl capitalize cursor-pointer"
            >
              {job.jobId.title}
            </Link>
            <div className="capitalize">{job.jobId.profileId.name}</div>
            <div className="capitalize">
              {job.jobId.location.city}, {job.jobId.location.state}
            </div>
            <div>
              {job.jobId.jobType.map((item) => (
                <div
                  key={item}
                  className="bg-gray-200 py-1 px-2 rounded-md inline-block mx-1"
                >
                  <i className="fa-solid fa-briefcase mr-2"></i>
                  {JOBTYPEOBJ[item]}
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-4">
            <span className="flex items-center">Status: </span>
          </div>
        </div>
      ))}
    </div>
  );
}
