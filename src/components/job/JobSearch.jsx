import React, { useEffect, useState } from "react";
import useSearch from "../../hooks/useSearch";
import { filterJobSearch } from "../../services/jobseekerServices";
import { Link } from "react-router-dom";
import JobDesModal from "./JobDesModal";
import { useUser } from "../../Context/userContext";
import NOJOB from "../../assets/no-job.jpg";
export default function JobSearch() {
  const [query, setQuery] = useState({
    what: "",
    where: "",
  });
  const { addToast } = useUser();
  const [result, setResult] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState();

  useEffect(() => {
    const fetch = async () => {
      if (query.what === "" && query.where === "") {
        try {
          const res = await filterJobSearch({ what: "", where: "all" }, 1, 5);
          console.log(res);
          setResult(res);
        } catch (error) {
          console.log(error);
          addToast("error fetching jobs");
        }
      }
    };
    fetch();
  }, []);

  const handleSearch = async () => {
    try {
      const res = await filterJobSearch(query, 1, 5);
      console.log(res);
      setResult(res);
    } catch (error) {
      console.log(error);
      addToast("error fetching jobs", true);
    }
  };

  console.log(result);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex">
        <div className="border border-gray-400 p-2  rounded-lg focus:outline-none mr-5">
          <label>What</label>
          <input
            value={query.what}
            onChange={(e) => setQuery({ ...query, what: e.target.value })}
            className="focus:border-blue-400 focus:outline-none ml-2 w-56"
            placeholder="Job Title, Position, Company"
          />
        </div>
        <div className="border border-gray-400 p-2  rounded-lg focus:outline-none mr-4">
          <label>where</label>
          <input
            value={query.where}
            onChange={(e) => setQuery({ ...query, where: e.target.value })}
            className="focus:border-blue-400 focus:outline-none ml-2 w-56"
            placeholder="City, State, Pincode"
          />
        </div>
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300 ease-in-out focus:outline-none focus:ring focus:ring-blue-300"
        >
          Find
        </button>
      </div>
      {result.length ? (
        <div className="w-full flex flex-col items-center ">
          {result.map((job) => (
            <div
              key={job._id}
              className="w-3/4 rounded-lg border border-slate-400 bg-gray-100 my-4 p-4"
            >
              <div
                onClick={() => {
                  setSelectedJob(job);
                  setOpen(true);
                }}
                className="capitalize font-bold text-xl hover:underline cursor-pointer"
              >
                {job.title}
              </div>
              <div className="capitalize text-md">
                {job.city}, {job.state}
              </div>
              <div className="">{job.opening} Vacancies</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-12">
          <span className="font-bold">No Job found</span>
          <img className="w-44 h-44 " src={NOJOB} />
        </div>
      )}

      <JobDesModal open={open} close={() => setOpen(false)} job={selectedJob} />
    </div>
  );
}
