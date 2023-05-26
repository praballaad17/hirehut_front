import React from "react";
import { useData } from "../../Context/EmployeerDataContext";
import { Link } from "react-router-dom";

export default function Candidate() {
  const { getAllJobsContext, jobs } = useData();

  return (
    <div className="p-4">
      <div className="py-4">
        <h1 className="text-2xl font-bold">Candidate</h1>
      </div>
      <div>
        {jobs.length ? (
          <div className="grid grid-cols-3 gap-4">
            {jobs.map((job) => (
              <div className="p-3 rounded-lg bg-slate-100">
                <Link
                  to={`/candidate/${job._id}`}
                  className="text-xl font-bold capitalize cursor-pointer hover:underline"
                >
                  {job.title}
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <div className="">No Application availabil</div>
          </div>
        )}
      </div>
    </div>
  );
}
