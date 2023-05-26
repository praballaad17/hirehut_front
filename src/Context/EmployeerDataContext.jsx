import React, {
  useContext,
  useState,
  useEffect,
  createContext,
  useCallback,
} from "react";
import { getUserProfile } from "../services/profileServices";
import {
  addBranch,
  fetchJobByJobId,
  getAllBranch,
  getAllJob,
} from "../services/employeerServices";
import { useUser } from "./userContext";
// import { getUserByUserId } from "../services/authenticationServices";

const DataContext = createContext();

export function useData() {
  return useContext(DataContext);
}
export function DataProvider({ user, children }) {
  const [branches, setBranches] = useState([]);
  const [jobs, setJobs] = useState([]);

  const { setLoading } = useUser();

  const addBranchContext = async (form) => {
    // setBranches([...branches, form]);
    await addBranch({ ...form, userId: user.id });
    await getAllBranchesContext();
  };

  const getAllBranchesContext = async () => {
    const res = await getAllBranch(user.id);
    setBranches(res);
  };

  const getAllJobsContext = async () => {
    const res = await getAllJob(user.id);
    setJobs(res);
  };

  const getJobCandidatesContext = async (jobId) => {
    const res = await getJobCandidates(jobId);
    return res;
  };

  const getJobContext = async (jobId) => {
    const res = await fetchJobByJobId(jobId);
    const arr = ["benefits", "jobType", "shift", "supplementPay"];

    arr.map((item) => {
      const set = arrayToSet(res[item]);
      res[item] = set;
    });
    return res;
  };

  function arrayToSet(arr) {
    const set = new Set();
    for (let i = 0; i < arr.length; i++) {
      set.add(arr[i]);
    }
    return set;
  }

  const value = {
    addBranchContext,
    branches,
    getAllBranchesContext,
    getAllJobsContext,
    getJobContext,
    jobs,
    getJobCandidatesContext,
  };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
