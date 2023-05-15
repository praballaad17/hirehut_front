import axios from "axios";

const apiEndpoint = import.meta.env.VITE_API_URL + "/employeer";

export const addBranch = async (form) => {
  try {
    const response = await axios.post(`${apiEndpoint}/add-branch`, form);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const addJob = async (form) => {
  try {
    const response = await axios.post(`${apiEndpoint}/add-job`, form);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getAllBranch = async (userId) => {
  try {
    const response = await axios.get(
      `${apiEndpoint}/get-all-branches/${userId}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getAllJob = async (userId) => {
  try {
    const response = await axios.get(`${apiEndpoint}/get-all-job/${userId}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const deleteJob = async (id) => {
  try {
    const response = await axios.delete(`${apiEndpoint}/delete-job/${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const deleteBranch = async (id) => {
  try {
    const response = await axios.delete(`${apiEndpoint}/delete-branch/${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
};
