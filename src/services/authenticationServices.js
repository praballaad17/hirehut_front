import axios from "axios";

const apiEndpoint = import.meta.env.VITE_API_URL + "/auth";
const tokenKey = "token";

// /**
//  * Logs a user in with the provided credentials
//  * @function login
//  * @param {string} usernameOrEmail The username or email to login with
//  * @param {string} password A password to log in with
//  * @param {string} authToken A token to be used instead of a username/email or password
//  * @returns {object} The user object
//  */
export const login = async (usernameOrEmail, password, authToken) => {
  try {
    const request =
      usernameOrEmail && password
        ? { data: { usernameOrEmail, password } }
        : { headers: { authorization: authToken } };
    const response = await axios(`${apiEndpoint}/login`, {
      method: "POST",
      ...request,
    });
    localStorage.setItem(tokenKey, response.data.token);
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

// /**
//  * Registers a user with the provided credentials
//  * @param {string} email A user's email address
//  * @param {string} fullName A user's full name
//  * @param {string} username A user's username
//  * @param {string} password A user's password
//  * @returns {object} The user object
//  */
export const registerUser = async (email, password, isEmployeer) => {
  try {
    const response = await axios.post(`${apiEndpoint}/register`, {
      email,
      password,
      isEmployeer,
    });
    localStorage.setItem(tokenKey, response.data.token);
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

export const emailCheck = async (email) => {
  try {
    const response = await axios.get(`${apiEndpoint}/check-email/${email}`);
    return response;
  } catch (err) {
    return err.response;
  }
};

export const generateOtp = async (userId) => {
  try {
    const response = await axios.get(`${apiEndpoint}/generate-otp/${userId}`);
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const resetPassOtp = async (email) => {
  try {
    const response = await axios.get(
      `${apiEndpoint}/forgot-pass-generate-otp/${email}`
    );
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const changePassword = async (data) => {
  try {
    const response = await axios.put(`${apiEndpoint}/change-password`, {
      ...data,
    });
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export async function logout() {
  // localStorage.removeItem(tokenKey);
  localStorage.clear();
  window.location.reload(false);
}
