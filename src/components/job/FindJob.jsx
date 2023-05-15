import React, { useEffect, useState } from "react";
import { useJobSeeker } from "../../Context/JobseekerDataContext";
import { Link } from "react-router-dom";
import { JOBTYPEOBJ } from "../../constants/variables";
import JobDesModal from "./JobDesModal";

export default function FindJob() {
  const { jobs, getAllJobsContext } = useJobSeeker();
  const [selectedJob, setSelectedJob] = useState();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      getAllJobsContext();
    } catch (error) {
      console.log(error);
    }
  }, []);

  console.log(jobs);
  return (
    <>
      <div>
        {jobs.map((job) => (
          <div
            onClick={() => {
              setSelectedJob(job);
              setOpen(true);
            }}
            key={job._id}
            className="px-16 py-8 mx-8 my-4 rounded-lg bg-slate-50 flex justify-between"
          >
            <div>
              <Link className="text-blue-600 hover:underline text-xl capitalize cursor-pointer">
                {job.title}
              </Link>
              <div className="capitalize">{job.profileId.name}</div>
              <div className="capitalize">
                {job.location.city}, {job.location.state}
              </div>
              <div>
                {job.jobType.map((item) => (
                  <div className="bg-gray-200 py-1 px-2 rounded-md">
                    <i className="fa-solid fa-briefcase mr-2"></i>
                    {JOBTYPEOBJ[item]}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-4">
              <span className="flex items-center">Saved</span>
              <div className="flex items-center">
                <button
                  className="px-3 py-2 border-2 border-gray-900 rounded-lg text-gray-900 font-bold hover:bg-gray-300"
                  onClick={() => handleDelete(job._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <JobDesModal open={open} close={() => setOpen(false)} job={selectedJob} />
    </>
  );
}
