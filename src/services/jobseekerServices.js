import axios from "axios";

const apiEndpoint = import.meta.env.VITE_API_URL + "/jobseeker";

export const searchJobs = async (userId) => {
  try {
    const response = await axios.get(`${apiEndpoint}/search-jobs/`);
    return response.data;
  } catch (error) {
    return error;
  }
};
