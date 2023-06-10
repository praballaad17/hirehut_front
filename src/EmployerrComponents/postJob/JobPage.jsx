import React, { useEffect } from "react";
import { useData } from "../../Context/EmployeerDataContext";
import { deleteJob } from "../../services/employeerServices";
import { useUser } from "../../Context/userContext";
import { Link } from "react-router-dom";
import { JOBSTATUS } from "../../constants/variables";
import { ADDJOB } from "../../constants/routes";
import noImg from "../../assets/no-job.jpg";

export default function JobPage() {
  const { getAllJobsContext, jobs } = useData();

  const { addToast, setLoading } = useUser();
  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      await getAllJobsContext();
      setLoading(false);
    };
    fetch();
  }, []);

  return (
    <div>
      <div className="flex justify-between px-3 py-3">
        <h1 className="text-xl font-bold">Jobs</h1>
        <Link
          to={ADDJOB}
          className="border-2 border-gray-900 text-gray-900 py-2 px-3 rounded-lg hover:bg-gray-200"
        >
          Add Job
        </Link>
      </div>
      <div className="flex justify-between px-4">
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
      {jobs.length ? (
        <div>
          {jobs.map((job) => (
            <div
              key={job._id}
              className="px-16 py-8 mx-8 my-4 rounded-lg bg-slate-200 flex justify-between"
            >
              <div>
                <Link
                  to={`/job/${job._id}`}
                  className="text-blue-600 hover:underline text-xl capitalize cursor-pointer"
                >
                  {job.title}
                </Link>
                <div className="capitalize">
                  {job.location.city}, {job.location.state}
                </div>
              </div>
              <div className="flex gap-4">
                <span className="flex items-center">Saved</span>
                <div className="flex items-center">
                  <select
                    value={job.status}
                    className="border border-gray-400 capitalize p-2 mx-3  rounded-lg focus:outline-none focus:border-blue-500"
                  >
                    {JOBSTATUS.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>

                  <Link
                    to={`/edit-job/${job._id}`}
                    className="px-3 py-2 border-2 border-gray-900 rounded-lg text-gray-900 font-bold hover:bg-gray-300"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <img className="w-44 h-44" src={noImg} />
          <div className="font-bold">No Job Posted</div>
        </div>
      )}
    </div>
  );
}
