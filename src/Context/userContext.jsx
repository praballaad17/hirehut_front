import React, {
  useContext,
  useState,
  useEffect,
  createContext,
  useCallback,
} from "react";
// import { getUserByUserId } from "../services/authenticationServices";

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}
export function UserProvider({ user, children }) {
  const [toastList, setToastList] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const getUser = async () => {
  //     try {
  //       const res = await getUserByUserId(user.id);
  //       setUserDetails(res);
  //     } catch (error) {
  //       addToast("User Not Found", true);
  //       console.log(error);
  //     }
  //   };

  //   getUser();
  // }, [user?.id]);

  const addToast = (message, isError = false) => {
    setToastList([
      ...toastList,
      {
        message,
        isError,
      },
    ]);
  };

  const removeToast = (idx) => {
    if (idx > -1) {
      setToastList(toastList.filter((item, i) => i !== idx));
    }
  };

  const value = {
    user,
    toastList,
    userDetails,
    addToast,
    removeToast,
    loading,
    setLoading,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
