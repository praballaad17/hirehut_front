import React, {
  useContext,
  useState,
  useEffect,
  createContext,
  useCallback,
} from "react";
import { getUserProfile } from "../services/profileServices";
// import { getUserByUserId } from "../services/authenticationServices";

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}
export function UserProvider({ user, children }) {
  const [profile, setProfile] = useState();
  const [toastList, setToastList] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.id) {
      getUserProfileContext();
    }
  }, [user?.id]);

  const getUserProfileContext = async () => {
    try {
      const res = await getUserProfile(user.id);
      console.log(res);
      setProfile(res);
    } catch (error) {
      addToast("User Not Found", true);
      console.log(error);
    }
  };

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
    profile,
    getUserProfileContext,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
