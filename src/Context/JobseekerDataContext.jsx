import React, {
  useContext,
  useState,
  useEffect,
  createContext,
  useCallback,
} from "react";

import { useUser } from "./userContext";
import {
  applyJob,
  deleteSaveJob,
  fetchAppliedJob,
  fetchSaveJob,
  saveJob,
  searchJobs,
} from "../services/jobseekerServices";
import useLocalStorage from "../hooks/useLocalStorage";

const DataContext = createContext();

export function useJobSeeker() {
  return useContext(DataContext);
}
export function JobseekerDataProvider({ user, children }) {
  const { addToast } = useUser();
  const [jobs, setJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [applied, setApplied] = useLocalStorage("applied", {});
  const [saved, setSaved] = useLocalStorage("saved", {});

  const getAllJobsContext = async () => {
    const res = await searchJobs(user.id);
    setJobs(res);
  };

  const fetchSavedJobsContext = async () => {
    const res = await fetchSaveJob(user.id);
    setSavedJobs(res);
    savedToLocalStorage(res);
  };

  function savedToLocalStorage(jobs) {
    const localSaved = {};
    jobs.map((job) => {
      localSaved[job.jobId._id] = 1;
    });
    setSaved(localSaved);
  }

  const addToSavedJobsContext = async (job) => {
    await saveJob(user.id, job._id);
    setSavedJobs([...savedJobs, { jobId: job }]);
    addToast(`${job.title} added to saved list.`);
  };

  const deleteSavedJobContext = async (jobId) => {
    await deleteSaveJob(user.id, jobId);
    const tempList = savedJobs.filter((job) => job.jobId._id != jobId);
    setSavedJobs(tempList);
    savedToLocalStorage(tempList);
    addToast(`Job is removed From saved List.`);
  };

  const fetchAppliedJobContext = async () => {
    const res = await fetchAppliedJob(user.id);
    setAppliedJobs(res);
  };

  const applyJobcontext = async (jobId) => {
    const res = await applyJob(user.id, jobId, "applied");
    setApplied({ ...applied, [jobId]: 1 });
  };

  const checkJobApliedContext = (jobId) => {
    if (applied[jobId]) {
      return true;
    } else return false;
  };

  const checkJobSavedContext = (jobId) => {
    if (saved[jobId]) {
      return true;
    } else return false;
  };

  const value = {
    getAllJobsContext,
    jobs,
    savedJobs,
    appliedJobs,
    applyJobcontext,
    checkJobApliedContext,
    addToSavedJobsContext,
    deleteSavedJobContext,
    fetchSavedJobsContext,
    checkJobSavedContext,
    fetchAppliedJobContext,
  };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
