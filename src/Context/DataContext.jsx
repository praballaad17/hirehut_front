import React, {
  useContext,
  useState,
  useEffect,
  createContext,
  useCallback,
} from "react";
import { getUserProfile } from "../services/profileServices";
// import { getUserByUserId } from "../services/authenticationServices";

const DataContext = createContext();

export function useData() {
  return useContext(DataContext);
}
export function DataProvider({ user, children }) {
  const [branches, setBranches] = useState([]);

  const addBranch = (form) => {
    setBranches([...branches, form]);
  };
  const value = {
    addBranch,
    branches,
  };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
