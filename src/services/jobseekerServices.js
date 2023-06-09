import axios from "axios";

const apiEndpoint = import.meta.env.VITE_API_URL + "/jobseeker";

//fetch profile
export const fetchJobSeekerProfile = async (userId) => {
  try {
    const response = await axios.get(`${apiEndpoint}/fetch-profile/${userId}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

//edit profile
export const postJobseekerProfile = async (userId, form) => {
  try {
    const response = await axios.post(`${apiEndpoint}/edit-profile/${userId}`, {
      form,
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const searchJobs = async (userId) => {
  try {
    const response = await axios.get(`${apiEndpoint}/search-jobs/`);
    return response.data;
  } catch (error) {
    return error;
  }
};

// apply job
export const applyJob = async (userId, jobId, status) => {
  try {
    const response = await axios.post(`${apiEndpoint}/apply-job/`, {
      userId,
      jobId,
      status,
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const checkApplyJob = async (userId, jobId) => {
  try {
    const response = await axios.post(
      `${apiEndpoint}/check-apply-job/${userId}/${jobId}`
    );
    return response;
  } catch (error) {
    return error;
  }
};

//save job
export const saveJob = async (userId, jobId) => {
  try {
    const response = await axios.post(`${apiEndpoint}/save-job/`, {
      userId,
      jobId,
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

//fetch applied job
export const fetchAppliedJob = async (userId) => {
  try {
    const response = await axios.get(
      `${apiEndpoint}/fetch-applied-job/${userId}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

//delete job
export const fetchSaveJob = async (userId) => {
  try {
    const response = await axios.get(`${apiEndpoint}/fetch-save-job/${userId}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

//delete job
export const deleteSaveJob = async (userId, jobId) => {
  try {
    const response = await axios.delete(
      `${apiEndpoint}/delete-save-job/${userId}/${jobId}`,
      {
        userId,
        jobId,
      }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

//FETCH specific job
export const fetchJobByJobId = async (jobId) => {
  try {
    const response = await axios.get(`${apiEndpoint}/fetch-job/${jobId}`);
    return response.data;
  } catch (error) {
    return error;
  }
};
