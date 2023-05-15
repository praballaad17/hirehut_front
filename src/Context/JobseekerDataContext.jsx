import React, {
  useContext,
  useState,
  useEffect,
  createContext,
  useCallback,
} from "react";

import { useUser } from "./userContext";
import { searchJobs } from "../services/jobseekerServices";

const DataContext = createContext();

export function useJobSeeker() {
  return useContext(DataContext);
}
export function JobseekerDataProvider({ user, children }) {
  const [jobs, setJobs] = useState([]);

  const getAllJobsContext = async () => {
    const res = await searchJobs(user.id);
    setJobs(res);
  };

  const value = {
    getAllJobsContext,
    jobs,
  };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
