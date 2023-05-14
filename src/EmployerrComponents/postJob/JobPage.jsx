import React, { useEffect } from "react";
import { useData } from "../../Context/DataContext";
import { deleteJob } from "../../services/employeerServices";
import { useUser } from "../../Context/userContext";
import { Link } from "react-router-dom";

export default function JobPage() {
  const { getAllJobsContext, jobs } = useData();
  const { addToast } = useUser();
  useEffect(() => {
    getAllJobsContext();
  }, []);

  console.log(jobs);

  const handleDelete = async (id) => {
    try {
      await deleteJob(id);
      addToast(`Job Has been Deleted`);
      getAllJobsContext();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div>
        <h1>Jobs</h1>
        <button>Add Job</button>
      </div>
      <div className="flex justify-between">
        <div className="flex items-center">
          <input
            placeholder="Seaech JobTitle"
            className="border border-gray-400 p-2 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <div className="mb-5  rounded-lg inline-block">
            <label for="email" className="block text-gray-700 font-bold mb-2">
              Sort By:
            </label>
            <input className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-500" />
          </div>
          <div className="mb-5  rounded-lg inline-block">
            <label for="email" className="block text-gray-700 font-bold mb-2">
              order:
            </label>
            <input className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-500" />
          </div>
        </div>
      </div>
      <div>
        {jobs.map((job) => (
          <div
            key={job._id}
            className="px-16 py-8 mx-8 my-4 rounded-lg bg-slate-200 flex justify-between"
          >
            <div>
              <Link className="text-blue-600 hover:underline text-xl capitalize cursor-pointer">
                {job.title}
              </Link>
              <div className="capitalize">
                {job.location.city}, {job.location.state}
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
    </div>
  );
}
