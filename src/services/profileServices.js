import axios from "axios";

const apiEndpoint = import.meta.env.VITE_API_URL + "/profile";

export const updateProfile = async (form, userId) => {
  try {
    const response = await axios.post(
      `${apiEndpoint}/update-profile/${userId}`,
      form,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getPartyByUserId = async (userId, partyType) => {
  try {
    const response = await axios.get(
      `${apiEndpoint}/getPartyByUserId/${userId}/partyType/${partyType}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getUserProfile = async (userId) => {
  try {
    const response = await axios.get(
      `${apiEndpoint}/get-user-profile/${userId}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};
