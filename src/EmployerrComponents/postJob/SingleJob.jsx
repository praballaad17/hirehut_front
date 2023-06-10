import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchJobByJobId } from "../../services/jobseekerServices";
import { JOBPAGE } from "../../constants/routes";
import { deleteJob } from "../../services/employeerServices";
import { useUser } from "../../Context/userContext";
import { useData } from "../../Context/EmployeerDataContext";
import {
  BENEFITSOBJ,
  HIRETIMEOBJ,
  JOBTYPEOBJ,
  SHIFTOBJ,
  SUPPLEMENTPAYOBJ,
} from "../../constants/variables";
import { Modal, useModal } from "../../commonComponents/Modal";

export default function SingleJob() {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const navigate = useNavigate();
  const { addToast, setLoading } = useUser();
  const { getAllJobsContext } = useData();
  const { isOpen, toggle } = useModal();

  useEffect(() => {
    if (!job) {
      setLoading(true);
      const fetchfun = async () => {
        const res = await fetchJobByJobId(jobId);
        console.log(res);
        setJob(res);
        setLoading(false);
      };

      fetchfun();
    }
  }, []);

  const handleDelete = async () => {
    try {
      await deleteJob(jobId);
      navigate(JOBPAGE);
      addToast(`Job Has been Deleted`);
      getAllJobsContext();
    } catch (error) {
      console.log(error);
    }
  };

  console.log(job);

  if (!job) return;

  return (
    <div className="p-4">
      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl capitalize font-bold">{job?.title}</h1>
          <h2>
            {job.location.city}, {job.location.state}{" "}
          </h2>
        </div>
        <div>
          <button
            onClick={toggle}
            className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-4 py-2 rounded-lg"
          >
            Delete
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3">
        <div className="col-span-2">
          <div>
            {job.jobType.map((item) => (
              <div className="bg-gray-200 py-1 px-2 rounded-md inline-block mx-1">
                <i className="fa-solid fa-briefcase mr-2"></i>
                {JOBTYPEOBJ[item]}
              </div>
            ))}
          </div>
          <p className="mt-4 whitespace-pre-wrap ">{job.description}</p>
        </div>
        <div>
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
            <h3 className="font-bold">Hire Time</h3>
            <p className="">{HIRETIMEOBJ[job.hireTime]}</p>
            <h3 className="font-bold">Number of Openings</h3>
            <p className="">{job.opening}</p>
            <h3 className="font-bold">Shifts</h3>
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

      <Modal
        isOpen={isOpen}
        toggle={toggle}
        submitFun={handleDelete}
        content="Are You Sure You want to delete the job"
        title="delete"
      />
    </div>
  );
}
