import axios from "axios";

const apiEndpoint = import.meta.env.VITE_API_URL + "/item";

export const addItem = async (item, userId) => {
  try {
    const response = await axios.post(`${apiEndpoint}/addItem`, {
      item,
      userId,
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

export const importItemBulk = async (itemArray, userId) => {
  try {
    const response = await axios.post(`${apiEndpoint}/importitem`, {
      itemArray,
      userId,
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

export const getItemsByUserId = async (userId, limit, pagenumber) => {
  try {
    const response = await axios.get(`${apiEndpoint}/items/userId/${userId}`, {
      params: { pagenumber, limit },
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

export const searchItem = async (query) => {
  try {
    const response = await axios.get(`${apiEndpoint}/searchItem/${query}`);
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};
